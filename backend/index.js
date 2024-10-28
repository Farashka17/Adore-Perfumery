import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import db from './config/db.js';
import product from './routes/product.js';
import user from './routes/user.js';
import cloudinary from 'cloudinary';
dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_KEY // Click 'View API Keys' above to copy your API secret
});
const app =  express()
app.use(cors())
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cookieParser())

app.use('/',product)
app.use('/',user)

db()
const PORT = 3000
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
})
