import {User} from '../models/user.js';
import jwt from 'jsonwebtoken';

const authenticationMid = async(req,res,next)=>{
  const {token}=req.cookies;
  if(!token){
    return res.status(500).json({message:"Erisim icin login olun"})
  }

  const decodedData = jwt.verify(token,"SECRETTOKEN")

  if(!decodedData){
    return res.status(500).json({message:"Erisim tokeni sehvdir"})
  }
  req.user = await User.findById(decodedData.id)
  next()
}

const roleChecked =  (...roles) => {
  return (req,res,next)=>{
  if(!roles.includes(req.user.role)){
    return res.status(500).json({message:"Giris icin icazeniz yoxdur"})
  }
  next()
  }
  
}
export {
  authenticationMid,
  roleChecked,
};