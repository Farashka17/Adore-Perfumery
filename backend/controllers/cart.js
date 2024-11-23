import { Cart } from '../models/cart.js';
import { Product } from '../models/product.js';
import { User } from '../models/user.js';



export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; 

  
    console.log("Product ID received:", productId); 
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    
    if (!product.name || !product.productPic) {
      return res.status(400).json({
        message: 'Product name or picture is missing.',
      });
    }

    
    const user = await User.findById(userId);
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const cartProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);
    const userCartIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (cartProductIndex >= 0) {
      cart.products[cartProductIndex].quantity += quantity;
    } else {
      cart.products.push({
        productId,
        quantity,
        price: product.price,
        name: product.name,
        productPic: product.productPic,
      });
    }

    if (userCartIndex >= 0) {
      user.cart[userCartIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

  
    await cart.save();
    await user.save();

    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    const user = await User.findById(userId);

    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const cartProduct = cart.products.find(item => item.productId.toString() === productId);
    const userCartProduct = user.cart.find(item => item.productId.toString() === productId);

    if (!cartProduct || !userCartProduct) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cartProduct.quantity = quantity;
    userCartProduct.quantity = quantity;

    await cart.save();
    await user.save();

    res.status(200).json({ message: 'Quantity updated successfully', products: cart.products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body; 
    const userId = req.user.id; 

    const cart = await Cart.findOne({ userId });
    const user = await User.findById(userId);

    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    if (!user) return res.status(404).json({ message: 'User not found' });

    
    cart.products = cart.products.filter(item => item.productId.toString() !== productId);
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);

    await cart.save();
    await user.save();

    res.status(200).json({ message: 'Product removed successfully', products: cart.products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getCart = async (req, res) => {
  try {
    const userId = req.user.id; 


    const cart = await Cart.findOne({ userId }).populate('products.productId'); 

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
