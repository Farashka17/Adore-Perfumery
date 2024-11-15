import { create } from 'zustand';
import { toast } from 'react-toastify';

export const useCartStore = create((set, get) => ({
  cart: [],  // Başlangıçta boş bir dizi

  // Sepeti almak için fonksiyon
  getCart: async () => {
    const token = localStorage.getItem('token');
    if (!token || typeof token !== 'string') {
      toast.error('Lütfen sepete erişmek için giriş yapın.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/cart/getCart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        set({ cart: Array.isArray(data.products) ? data.products : [] }); // Ürünleri güncelliyoruz
        toast.success('Sepet başarıyla getirildi');
      } else {
        console.error('API Hatası:', data);
        toast.error(data.message || 'Sepet alınamadı');
      }
    } catch (error) {
      console.error('İstemci Hatası:', error);
      toast.error(`Sepet alınırken bir hata oluştu: ${error.message}`);
    }
  },

  // Sepete ürün ekleme fonksiyonu
  addToCart: async (productId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token || typeof token !== 'string') {
      toast.error('Lütfen giriş yapın ve ürünü sepete ekleyin.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/cart/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }), // Sadece productId ve quantity gönder
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Hatası:', errorData);
        toast.error(errorData.message || 'Sepete ürün eklenirken bir hata oluştu');
        return;
      }
  
      const data = await response.json();
      set({ cart: Array.isArray(data.products) ? data.products : [] }); // Sepeti güncelliyoruz
      toast.success('Ürün sepete başarıyla eklendi');
    } catch (error) {
      console.error('İstemci Hatası:', error);
      toast.error('Sepete ürün eklenirken bir hata oluştu');
    }
  },

  // Sepetten ürün silme fonksiyonu
  removeFromCart: async (productId) => {
    const token = localStorage.getItem('token');
    if (!token || typeof token !== 'string') {
      toast.error('Lütfen giriş yapın ve ürünü sepette kaldırın.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/cart/remove', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Sadece silinen ürünü kaldır
        set(state => ({
          cart: state.cart.filter(item => item.productId !== productId),
        }));
        toast.success('Ürün başarıyla sepetten silindi');
      } else {
        toast.error(data.message || 'Ürün sepetten silinemedi');
      }
    } catch (error) {
      console.error('İstemci Hatası:', error);
      toast.error('Sepetten ürün silinirken bir hata oluştu');
    }
  },
  

  clearCart: () => {
    set({ cart: [] }); // Sepeti sıfırla
  },

  // Sepetteki ürünün miktarını güncelleme fonksiyonu
 updateCart: async (productId, newQuantity) => {
  const token = localStorage.getItem('token');
  if (!token || typeof token !== 'string') {
    toast.error('Lütfen giriş yapın ve ürünü güncelleyin.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/cart/update', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity: newQuantity }),
    });

    const data = await response.json();

    if (response.ok) {
      // Ürün miktarını güncelle
      set(state => ({
        cart: state.cart.map(item =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        ),
      }));
      toast.success('Ürün miktarı başarıyla güncellendi');
    } else {
      toast.error(data.message || 'Ürün miktarı güncellenemedi');
    }
  } catch (error) {
    console.error('İstemci Hatası:', error);
    toast.error('Ürün miktarı güncellenirken bir hata oluştu');
  }
},

}));
