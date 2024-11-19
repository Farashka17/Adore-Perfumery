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
    console.log(data); // API'den gelen yanıtı kontrol et
    // setProduct(data.data); // Veriyi doğru şekilde işlediğinden emin ol

 

    set({
      wishlist: data.products
    });
  } catch (error) {
    console.error('Sepet alınırken hata:', error.message);
  }
},

  
toggleWishlist: async (productId) => {
  try {
    const { wishlist } = get();
    const isInWishlist = wishlist.includes(productId);

    const response = await fetch('http://localhost:3000/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: localStorage.getItem('userId'), productId }),
    });

    const result = await response.json();

    if (response.ok) {
      if (isInWishlist) {
        // Eğer zaten varsa çıkar
        set({ wishlist: wishlist.filter((id) => id !== productId) });
        toast.success('Removed from wishlist!');
      } else {
        // Yoksa ekle
        set({ wishlist: [...wishlist, productId] });
        toast.success('Added to wishlist!');
      }
    } else {
      toast.error(result.message || 'Failed to update wishlist');
    }
  } catch (error) {
    console.error('Failed to toggle wishlist:', error);
    toast.error('Something went wrong!');
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
    if (!token) {
      toast.error('Lütfen giriş yapın.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/wishlist/remove', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || 'Ürün silinirken bir hata oluştu.');
        return;
      }
  
      const data = await response.json();
  
      // State'i güncelle
      set(state => {
        const updatedWishlist = state.wishlist.filter(item => item.productId !== productId);
        return { wishlist: updatedWishlist };
      });
  
      toast.success('Ürün başarıyla listeden silindi.');
    } catch (error) {
      console.error('Hata:', error);
      toast.error('Ürün silinirken bir hata oluştu.');
    }
  },
  
  
  
  

  clearWishlist: () => {
    set({ wishlist: [] }); // Sepeti sıfırla
  },



}));


