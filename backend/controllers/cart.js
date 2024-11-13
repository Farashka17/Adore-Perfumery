import { Cart } from '../models/cart.js';
import { Product } from '../models/product.js' // Product modelini import ediyoruz

// Sepete ürün ekleme
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Giriş yapan kullanıcının ID'si

    // Ürünün varlığını kontrol et
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Sepet kontrolü (varsa güncelleme, yoksa yeni sepet oluşturma)
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // Kullanıcıya ait sepet yoksa yeni bir sepet oluştur
      cart = new Cart({
        userId,
        products: [{
          productId,
          quantity,
          price: product.price
        }]
      });
      await cart.save();
      return res.status(201).json(cart);
    }

    // Sepetteki ürünü güncelleme
    const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
    if (productIndex >= 0) {
      // Ürün zaten sepette var, miktarı güncelle
      cart.products[productIndex].quantity += quantity;
    } else {
      // Ürün sepette yoksa, yeni ürün ekle
      cart.products.push({
        productId,
        quantity,
        price: product.price
      });
    }

    await cart.save();
    res.status(200).json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Kullanıcının sepetini alma
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id; // Giriş yapan kullanıcının ID'si
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

// Sepeti güncelleme (opsiyonel)
export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Giriş yapan kullanıcının ID'si

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
    if (productIndex < 0) {
      return res.status(404).json({ message: 'Product not in cart' });
    }

    // Sepetteki ürünün miktarını güncelle
    cart.products[productIndex].quantity = quantity;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
