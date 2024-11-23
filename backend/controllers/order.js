  import { Orders } from "../models/order.js";
  import { User } from "../models/user.js";  
import  {Product } from "../models/product.js";

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

 
  if (!["Credit Card", "PayPal", "Cash"].includes(paymentMethod)) {
    return res.status(400).json({
      success: false,
      message: "Invalid payment method.",
    });
  }

  try {
  
    const newOrder = new Orders({
      userId,
      products,
      totalAmount,
      details: parsedDetails,
      paymentMethod,
      ...rest,
    });


    await newOrder.save();

    
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


    user.orders.push(orderDetails); 
    await user.save();

    
    const cart = user.cart; 
    const updatedCart = [];

    
    for (const item of products) {
      const cartItemIndex = cart.findIndex(cartItem => cartItem.productId.toString() === item.productId.toString());

      if (cartItemIndex > -1) {
     
        cart.splice(cartItemIndex, 1);

        
        const product = await Product.findById(item.productId);
        if (product) {
          product.quantity -= item.quantity;

         
          if (product.quantity <= 0) {
            await product.remove(); 
          } else {
            await product.save(); 
          }
        }
      }
    }

   
    user.cart = updatedCart; 
    await user.save();

    res.status(200).json({
      success: true,
      message: "The order was created successfully.",
      orderDetails: newOrder,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      success: false,
      message: "The order could not be created.",
      error: error.message,
    });
  }
};




  export const getOrders = async (req, res) => {
    try {
      
      const users = await User.find().populate('orders'); 
      const allOrders = users.reduce((orders, user) => {
        return [...orders, ...user.orders]; 
      }, []);
      
      res.status(200).json(allOrders); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching orders", error });
    }
  };
  


  export const getUserOrders = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const orders = await Orders.find({ userId });
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while receiving user orders", error });
    }
  };

export const updateOrderStatus = async (req, res) => {
  const { orderId, newStatus } = req.body;

  try {
   
    const updatedOrder = await Orders.findByIdAndUpdate(
      orderId,
      { 
        status: newStatus,
        updatedAt: Date.now(), 
      },
      { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const user = await User.findOne({ 'orders._id': orderId }); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    const orderIndex = user.orders.findIndex(order => order._id.toString() === orderId);
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found in user orders array' });
    }

  
    user.orders[orderIndex].status = newStatus;
    user.orders[orderIndex].updatedAt = Date.now();

    await user.save();

    res.status(200).json({ updatedOrder, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};










  
  