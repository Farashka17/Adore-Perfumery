import { Review } from '../models/review.js';
import { Product } from '../models/product.js';
import { User } from '../models/user.js';

/**
 * Yeni bir inceleme ekler.
 * İnceleme hem Product hem de User modelindeki reviews array'ine eklenir.
 */
export const addReview = async (req, res) => {
    // Kullanıcı doğrulaması
    if (!req.user) { // Eğer kullanıcı yoksa
        return res.status(401).json({ message: 'You must be logged in to add a review.' });
    }

    const { productId, name, comment, rating } = req.body;
    const userId = req.user._id; // Giriş yapan kullanıcının ID'si

    try {
        // Ürün kontrolü
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Yeni inceleme oluştur
        const newReview = await Review.create({
            product: productId,
            user: userId,
            name,
            comment,
            rating,
        });

        // Ürünün ve kullanıcının reviews array'ine ekle
        product.reviews.push(newReview._id);
        const user = await User.findById(userId); // Kullanıcıyı tekrar bul
        user.reviews.push(newReview._id);

        // Ürünün ortalama puanını güncelle
        const reviews = await Review.find({ product: productId });
        const avgRating =
            reviews.reduce((acc, review) => acc + review.rating, 0) /
            reviews.length;

        product.rating = avgRating;

        // Değişiklikleri kaydet
        await product.save();
        await user.save();

        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add review', error });
    }
};

/**
 * Belirli bir ürün için tüm incelemeleri getirir.
 */
export const getProductReviews = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId).populate({
            path: 'reviews',
            populate: { path: 'user', select: 'name email' }, // Kullanıcı bilgilerini dahil et
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product.reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews', error });
    }
};

/**
 * Belirli bir kullanıcı için tüm incelemeleri getirir.
 */
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

/**
 * Belirli bir incelemeyi siler.
 */
export const deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        // İncelemeyi bulun
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Ürün ve kullanıcı modellerinden incelemeyi kaldır
        await Product.findByIdAndUpdate(review.product, {
            $pull: { reviews: reviewId },
        });
        await User.findByIdAndUpdate(review.user, {
            $pull: { reviews: reviewId },
        });

        // İncelemeyi sil
        await review.remove();

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review', error });
    }
};
