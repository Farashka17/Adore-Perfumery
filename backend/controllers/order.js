import { Orders } from "../models/order.js";
// import { User } from "../models/user.js";  // Eğer kullanıcı verilerini kontrol etmek isterseniz
// import { Products } from "../models/product.js"; // Eğer ürün verileri gerekirse
import paypalClient from './paypalClient.js'; // PayPal Client SDK
// import { v4 as uuidv4 } from 'uuid'; // Opsiyonel, her sipariş için benzersiz ID oluşturur
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

// Sipariş oluşturma
export const createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount, address, paymentMethod, date } = req.body;

    // Siparişi veritabanına kaydetme
    const newOrder = new Orders({
      userId,
      products,
      totalAmount,
      address,
      paymentMethod,
      date,
      status: 'pending',
      payment: false
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating order", error });
  }
};

// PayPal üzerinden ödeme oluşturma
export const createPaypalPayment = async (req, res) => {
    const { amount } = req.body; // Ödenecek miktar
  
    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: amount.toString() // String olarak ödenecek tutar
        }
      }],
      application_context: {
        return_url: 'https://www.yourwebsite.com/success', // Başarılı ödeme sonrası yönlendirilecek URL
        cancel_url: 'https://www.yourwebsite.com/cancel' // İptal edilen ödeme sonrası yönlendirilecek URL
      }
    });
  
    try {
      const order = await paypalClient().execute(request);
      res.json({
        id: order.result.id
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating PayPal order');
    }
  };

// PayPal ödeme başarı durumu
export const capturePayment = async (req, res) => {
  const { orderId } = req.body; // Ödeme alınan sipariş ID'si

  const request = new paypalClient.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await paypalClient().execute(request);
    
    // Sipariş ödeme durumu güncelleme
    const updatedOrder = await Orders.findByIdAndUpdate(orderId, {
      status: 'completed',
      payment: true
    }, { new: true });

    res.status(200).json({
      message: "Payment successful",
      order: updatedOrder,
      capture
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error capturing PayPal payment');
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
  const { userId } = req.params; // URL parametresi olarak userId

  try {
    const orders = await Orders.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user's orders", error });
  }
};
