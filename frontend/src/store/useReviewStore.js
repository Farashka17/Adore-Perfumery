
import { toast } from 'react-toastify';
import { create } from 'zustand';

const useReviewStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null, // localStorage'dan token al
  reviews: [], // İncelemeler
  setUser: (user, token) => {
    localStorage.setItem('token', token); // Token'ı localStorage'a kaydet
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('token'); // Token'ı localStorage'dan sil
    set({ user: null, token: null, reviews: [] });
  },
  setReviews: (reviews) => set({ reviews }),
  addReview: (review) => set((state) => ({ reviews: [...state.reviews, review] })),
  removeReview: (reviewId) =>
    set((state) => ({
      reviews: state.reviews.filter((review) => review._id !== reviewId),
    })),

  // Review Ekleme İşlemi
  addReviewToProduct: async (reviewData, productId) => {
    const { token, user, addReview } = useStore.getState();

    // Eğer kullanıcı giriş yapmamışsa
    if (!user || !token) {
      toast.error('You must be logged in to add a review.');
      window.location.href = '/login'; // Kullanıcıyı login sayfasına yönlendir
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Token'ı Authorization header'ında gönder
        },
        body: JSON.stringify({ ...reviewData, productId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        addReview(data.review); // Yeni incelemeyi store'a ekle
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred while adding the review.');
    }
  },

  // Ürün incelemelerini getirme
  getProductReviews: async (productId) => {
    const { token, setReviews } = useStore.getState();

    if (!token) {
      return; // Eğer token yoksa, incelemeleri getirmiyoruz
    }

    try {
      const response = await fetch(`http://localhost:3000/reviews/product/${productId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setReviews(data.reviews); // Backend'den gelen incelemeleri store'a kaydet
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch reviews.');
    }
  },

  // Kullanıcı incelemelerini getirme
  getUserReviews: async () => {
    const { token, user } = useStore.getState();
    if (!user || !token) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/reviews/user/${user._id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setReviews(data.reviews); // Kullanıcının incelemelerini store'a kaydet
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch user reviews.');
    }
  },

  // İnceleme silme işlemi
  deleteReview: async (reviewId) => {
    const { token, removeReview } = useStore.getState();
    
    if (!token) {
      toast.error('You must be logged in to delete a review.');
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Review deleted successfully.');
        removeReview(reviewId); // İncelemeyi store'dan sil
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to delete review.');
    }
  },
}));

export default useReviewStore;
