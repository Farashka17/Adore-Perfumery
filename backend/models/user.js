import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
    minLength:8
},
avatar:{
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
},
role:{
    type:String,
    default:'user',
    required:true
},
resetPasswordToken: String,
resetPasswordExpire: Date
},{timestamps:true})

export const User = mongoose.model('User', userSchema)
