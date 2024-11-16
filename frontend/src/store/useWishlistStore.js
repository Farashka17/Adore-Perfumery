import { create } from "zustand";
import { toast } from 'react-toastify';

export const useWishlistStore = create((set, get) => ({
    wishlist: [],  // Başlangıçta boş bir dizi
  
    // Wishlist'i almak için fonksiyon
    getWishlist: async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/wishlist/getFav', {
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
        set({ wishlist: data.products });
      } catch (error) {
        console.error('Wishlist alınırken hata:', error.message);
      }
    },
  
    // Wishlist'e ürün ekleme veya çıkarma fonksiyonu
    toggleWishlist: async (productId) => {
      const token = localStorage.getItem('token');
      if (!token || typeof token !== 'string') {
        toast.error('Lütfen giriş yapın ve ürünü listeye ekleyin.');
        return;
      }
  
      try {
        const wishlist = get().wishlist;
        const productInWishlist = wishlist.some(item => item.productId === productId);
  
        let response;
        if (productInWishlist) {
          // Ürün wishlist'te varsa çıkar
          response = await fetch('http://localhost:3000/wishlist/removefromFav', {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId}),
          });
  
          if (response.ok) {
            set(state => ({
              wishlist: state.wishlist.filter(item => item.productId !== productId),
            }));
            toast.success('Ürün wishlist\'ten çıkarıldı');
          } else {
            const errorData = await response.json();
            toast.error(errorData.message || 'Wishlist\'ten ürün çıkarılamadı');
          }
        } else {
          // Ürün wishlist'te yoksa ekle
          response = await fetch('http://localhost:3000/wishlist/addToFav', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId}),
          });
  
          if (response.ok) {
            const data = await response.json();
            set({ wishlist: data.products });
            toast.success('Ürün wishlist\'e başarıyla eklendi');
          } else {
            const errorData = await response.json();
            toast.error(errorData.message || 'Wishlist\'e ürün eklenemedi');
          }
        }
      } catch (error) {
        console.error('İstemci Hatası:', error);
        toast.error('Wishlist\'e ürün eklenirken bir hata oluştu');
      }
    },
  
    // Wishlist'i sıfırlama
    clearWishlist: () => {
      set({ wishlist: [] }); // Wishlist'i sıfırla
    },
  }));
  