import {User} from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // jwt doğru kütüphane ismi 'jsonwebtoken'
import cloudinary from 'cloudinary';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const register = async (req, res) => {
    const { name, lastName, email, password, confirmPassword, role } = req.body;

    // Tüm alanların dolu olup olmadığını kontrol et
    if (!name || !lastName || !email || !password || !confirmPassword ) {
        return res.status(400).json({ message: "Please fill in all required fields." });
    }

    // Şifrelerin eşleşip eşleşmediğini kontrol et
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    // Kullanıcı var mı kontrol et
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "This user already exists." });
    }

    // Şifrenin uzunluğunu kontrol et
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = await User.create({
        name,
        lastName,
        email,
        password: hashedPassword,
        role,
    });

    // JWT oluştur
    const token = jwt.sign(
        { id: newUser._id }, // Yeni kullanıcının ID'si
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } 
    );

    // Cookie ayarları
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    };

    // Yanıtı gönder
    return res.status(201)
        .cookie("token", token, cookieOptions)
        .json({
            message: "User created successfully.",
            user: newUser,
            token,
        });
};


const login = async (req, res) => {
    const { email, password } = req.body;
  
    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Bu kullanıcı mevcut değil." });
    }
  
    // Şifreyi karşılaştır
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ message: "Şifreniz yanlıştır." });
    }
  
    // JWT oluştur
    const token = jwt.sign(
        { id: user._id }, // Kullanıcı bilgileri
        process.env.JWT_SECRET, // Şifreleme için kullanılan gizli anahtar
        { expiresIn: '1h' } // Token'ın geçerlilik süresi
      );
  
    // Yanıtı gönder
    return res.status(200).json({
      message: "Giriş başarılı.",
      user: user, // Kullanıcı bilgilerini döndürüyoruz
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

const forgetPassword = async (req,res)=>{
     const user =await User.findOne({email:req.body.email})
     if(!user){
        return res.status(500).json({message:"User yoxdur"})
     }
     const resetToken = crypto.randomBytes(20).toString('hex'); // Her seferinde yeni token oluşturuluyor
     user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
     user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 dakika geçerlilik süresi
     await user.save({ validateBeforeSave: false });

   const passwordUrl = `${req.protocol}://${req.get('host')}/users/reset/${resetToken}`;
   const message = `Shifreni deyismek ucun istifade edeceyiniz token : ${passwordUrl}`;
   try {
    const transporter = nodemailer.createTransport({
        port: 465,  
        service:"gmail",
        host: "smtp.gmail.com",
           auth: {
                user: 'farahnv@code.edu.az',
                pass: 'j m h p j n y o l d k w m e x l',
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

const resetPassword = async (req, res) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest('hex');

  
    // Token'ı ve geçerlilik süresi dolmamış kullanıcıyı buluyoruz
    const user = await User.findOne({
        resetPasswordToken, 
        resetPasswordExpire: { $gt: Date.now() }
      });
  
    if (!user) {
      return res.status(400).json({ message: "Token geçersiz veya süresi dolmuş" });
    }
  
    // Yeni şifreyi alıyoruz
    user.password = req.body.password;
  
    // Token'ı ve süresini sıfırlıyoruz
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    // Şifreyi kaydediyoruz
    await user.save();
  
    // Yeni bir token oluşturuyoruz (isteğe bağlı, hemen giriş yapmak için)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    // Cookie'ye token ekliyoruz
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    };
  
    // Yanıtı gönderiyoruz
    res.status(200).cookie("token", token, cookieOptions).json({ user, token });
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



//   export const addUser = async(request,response)=>{
//     const {name, email, password, role} = request.body

//     if(!name || !email || !password || !role){
//         response.status(500).send({message:"Please fill al required fields"})
//         return;
//     }
//      const existedUser = await User.findOne({email:email,name:name})
//     if(existedUser){
//     response.status(400).send({message:"User already exists"})
//         return;
//    }
//     const newUser = await User.create(request.body)
    
//     if(!newUser){
//         response.status(500).send({message:"User not created"})
//         return;
//     }
//     response.status(201).send({message:"User created successfully",data:newUser})
// }

    export const getAllUsers = async (req, res) => {
        try {
            const users = await User.find();

            // Kullanıcı bulunmadıysa
            if (!users || users.length === 0) {
                return res.status(404).json({ message: "No users found" });
            }

            // Kullanıcılar bulunduysa
            return res.status(200).json({ message: "Users found", data: users });
        } catch (error) {
            // Hata durumunda
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

        // Kullanıcıyı güncelle
        updateUser.set(request.body); // request.body'deki tüm veriyi kullanıcıya uygula

        await updateUser.save(); // Güncellenmiş kullanıcıyı kaydet

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

