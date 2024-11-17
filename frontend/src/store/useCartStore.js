import { create } from 'zustand';
import { toast } from 'react-toastify';

export const useCartStore = create((set, get) => ({
  cart: [],  // Başlangıçta boş bir dizi

  // Sepeti almak için fonksiyon
getCart: async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:3000/cart/getCart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Hatası:', errorData);
      throw new Error(errorData.message || 'API isteği başarısız.');
    }

    const data = await response.json();
    // console.log('Sepet Verisi:', data);

    const totalQuantity = data.products.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = data.products.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);

    set({
      cart: data.products,
      totalPrice,
      totalQuantity,
    });
  } catch (error) {
    console.error('Sepet alınırken hata:', error.message);
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
    await getCart();
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
