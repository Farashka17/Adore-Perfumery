
import { Product } from '../models/product.js';
import { User } from '../models/user.js';
import { Review } from '../models/review.js';
import {Orders} from '../models/order.js';


export const addReview = async (req, res) => {
    try {
      const userId = req.user._id; 
      const productId = req.body.productId;
      const { rating, comment } = req.body;
  
    
      const order = await Orders.findOne({ userId, 'products.product': productId });
      if (!order) {
        return res.status(403).json({ message: "You must have purchased this product to review it." });
      }
  
const newReview = new Review({
    productId,
    userId,
    rating: req.body.rating,
    comment: req.body.comment,
  });
  
  await newReview.save();
  

  await Product.findByIdAndUpdate(productId, {
    $push: { reviews: newReview._id },
  });
  

  await User.findByIdAndUpdate(userId, {
    $push: { reviews: newReview._id },
  });
  
  res.status(200).json({ message: "Review added successfully." });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong." });
    }
  };
      
  
  
  

  
  


export const getProductReviews = async (req, res) => {
    const { productId } = req.params;
  
    try {
      const product = await Product.findById(productId)
        .populate('reviews') // Yorumları getirmek için
        .exec();
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json({
        reviews: product.reviews,
        averageRating: product.averageRating,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  


export const getUserReviews = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate({
            path: 'reviews',
            populate: { path: 'product', select: 'name price' }, // Ürün bilgilerini dahil et
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews', error });
    }
};



