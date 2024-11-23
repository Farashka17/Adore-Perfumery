import { create } from 'zustand';
import { toast } from 'react-toastify';

export const useCartStore = create((set, get) => ({
  cart: [],  

  
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
      console.error('API error:', errorData);
      throw new Error(errorData.message || 'API request failed.');
    }

    const data = await response.json();

    const totalQuantity = data.products.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = data.products.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);

    set({
      cart: data.products,
      totalPrice,
      totalQuantity,
    });
  } catch (error) {
    console.error('Error while retrieving cart:', error.message);
  }
},

  


  addToCart: async (productId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token || typeof token !== 'string') {
      toast.error('Please log in and add the product to your cart.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/cart/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }), 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData);
        toast.error(errorData.message || 'An error occurred while adding product to cart');
        return;
      }
  
      const data = await response.json();
      set({ cart: Array.isArray(data.products) ? data.products : [] }); 
      toast.success('Product added to cart successfully');
    } catch (error) {
      console.error('Client Error:', error);
      toast.error('An error occurred while adding product to cart');
    }
    await getCart();
  },
  


  removeFromCart: async (productId) => {
    const token = localStorage.getItem('token');
    if (!token || typeof token !== 'string') {
      toast.error('Please log in and remove the item from your cart.');
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
       
        set(state => ({
          cart: state.cart.filter(item => item.productId !== productId),
        }));
        toast.success('The product was successfully deleted from the cart.');
      } else {
        toast.error(data.message || 'The product could not be deleted from the cart.');
      }
    } catch (error) {
      console.error('Client Error:', error);
      toast.error('An error occurred while deleting the product from the cart.');
    }
  },
  

  clearCart: () => set({ cart: [] }), 

 updateCart: async (productId, newQuantity) => {
  const token = localStorage.getItem('token');
  if (!token || typeof token !== 'string') {
    toast.error('Please log in and update the product.');
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

      set(state => ({
        cart: state.cart.map(item =>
          item.productId === productId ? { ...item, quantity: newQuantity } : item
        ),
      }));
      toast.success('Product quantity updated successfully');
    } else {
      toast.error(data.message || 'Product quantity could not be updated');
    }
  } catch (error) {
    console.error('Client Error:', error);
    toast.error('An error occurred while updating the product quantity');
  }
},

}));
