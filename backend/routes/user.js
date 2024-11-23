import express from 'express';

import { register, login, logout, forgetPassword, resetPassword, userDetail,getAllUsers,getSingleUser,editUser,deleteUser } from '../controllers/user.js';




const router = express.Router();

router.post('/',register)
router.post('/login',login)
router.get('/logout',logout)
router.post('/forgotpassword',forgetPassword)
router.post('/reset/:token',resetPassword)
router.get('/',getAllUsers)
router.get('/:userId',getSingleUser)
router.patch('/:userId',editUser)
router.delete('/:userId',deleteUser)

export default router
