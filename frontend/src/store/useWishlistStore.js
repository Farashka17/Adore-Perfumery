import { create } from 'zustand';
import { toast } from 'react-toastify';

export const useWishlistStore = create((set, get) => ({
  wishlist: [],  

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
      console.error('API Error:', errorData);
      throw new Error(errorData.message || 'API request failed.');
    }

    const data = await response.json();
    console.log(data); 
   

    set({
      wishlist: data.products
    });
  } catch (error) {
    console.error('Error while retrieving cart:', error.message);
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
     
        set({ wishlist: wishlist.filter((id) => id !== productId) });
        toast.success('Removed from wishlist!');
      } else {
        
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

addToWishlist: async (productId) => {
  const token = localStorage.getItem('token');
  if (!token || typeof token !== 'string') {
    toast.error('Please log in and add the product to your wishlist.');
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
      console.error('API error:', errorData);
      toast.error(errorData.message || 'An error occurred while adding a product to the list.');
      return;
    }

    const data = await response.json();
    set({ wishlist: data.products }); 
    toast.success('The product was successfully added or removed from the list');
  } catch (error) {
    console.error('Client Error:', error);
    toast.error('An error occurred while adding product to cart');
  }
},

  

  
  removeFromWishlist: async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please sign in.');
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
        toast.error(errorData.message || 'An error occurred while deleting the product.');
        return;
      }
  
      const data = await response.json();
  
    
      set(state => {
        const updatedWishlist = state.wishlist.filter(item => item.productId !== productId);
        return { wishlist: updatedWishlist };
      });
  
      toast.success('The product was successfully deleted from the list..');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while deleting the product.');
    }
  },


  clearWishlist: () => {
    set({ wishlist: [] }); 
  },



}));


