import client from "../config/paypalClient.js";  // client olarak import
import { Orders } from "../models/order.js";
import { User } from "../models/user.js";
import paypal from "@paypal/checkout-server-sdk";

export const createPayment = async (req, res) => {
    console.log('Received request to create payment'); // Log başlangıcı

    const { totalAmount } = req.body; // Ödenecek toplam tutar

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: totalAmount.toFixed(2), // Ödenecek toplam miktar
          },
        },
      ],
    });

    try {
      const order = await client.execute(request); // Paypal API isteği
      console.log('Payment order created successfully', order); // Başarı logu
      res.status(201).json({
        success: true,
        orderId: order.result.id, // Ödeme için gerekli order ID
      });
    } catch (error) {
      console.log('Error during payment creation:', error); // Hata logu
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};


export const capturePayment = async (req, res) => {
    const { orderId, userId, products, address } = req.body; // Ödeme ID'si ve sipariş detayları
  
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
  
    try {
      const capture = await client.execute(request);  // client kullanılıyor
  
      // Sipariş veritabanına kaydet
      const newOrder = new Orders({
        userId,
        products,
        totalAmount: products.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0
        ),
        address,
        status: 'completed',
        paymentMethod: 'PayPal',
        payment: true,
        date: new Date(),
      });
  
      await newOrder.save();
  
      // Kullanıcı siparişini güncelle
      await User.findByIdAndUpdate(userId, {
        $push: { orders: newOrder._id },
      });
  
      res.status(200).json({
        success: true,
        message: 'Payment successful',
        orderDetails: capture.result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};
