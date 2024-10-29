import express from 'express';

import { register, login, logout, forgetPassword, resetPassword, userDetail,getAllUsers,getSingleUser,editUser,deleteUser } from '../controllers/user.js';

import { authenticationMid } from '../middleware/auth.js';


const router = express.Router();

router.post('/',register)
router.post('/login',login)
router.get('/logout',logout)
router.post('/forgetpassword',forgetPassword)
router.post('/reset/:token',resetPassword)
router.get('/me',authenticationMid,userDetail)


// router.post('/',addUser)
router.get('/',getAllUsers)
router.get('/:userId',getSingleUser)
router.patch('/:userId',editUser)
router.delete('/:userId',deleteUser)


export default router
