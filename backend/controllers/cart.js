import { Cart } from '../models/cart.js';
import { Product } from '../models/product.js';
import { User } from '../models/user.js';

// Sepete ürün ekleme
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Giriş yapan kullanıcının ID'si

    // Ürünün varlığını kontrol et
    console.log("Product ID received:", productId);  // Debug log
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Kullanıcı ve Cart kontrolü
    const user = await User.findById(userId);
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // Cart ve User cart içinde ürün ekleme veya güncelleme
    const cartProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);
    const userCartIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (cartProductIndex >= 0) {
      // Sepetteki ürünün miktarını artır
      cart.products[cartProductIndex].quantity += quantity;
    } else {
      // Sepete yeni ürün ekle
      cart.products.push({ productId, quantity, price: product.price });
    }

    if (userCartIndex >= 0) {
      // Kullanıcının sepetindeki ürün miktarını artır
      user.cart[userCartIndex].quantity += quantity;
    } else {
      // Kullanıcının sepetine yeni ürün ekle
      user.cart.push({ productId, quantity });
    }

    // Sepeti ve kullanıcıyı kaydet
    await cart.save();
    await user.save();

    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Sepetteki ürünü güncelleme
export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const cartProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);
    const userCartIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (cartProductIndex < 0 || userCartIndex < 0) {
      return res.status(404).json({ message: 'Product not in cart' });
    }

    cart.products[cartProductIndex].quantity = quantity;
    user.cart[userCartIndex].quantity = quantity;

    await cart.save();
    await user.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Sepetten ürünü çıkarma
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const cartProductIndex = cart.products.findIndex(item => item.productId.toString() === productId);
    const userCartIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (cartProductIndex >= 0) {
      cart.products.splice(cartProductIndex, 1);
    }

    if (userCartIndex >= 0) {
      user.cart.splice(userCartIndex, 1);
    }

    await cart.save();
    await user.save();

    res.status(200).json({ message: 'Product removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Giriş yapan kullanıcının ID'si

    // Kullanıcı ve Cart kontrolü
    const cart = await Cart.findOne({ userId }).populate('products.productId'); // Ürün bilgilerini de dahil et

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
