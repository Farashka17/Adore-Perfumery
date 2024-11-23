
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { Wishlist } from "../models/wishlist.js";


export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id; 

    
    console.log("Product ID received:", productId);  
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

   
    const existingProductIndex = wishlist.products.findIndex(item => item.productId.toString() === productId);
    if (existingProductIndex !== -1) {
    
      wishlist.products.splice(existingProductIndex, 1);

     
      const existingUserProductIndex = user.wishlist.findIndex(item => item.productId.toString() === productId);
      if (existingUserProductIndex !== -1) {
        user.wishlist.splice(existingUserProductIndex, 1);
      }

      
      await wishlist.save();
      await user.save();

      return res.status(200).json({
        message: 'Product removed from wishlist',
        products: wishlist.products,
      });
    }

    wishlist.products.push({
      productId,
      price: product.price,
      name: product.name,
      productPic: product.productPic,
    });

 
    user.wishlist.push({ productId, name: product.name });

  
    await wishlist.save();
    await user.save();

    res.status(201).json(wishlist);
  } catch (error) {
    console.error('Error adding/removing from wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body; 
    const userId = req.user.id; 

    const wishlist = await Wishlist.findOne({ userId });
    const user = await User.findById(userId);

    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
    if (!user) return res.status(404).json({ message: 'User not found' });

    
    const productIndexInWishlist = wishlist.products.findIndex(item => item.productId.toString() === productId);
    const productIndexInUserWishlist = user.wishlist.findIndex(item => item.productId.toString() === productId);

    if (productIndexInWishlist === -1 || productIndexInUserWishlist === -1) {
      return res.status(400).json({ message: 'Product not found in wishlist' });
    }

  
    wishlist.products.splice(productIndexInWishlist, 1);
    user.wishlist.splice(productIndexInUserWishlist, 1);

   
    await wishlist.save();
    await user.save();

    res.status(200).json({
      message: 'Product removed from wishlist',
      products: wishlist.products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id; 

    
    const wishlist = await Wishlist.findOne({ userId }).populate('products.productId');

    if (!wishlist) {
      return res.status(404).json({ message: 'wishlist not found' });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




