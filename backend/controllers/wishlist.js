// controllers/wishlistController.js
import { Product } from "../models/product.js";
import { User } from "../models/user.js";
import { Wishlist } from "../models/wishlist.js";

// 1. Ürünü favorilere ekleme
// 1. Ürünü favorilere ekleme
// controllers/wishlistController.js
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id; // Giriş yapan kullanıcının ID'si

    // Ürünün varlığını kontrol et
    console.log("Product ID received:", productId);  // Debug log
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Kullanıcı kontrolü
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Kullanıcının wishlist'ini kontrol et
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    // Eğer ürün zaten wishlist'te varsa, sil
    const existingProductIndex = wishlist.products.findIndex(item => item.productId.toString() === productId);
    if (existingProductIndex !== -1) {
      // Ürün mevcutsa wishlist'ten çıkar
      wishlist.products.splice(existingProductIndex, 1);

      // Kullanıcıdan da bu ürünü çıkar
      const existingUserProductIndex = user.wishlist.findIndex(item => item.productId.toString() === productId);
      if (existingUserProductIndex !== -1) {
        user.wishlist.splice(existingUserProductIndex, 1);
      }

      // Değişiklikleri kaydet
      await wishlist.save();
      await user.save();

      return res.status(200).json({
        message: 'Product removed from wishlist',
        products: wishlist.products,
      });
    }

    // Ürün yoksa, wishlist'e ekle
    wishlist.products.push({
      productId,
      price: product.price,
      name: product.name,
      productPic: product.productPic,
    });

    // Kullanıcı wishlist'ine yeni ürün ekle
    user.wishlist.push({ productId, name: product.name });

    // Wishlist ve kullanıcıyı kaydet
    await wishlist.save();
    await user.save();

    res.status(201).json(wishlist);
  } catch (error) {
    console.error('Error adding/removing from wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// 2. Ürünü favorilerden çıkarma
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body; // Silinecek ürünün ID'si
    const userId = req.user.id; // Giriş yapan kullanıcının ID'si

    const wishlist = await Wishlist.findOne({ userId });
    const user = await User.findById(userId);

    if (!wishlist) return res.status(404).json({ message: 'wishlist not found' });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Sepet ve kullanıcının sepetinden ürünü kaldır
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

// 3. Kullanıcının wishlist'ini alma
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id; // Giriş yapan kullanıcının ID'si

    // Kullanıcı ve Cart kontrolü
    const wishlist = await Wishlist.findOne({ userId }).populate('products.productId'); // Ürün bilgilerini de dahil et

    if (!wishlist) {
      return res.status(404).json({ message: 'wishlist not found' });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

