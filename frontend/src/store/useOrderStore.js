import create from 'zustand';
import { toast } from 'react-toastify';

const useOrderStore = create((set) => ({
  orders: [], // Kullanıcının siparişleri
  order: null, // Tekil sipariş bilgisi
  loading: false, // Yükleniyor durumu
  error: null, // Hata durumu

  // Kullanıcının tüm siparişlerini yükleme
  fetchUserOrders: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/orders/user/${userId}`);
      const data = await response.json();
      if (response.ok) {
        set({ orders: data.orders });
        toast.success('Siparişler başarıyla yüklendi!');
      } else {
        set({ error: data.message });
        toast.error(`Hata: ${data.message}`);
      }
    } catch (error) {
      set({ error: error.message });
      toast.error(`Hata: ${error.message}`);
    } finally {
      set({ loading: false });
    }
  },

  // Tekil siparişi yükleme
  fetchOrderDetails: async (orderId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      const data = await response.json();
      if (response.ok) {
        set({ order: data.order });
        toast.success('Sipariş detayları başarıyla yüklendi!');
      } else {
        set({ error: data.message });
        toast.error(`Hata: ${data.message}`);
      }
    } catch (error) {
      set({ error: error.message });
      toast.error(`Hata: ${error.message}`);
    } finally {
      set({ loading: false });
    }
  },

  // Sipariş oluşturma
  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        // Sipariş başarıyla oluşturulduysa
        set({ orders: [...orders, data.order] });
        toast.success('Sipariş başarıyla oluşturuldu!');
      } else {
        set({ error: data.message });
        toast.error(`Hata: ${data.message}`);
      }
    } catch (error) {
      set({ error: error.message });
      toast.error(`Hata: ${error.message}`);
    } finally {
      set({ loading: false });
    }
  },

  // Sipariş güncelleme (Admin)
  updateOrderStatus: async (orderId, status) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/orders/update/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (response.ok) {
        set({ order: data.order });
        toast.success('Sipariş durumu başarıyla güncellendi!');
      } else {
        set({ error: data.message });
        toast.error(`Hata: ${data.message}`);
      }
    } catch (error) {
      set({ error: error.message });
      toast.error(`Hata: ${error.message}`);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useOrderStore;
