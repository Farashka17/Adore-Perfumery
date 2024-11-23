import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import db from './config/db.js';
import product from './routes/product.js';
import user from './routes/user.js';
import expressFileUpload from 'express-fileupload'

import brand from './routes/brand.js'
import fragranceFamily from './routes/fragranceFamily.js'
import concentration from './routes/concentration.js'
import volume from './routes/volume.js'

import  cart from './routes/cart.js'
import wishlist from './routes/wishlist.js'
import order from './routes/order.js'
import review from './routes/review.js'

dotenv.config()

const app =  express()
app.use(expressFileUpload());
app.use(cors());
app.use(bodyParser.json({limit:"50mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"50mb",extended:true}))
app.use(cookieParser())



app.use('/products',product)
app.use('/users',user)
app.use('/brands',brand)
app.use('/fragranceFamily',fragranceFamily)
app.use('/concentrations',concentration)
app.use('/volumes',volume)
app.use('/wishlist',wishlist)
app.use('/orders',order)

app.use('/cart',cart)
app.use('/reviews',review)





db()
const PORT = 3000
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
})
