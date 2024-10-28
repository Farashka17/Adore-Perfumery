import {User} from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // jwt doğru kütüphane ismi 'jsonwebtoken'
import cloudinary from 'cloudinary';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const register = async (req,res)=>{
 
    const avatar = await cloudinary.uploader.upload(req.body.avatar, {
        folder:"avatars",
        width:130,
        crop:"scale"
    })


     const {name,email,password}= req.body;

     const user = await User.findOne({email})
     if(user){
        return res.status(500).json({message:"Bu istifadeci var"})
     }
     const hashedPassword = await bcrypt.hash(password,10)
     if(password.length<8){
        return res.status(500).json({message:"Sifrenin uzunluq minimum 8-reqem olmalidir"})
     }
     const newUser = await User.create({
        name,
        email,
        password:hashedPassword,
        avatar:{
        public_id:avatar.public_id,
        url:avatar.secure_url
        }
    })
     
     const token = jwt.sign({id:newUser._id},"SECRETTOKEN",{expireIn:"1h"})
     const cookieOptions = {
        httpOnly: true,
        expires:new Date(Date.now()+5*24*60*60*1000)
     }
     res.status(201).cookie("token",token,cookieOptions).json({
        newUser,
        token
    })
}

const login = async (req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(500).json({message:"Bu istifadeci yoxdur"})
    }
    const comparePassword = await bcrypt.compare(password,user.password)
    if(!comparePassword){
        return res.status(500).json({message:"Sifreniz yanlisdir"})
    }

    const token = jwt.sign({id:user._id},"SECRETTOKEN",{expireIn:"1h"})
     const cookieOptions = {
        httpOnly: true,
        expires:new Date(Date.now()+5*24*60*60*1000)
     }
     res.status(200).cookie("token",token,cookieOptions).json({
        user,
        token
    })
}

const logout = async (req,res)=>{
    const cookieOptions = {
        httpOnly: true,
        expires:new Date(Date.now())
     }
    res.status(200).cookie("token",null,cookieOptions).json({
        messahe:"Hesabdan cixildi"
    })
}

const forgetPassword = async (req,res)=>{
     const user =await User.findOne({email:req.body.email})
     if(!user){
        return res.status(500).json({message:"User yoxdur"})
     }
   const resetToken =  crypto.randomBytes(20).toString('hex')
   user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
   user.resetPasswordExpire = Date.now()+ 15*60*1000
   await user.save({validateBeforeSave:false})

   const  passwordUrl = `${req.proocol}://${req.get('host')}/reset/${resetToken}}`
   const message = `Shifreni deyismek ucun istifade edeceyiniz token : ${passwordUrl}`;
   try {
    const transporter = nodemailer.createTransport({
        port: 465,  
        service:"gmail",
        host: "smtp.gmail.com",
           auth: {
                user: 'farahnv@code.edu.az',
                pass: 'Farashka1911',
             },
        secure: true,
        });
        const mailData = {
            from: 'farahnv@code.edu.az',  // sender address
              to: req.body.email,   // list of receivers
              subject: 'Password sifirlamaq',
              text: message
            
            };
            await transporter.sendMail(mailData)
            res.status(200).json({message:"Sifreni deyismek ucun e-mail yollandi"})
   } 

   catch (error) {
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined;

    await user.save({validateBeforeSave:false})
    res.status(500).json({message: error.message})
   }
}

const resetPassword = async (req,res)=>{
    const resetPasswordToke = crypto.createHash("sha256").update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return res.status(500).json({message:"Token yanlisdir ya da zaman bitdi"})
    }
    user.password = req.body.password
    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined

    await user.save()
    const token = jwt.sign({id:user._id},"SECRETTOKEN",{expiresIn:"1h"})

    const cookieOptions = {
        httpOnly: true,
        expires:new Date(Date.now()+5*24*60*60*1000)
     }
     res.status(200).cookie("token",token,cookieOptions).json({
        user,
        token
    })
}


const userDetail = async (req,res,next)=>{
   const user = await User.findById(req.params.id)
   res.status(200).json({
    user
})

}
export {
    register,
    login,
    logout,
    forgetPassword,
    resetPassword,
    userDetail
  };