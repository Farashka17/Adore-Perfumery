import {Product} from '../models/product.js';
import ProductFilter from '../utils/productFilter.js';
import cloudinary from 'cloudinary';


const allProducts = async (req,res)=>{
    const resultPerPage = 10
    const productFilter = new ProductFilter(Product.find(),req.query).search().filter().pagination(resultPerPage)
    const products = await productFilter.query

res.status(200).json({
    products
})
}

const adminProducts =  async(req,res,next)=>{
    const products = await Product.find()
    res.status(200).json({products})
}
const detailProducts = async (req,res)=>{
    const product = await Product.findById(req.params.id)
    res.status(200).json({product})
}

    // admin
const createProduct = async (req,res,next)=>{
    let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    }
    else{
        images = req.body.images
    }
    let allImage = []
    for(let i=0; i<images.length; i++){
        const result = await cloudinary.uploader.upload(images[i],{folder:"products"})
        allImage.push({
            public_id:result.public_id,
            url:result.secure_url
        })
    }
    req.body.images = allImage
    req.body.user = req.user.id
     const product = await Product.create(req.body)
     res.status(201).json({product})
}


const deleteProduct = async (req,res,next)=>{
    const product = await Product.findById(req.params.id)

    for(let i=0; i<product.images.length; i++){
        await cloudinary.uploader.destroy(product.images[i].public_id)
    }
    await product.remove()

    res.status(200).json({message:"Silindi"})
}

const updateProduct = async (req,res,next)=>{
    const product = await Product.findById(req.params.id)

    let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    }
    else{
        images = req.body.images
    }

    if(images !==undefined){
        for(let i=0; i<product.images.length; i++){
            await cloudinary.uploader.destroy(product.images[i].public_id)
        }
        await product.images.splice(0,product.images.length)  // remove all images
        await product.save()  // save the updated product with removed images to database  // without saving, images will not be removed from cloudinary.com
    }
    let allImage = []
    for(let i=0; i<images.length; i++){
        const result = await cloudinary.uploader.upload(images[i],{folder:"products"})
        allImage.push({
            public_id:result.public_id,
            url:result.secure_url
        })
    }
    req.body.images = allImage

    product =  await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

    res.status(200).json({product})
}

const createReview =async  (req, res,next) => {
        const {productId,comment,rating}= req.body;
    const review ={
        user:req.user._id,
        name:req.user.name,
        comment,
        rating:Number(rating)
    }
    const product = await Product.findByIdAndUpdate(productId)
    product.reviews.push(review)
    let avg = 0;
    product.reviews.forEach(rev =>{ 
        avg += rev.rating});
        product.rating = avg/product.reviews.length;
        await product.save({validatBeforeSave:false})


    res.status(200).json({
        message:"Yorum eklendi"
    })
}
export {
    allProducts,
    detailProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    createReview,
    adminProducts,
  };