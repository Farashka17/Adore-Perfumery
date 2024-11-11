import React, { useEffect, useState } from 'react'
import SingleProduct from '../../common/singleProduct'
import Pagination from '../pagination'

const VisibleProducts = () => {
  const [productData, setProductData] = useState([]);

  const fetchProductData = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      if (!response.ok) throw new Error("Failed to fetch product data.");
      const result = await response.json();
      setProductData(result.data || []);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  
  }, []);
  return (
    <div>
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-[30px] mx-auto py-4'>
    {productData && productData.map((product) => (
       <SingleProduct 
       key={product._id}
       product={product}
       name ={product.name}
       price ={product.price}
       productPic={product.productPic}
       />
        ))}

    </div>
    <div>
      <Pagination/>
    </div>
    </div>
  )
}

export default VisibleProducts