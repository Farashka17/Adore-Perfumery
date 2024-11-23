import {User} from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import cloudinary from 'cloudinary';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const register = async (req, res) => {
    const { name, lastName, email, password, confirmPassword, role } = req.body;

    
    if (!name || !lastName || !email || !password || !confirmPassword ) {
        return res.status(400).json({ message: "Please fill in all required fields." });
    }

   
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

   
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "This user already exists." });
    }

   
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await User.create({
        name,
        lastName,
        email,
        password: hashedPassword,
        role,
    });


    const token = jwt.sign(
        { id: newUser._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } 
    );

    
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    };

 
    return res.status(201)
        .cookie("token", token, cookieOptions)
        .json({
            message: "User created successfully.",
            user: newUser,
            token,
        });
};


const logout = async (req,res)=>{
    const cookieOptions = {
        httpOnly: true,
        expires:new Date(Date.now())
     }
    res.status(200).cookie("token",null,cookieOptions).json({
        message:"Hesabdan cixildi"
    })
}

const forgetPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(500).json({ message: "User not found" });
  }

  const resetToken = crypto.randomBytes(20).toString('hex'); 
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; 
  await user.save({ validateBeforeSave: false });

  const passwordUrl = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

  const message = `The token you will use to change your password : ${passwordUrl}`;

  try {
    const transporter = nodemailer.createTransport({
      port: 465,
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: 'farahnv@code.edu.az',
        pass: 'j m h p j n y o l d k w m e x l',
      },
      secure: true,
    });

    const mailData = {
      from: 'farahnv@code.edu.az',
      to: req.body.email,
      subject: 'Reset Password',
      text: message,
    };

    await transporter.sendMail(mailData);
    res.status(200).json({ message: "An e-mail has been sent to change your password." });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, newPasswordConfirm } = req.body;

  if (!newPassword || !newPasswordConfirm) {
    return res.status(400).json({ message: 'Password fields are required.' });
  }

  if (newPassword !== newPasswordConfirm) {
    return res.status(400).json({ message: 'Passwords do not match!' });
  }

  try {
   
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

   
    const hashedPassword = await bcrypt.hash(newPassword, 10);

  
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful!' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'An error occurred while resetting the password.' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "This user does not exist." });
  }


  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    return res.status(401).json({ message: "Your password is incorrect." });
  }

 
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );


  return res.status(200).json({
    message: "Login successful.",
    user, 
    token,
  });
};
  
  
  


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


export const getAllUsers = async (req, res) => {
     try {
            const users = await User.find();

        
            if (!users || users.length === 0) {
                return res.status(404).json({ message: "No users found" });
            }

            
            return res.status(200).json({ message: "Users found", data: users });
        } catch (error) {
            
            console.error(error);
            return res.status(500).json({ message: "An error occurred while fetching users." });
        }
    };

export const getSingleUser = async (request,response)=>{
    const {userId} = request.params
    const user = await User.findById(userId)
        if(!user){
            response.status(404).send({message:"User not found"})
            return;
        }
    response.status(200).send({message:"User found",data:user})

}

export const deleteUser = async(request,response)=>{
    const {userId} =request.params
    const user = await User.findByIdAndDelete(userId)
    if(!user){
        response.status(404).send({message:"User not found"})
        return;
    }
    response.status(200).send({message:"User deleted successfully",data:user})
}

export const editUser = async (request, response) => {
    const { userId } = request.params;
    try {
        const updateUser = await User.findById(userId);

        if (!updateUser) {
            return response.status(404).send({ message: "User not found" });
        }

        
        updateUser.set(request.body); 

        await updateUser.save(); 

        return response.status(200).send({
            message: "User updated successfully",
            data: updateUser,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return response.status(500).send({
            message: "An error occurred while updating the user",
        });
    }
};

