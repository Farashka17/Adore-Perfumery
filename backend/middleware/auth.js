import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const protect = async (req, res, next) => {
  let token;

  // Authorization header'ında token olup olmadığını kontrol ediyoruz
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // "Bearer <token>" formatından token'ı alıyoruz
      token = req.headers.authorization.split(' ')[1];

      // Token'ı doğruluyoruz ve içindeki kullanıcı ID'sini alıyoruz
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Kullanıcı bilgilerini alıp req.user'a ekliyoruz
      req.user = await User.findById(decoded.id).select('-password');

      next(); // İşleme devam ediyoruz
    } catch (error) {
      console.error('Token doğrulama hatası:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // Token yoksa hata mesajı döndür
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
