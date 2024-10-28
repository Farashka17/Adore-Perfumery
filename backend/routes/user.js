import express from 'express';

import { register, login, logout, forgetPassword, resetPassword, userDetail } from '../controllers/user.js';
import { authenticationMid } from '../middleware/auth.js';


const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.post('/forgetpassword',forgetPassword)
router.post('/reset/:token',resetPassword)
router.get('/me',authenticationMid,userDetail)



export default router
