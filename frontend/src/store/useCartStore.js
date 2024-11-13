// import { create } from 'zustand';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export const useCartStore = create((set, get) => ({
//   cart: [],
//   isLogin: JSON.parse(localStorage.getItem('isLogin')) || false,

//   // Sepete ürün ekleme
//   addToCart: (product) => {
//     const currentLoginStatus = get().isLogin; // Güncel isLogin durumunu al

//     if (currentLoginStatus) {
//       set((state) => {
//         const isProductInCart = state.cart.some((item) => item.id === product.id);
//         if (!isProductInCart) {
//           toast.success('Ürün sepete eklendi!');
//           return { cart: [...state.cart, { ...product, quantity: 1 }] };
//         } else {
//           toast.info('Bu ürün zaten sepette!');
//           return {};
//         }
//       });
//     } else {
//       toast.error('Lütfen giriş yapın!');
//     }
//   },

//   // Sepetten ürün çıkarma
//   removeFromCart: (productId) => {
//     set((state) => {
//       const updatedCart = state.cart.filter((item) => item.id !== productId);
//       toast.info('Ürün sepetten çıkarıldı!');
//       return { cart: updatedCart };
//     });
//   },

//   // Ürün adedini güncelleme
//   updateQuantity: (productId, amount) => {
//     set((state) => {
//       const updatedCart = state.cart.map((item) =>
//         item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
//       );
//       return { cart: updatedCart };
//     });
//   },

//   setLoginStatus: (status) => {
//     localStorage.setItem('isLogin', JSON.stringify(status));
//     set({ isLogin: status });
//   }
// }));


import { create } from 'zustand';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useCartStore = create((set, get) => ({
  cart: [],
  isLogin: JSON.parse(localStorage.getItem('isLogin')) || false, // Giriş durumu
  userId: JSON.parse(localStorage.getItem('userId')) || null, // Kullanıcı ID'si

  // Sepete ürün ekleme
  addToCart: async (product) => {
    const currentLoginStatus = get().isLogin; // Güncel isLogin durumunu al
    const userId = get().userId; // Kullanıcı ID'si

    // Giriş yapılıp yapılmadığını kontrol et
    if (currentLoginStatus && userId) {
      set((state) => {
        const isProductInCart = state.cart.some((item) => item.id === product.id);
        if (!isProductInCart) {
          toast.success('Ürün sepete eklendi!');
          const updatedCart = [...state.cart, { ...product, quantity: 1 }];
          // Veritabanına kaydet
          saveCartToDB(updatedCart, userId);
          return { cart: updatedCart };
        } else {
          toast.info('Bu ürün zaten sepette!');
          return {};
        }
      });
    } else {
      toast.error('Lütfen giriş yapın!');
    }
  },

  // Sepetten ürün çıkarma
  removeFromCart: (productId) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      toast.info('Ürün sepetten çıkarıldı!');
      // Veritabanına kaydet
      saveCartToDB(updatedCart, get().userId);
      return { cart: updatedCart };
    });
  },

  // Ürün adedini güncelleme
  updateQuantity: (productId, amount) => {
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      );
      // Veritabanına kaydet
      saveCartToDB(updatedCart, get().userId);
      return { cart: updatedCart };
    });
  },

  setLoginStatus: (status) => {
    localStorage.setItem('isLogin', JSON.stringify(status));
    set({ isLogin: status });
  },

  setUserId: (id) => {
    localStorage.setItem('userId', JSON.stringify(id));
    set({ userId: id });
  }
}));

// Sepet verilerini veritabanına kaydeden fonksiyon
const saveCartToDB = async (cart, userId) => {
  if (userId) {
    try {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId, // Kullanıcı ID'si ile birlikte
          cart: cart,     // Sepet verisi
        }),
      });

      if (response.ok) {
        console.log('Cart updated in the database');
      } else {
        toast.error('Sepet verisi veritabanına kaydedilemedi.');
      }
    } catch (error) {
      toast.error('Bir hata oluştu: ' + error.message);
    }
  } else {
    console.log('User ID not found');
  }
};
