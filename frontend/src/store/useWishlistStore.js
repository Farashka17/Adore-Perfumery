import { create } from 'zustand';
import { toast } from 'react-toastify';

export const useWishlistStore = create((set, get) => ({
  wishlist: [],  // Başlangıçta boş bir dizi

  // Sepeti almak için fonksiyon
  fetchWishlist: async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:3000/wishlist', {
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

 

    set({
      wishlist: data.products
    });
  } catch (error) {
    console.error('Sepet alınırken hata:', error.message);
  }
},

  

  // Sepete ürün ekleme fonksiyonu
// useWishlistStore.js
addToWishlist: async (productId) => {
  const token = localStorage.getItem('token');
  if (!token || typeof token !== 'string') {
    toast.error('Lütfen giriş yapın ve ürünü sepete ekleyin.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/wishlist/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Hatası:', errorData);
      toast.error(errorData.message || 'Listeye ürün eklenirken bir hata oluştu');
      return;
    }

    const data = await response.json();
    set({ wishlist: data.products }); // Wishlist'i güncelle
    toast.success('Ürün listeye başarıyla eklendi veya çıkarıldı');
  } catch (error) {
    console.error('İstemci Hatası:', error);
    toast.error('Sepete ürün eklenirken bir hata oluştu');
  }
},

  

  // Sepetten ürün silme fonksiyonu
  removeFromWishlist: async (productId) => {
    const token = localStorage.getItem('token');
    if (!token || typeof token !== 'string') {
      toast.error('Lütfen giriş yapın ve ürünü sepette kaldırın.');
      return;
    }
  
    
      const response = await fetch('http://localhost:3000/wishlist/remove', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      // const data = await response.json();
  
    
if (!response.ok) {
  const errorData = await response.json();
  console.error('API Hatası:', errorData);
  toast.error(errorData.message || 'Ürün listeden silinirken bir hata oluştu');
  return;
}
    const data = await response.json(); // JSON verisini aldık
set(state => ({
  wishlist: state.wishlist.filter(item => item.productId !== productId),
}));
toast.success('Ürün başarıyla listeden silindi');
  },
  

  clearWishlist: () => {
    set({ wishlist: [] }); // Sepeti sıfırla
  },



}));
