import { Wishlist } from '../models/wishlist.js';  // Wishlist modelini import ettik
import { Product } from '../models/product.js';  // Ürün modelini import ettik
import { User } from '../models/user.js';  // Kullanıcı modelini import ettik


// Favorilere ürün ekleme
export const addToFavorite = async (req, res) => {
    try {
      const { productId } = req.body; // Kullanıcıdan gelen ürün ID'si
      const userId = req.user.id;  // Giriş yapan kullanıcının ID'si
  console.log("productId: " + productId)
      // Ürünün varlığını kontrol et
      console.log("Product ID received:", productId);  // Debug log
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      // Kullanıcı ve Wishlist kontrolü
      const user = await User.findById(userId);
      let wishlist = await Wishlist.findOne({ userId });
      if (!wishlist) {
        wishlist = new Wishlist({ userId, products: [] });
      }
  
  
      // Favorilerdeki ürün var mı diye kontrol et
      const wishlistProductIndex = wishlist.products.findIndex(item => item.productId.toString() === productId);
    //   const userCartIndex = user.cart.findIndex(item => item.productId.toString() === productId);
  
      if (wishlistProductIndex < 0) {
        // Eğer ürün favorilere eklenmemişse, favorilere ekle
        wishlist.products.push({
          productId,
          name: product.name,
          productPic: product.productPic,
          price: product.price,
        });
  
        // Kullanıcının favorilerine de aynı ürünü ekle
        user.wishlist.push({ productId });
      }
  
      // Sepeti ve kullanıcıyı kaydet
      await wishlist.save();
      await user.save();
  
      res.status(201).json(wishlist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
  // Favorilerdeki ürünü çıkarma
  export const removeFromFavorite = async (req, res) => {
    try {
      const { productId } = req.body;  // Silinecek ürünün ID'si
      const userId = req.user.id;  // Giriş yapan kullanıcının ID'si
  
      const wishlist = await Wishlist.findOne({ userId });
      const user = await User.findById(userId);
  
      if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Favorilerden ve kullanıcının favorilerinden ürünü kaldır
      wishlist.products = wishlist.products.filter(item => item.productId.toString() !== productId);
      user.wishlist = user.wishlist.filter(item => item.productId.toString() !== productId);
  
      await wishlist.save();
      await user.save();
  
      res.status(200).json({ message: 'Product removed successfully', products: wishlist.products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Kullanıcının favorilerini getir
  export const getWishlist = async (req, res) => {
    try {
      const userId = req.user.id;  // Giriş yapan kullanıcının ID'si
  
      // Kullanıcı ve Wishlist kontrolü
      const wishlist = await Wishlist.findOne({ userId }).populate('products.productId'); // Ürün bilgilerini de dahil et
  
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
  
      res.status(200).json(wishlist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
