  import { Orders } from "../models/order.js";
  import { User } from "../models/user.js";  // Eğer kullanıcı verilerini kontrol etmek isterseniz
import  {Product } from "../models/product.js";
import jwt from 'jsonwebtoken';
  // Sipariş oluşturma
  export const createOrder = async (req, res) => {
    const { userId, products, totalAmount, details, paymentMethod, ...rest } = req.body;
  
    let parsedDetails;
    try {
      parsedDetails = typeof details === "string" ? JSON.parse(details) : details;
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Details field must be a valid JSON object.",
      });
    }
  
    // Payment method kontrolü
    if (!["Credit Card", "PayPal", "Cash"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method.",
      });
    }
  
    try {
      // Yeni siparişi oluştur
      const newOrder = new Orders({
        userId,
        products,
        totalAmount,
        details: parsedDetails,
        paymentMethod,
        ...rest,
      });
  
      // Siparişi kaydet
      await newOrder.save();
  
      // Kullanıcıyı bul ve siparişi orders array'ine ekle
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
      const orderDetails = {
        userId: newOrder.userId,
        products: newOrder.products,
        totalAmount: newOrder.totalAmount,
        details: newOrder.details,
        paymentMethod: newOrder.paymentMethod,
        _id: newOrder._id,
      };
      // Kullanıcıya yeni siparişi ekle
      user.orders.push(orderDetails); // Siparişin ID'sini kullanıcıya ekle
      await user.save();
  
      // Sepeti güncelle
      const cart = user.cart; // Kullanıcının sepeti
      const updatedCart = [];
  
      // Siparişteki her ürünü kontrol et
      for (const item of products) {
        const cartItemIndex = cart.findIndex(cartItem => cartItem.productId.toString() === item.productId.toString());
        
        if (cartItemIndex > -1) {
          // Sepetten ürün sil
          cart.splice(cartItemIndex, 1);
  
          // Ürün miktarını düşür
          const product = await Product.findById(item.productId);
          if (product) {
            product.quantity -= item.quantity;
  
            // Eğer ürün miktarı sıfırsa, ürünü sil
            if (product.quantity <= 0) {
              await product.remove();
            } else {
              await product.save();
            }
          }
        }
      }
  
      // Kullanıcının sepetini güncelle
      user.cart = updatedCart;
      await user.save();
  
      res.status(200).json({
        success: true,
        message: "Sipariş başarıyla oluşturuldu.",
        orderDetails: newOrder,
      });
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({
        success: false,
        message: "Sipariş oluşturulamadı.",
        error: error.message,
      });
    }
  };
  
  
  

  // Siparişlerin listelenmesi
  export const getOrders = async (req, res) => {
    try {
      const orders = await Orders.find();
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching orders", error });
    }
  };

  // Kullanıcı bazında siparişleri listeleme
  export const getUserOrders = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const orders = await Orders.find({ userId });
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "Sipariş bulunamadı" });
      }
  
      console.log("Backend'den gelen siparişler:", orders); // Burada veriyi kontrol edebilirsiniz
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Kullanıcı siparişlerini alırken hata oluştu", error });
    }
  };
  
  
  