// import client from "../config/paypalClient.js";  // client olarak import
// import { Orders } from "../models/order.js";
// import { User } from "../models/user.js";
// import paypal from "@paypal/checkout-server-sdk";

// export const createPayment = async (req, res) => {
//     console.log('Received request to create payment'); // Log başlangıcı

//     const { totalAmount } = req.body; // Ödenecek toplam tutar

//     const request = new paypal.orders.OrdersCreateRequest();
//     request.prefer('return=representation');
//     request.requestBody({
//       intent: 'CAPTURE',
//       purchase_units: [
//         {
//           amount: {
//             currency_code: 'USD',
//             value: totalAmount.toFixed(2), // Ödenecek toplam miktar
//           },
//         },
//       ],
//     });

//     try {
//       const order = await client.execute(request); // Paypal API isteği
//       console.log('Payment order created successfully', order); // Başarı logu
//       res.status(201).json({
//         success: true,
//         orderId: order.result.id, // Ödeme için gerekli order ID
//       });
//     } catch (error) {
//       console.log('Error during payment creation:', error); // Hata logu
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
// };


// export const capturePayment = async (req, res) => {
//     const { orderId, userId, products, address } = req.body; // Ödeme ID'si ve sipariş detayları
  
//     const request = new paypal.orders.OrdersCaptureRequest(orderId);
//     request.requestBody({});
  
//     try {
//       const capture = await client.execute(request);  // client kullanılıyor
  
//       // Sipariş veritabanına kaydet
//       const newOrder = new Orders({
//         userId,
//         products,
//         totalAmount: products.reduce(
//           (acc, product) => acc + product.price * product.quantity,
//           0
//         ),
//         address,
//         status: 'completed',
//         paymentMethod: 'PayPal',
//         payment: true,
//         date: new Date(),
//       });
  
//       await newOrder.save();
  
//       // Kullanıcı siparişini güncelle
//       await User.findByIdAndUpdate(userId, {
//         $push: { orders: newOrder._id },
//       });
  
//       res.status(200).json({
//         success: true,
//         message: 'Payment successful',
//         orderDetails: capture.result,
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
// };


// export const cashPayment = async (req, res) => {
//   const { userId, products, address } = req.body;

//   try {
//     // Yeni siparişi oluştur
//     const newOrder = new Orders({
//       userId,
//       products,
//       totalAmount: products.reduce(
//         (acc, product) => acc + product.price * product.quantity,
//         0
//       ),
//       address,
//       status: 'pending', // Cash payment olduğu için "pending" statüsünde
//       paymentMethod: 'Cash',
//       payment: false,
//       date: new Date(),
//     });

//     await newOrder.save();

//     // Kullanıcı siparişlerini güncelle
//     await User.findByIdAndUpdate(userId, {
//       $push: { orders: newOrder._id },
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Order placed successfully with cash payment.',
//       order: newOrder,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };





// import { Orders } from '../models/order.js';
// import { User } from '../models/user.js';
// import Stripe from 'stripe';  // Stripe'ı import ediyoruz

// const stripe = new Stripe('sk_test_51QNuLYGI5lhtmX50v7E5T9DtWzL5eZWq8g3Pt7VuNUOsWn4OLLqrsQl9mMRmJl2732i48t59GJXeMzQY4WYu6OuH00zF47DDPu');  // Secret Key'i buraya ekleyin

// const createOrder = async (req, res) => {
//   try {
//     const { userId, products, totalAmount, address, paymentMethod } = req.body;

//     // Yeni sipariş oluşturma
//     const newOrder = new Orders({
//       userId,
//       products,
//       totalAmount,
//       address,
//       paymentMethod,
//       payment: paymentMethod === 'cash' ? true : false,  // Cash ödeme ise direkt olarak ödeme kabul edilir
//       date: Date.now()
//     });

//     // Siparişi veritabanına kaydet
//     await newOrder.save();

//     // Kullanıcıyı bul ve siparişi kullanıcıya ekle
//     const user = await User.findById(userId);
//     user.orders.push(newOrder._id);
//     await user.save();

//     res.status(201).json({
//       message: "Order successfully placed",
//       order: newOrder,
//     });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const handleCashPayment = async (req, res) => {
//   try {
//     const { userId, products, totalAmount, address, paymentMethod } = req.body;

//     // Cash ödeme ile sipariş oluşturma
//     await createOrder(req, res);  // Cash ödeme için aynı işlem yapılır, ödeme anında `payment: true` olarak kaydedilir.

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const handleStripePayment = async (req, res) => {
//   try {
//     const { userId, products, totalAmount, address, paymentMethod } = req.body;

//     // Stripe ödeme için order oluşturulmadan önce ödeme işlemi yapılacak
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: totalAmount * 100,  // Stripe smallest unit (cent), toplam tutar 100 ile çarpılır
//       currency: 'usd',
//     });

//     // Eğer ödeme başarılıysa, siparişi oluştur
//     if (paymentIntent.status === 'succeeded') {
//       await createOrder(req, res);  // Siparişi oluştur
//       res.status(200).json({ message: 'Order successfully placed with Stripe' });
//     } else {
//       res.status(400).json({ error: 'Payment failed' });
//     }

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };






import { User } from '../models/user.js';
import { Orders } from '../models/order.js';

export const createCashOrder = async (req, res) => {
  const { userId, address, products, totalAmount } = req.body;

  if (!userId || !address || !products || !totalAmount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newOrder = new Orders({
      userId,
      products,
      totalAmount,
      address,
      paymentMethod: 'cash',
      payment: true,
      date: Date.now(),
      status: 'pending',
    });

    const order = await newOrder.save();
    user.orders.push(order._id);
    await user.save();

    return res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error('Error creating order:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

