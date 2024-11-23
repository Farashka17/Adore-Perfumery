
import { toast } from 'react-toastify';
import { create } from 'zustand';

const useReviewStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null, 
  reviews: [], 
  setUser: (user, token) => {
    localStorage.setItem('token', token); 
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('token'); 
    set({ user: null, token: null, reviews: [] });
  },
  setReviews: (reviews) => set({ reviews }),
  addReview: (review) => set((state) => ({ reviews: [...state.reviews, review] })),
  removeReview: (reviewId) =>
    set((state) => ({
      reviews: state.reviews.filter((review) => review._id !== reviewId),
    })),


  addReviewToProduct: async (reviewData, productId) => {
    const { token, user, addReview } = useStore.getState();

    
    if (!user || !token) {
      toast.error('You must be logged in to add a review.');
      window.location.href = '/login'; 
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ ...reviewData, productId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        addReview(data.review); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred while adding the review.');
    }
  },

 
  getProductReviews: async (productId) => {
    const { token, setReviews } = useStore.getState();

    if (!token) {
      return; 
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
        setReviews(data.reviews); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch reviews.');
    }
  },

  
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
        setReviews(data.reviews); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch user reviews.');
    }
  },


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
        removeReview(reviewId); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to delete review.');
    }
  },
}));

export default useReviewStore;
