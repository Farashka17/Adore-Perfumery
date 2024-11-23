import React, { useEffect, useState } from 'react';
import SingleProduct from '../../common/singleProduct';
import { Link } from 'react-router-dom';

const BestSeller = () => {
  const [topSellerProducts, setTopSellerProducts] = useState([]);

  useEffect(() => {
    const fetchTopSellerProducts = async () => {
      try {
    
        const response = await fetch('http://localhost:3000/products?topSeller=true');
        const data = await response.json();
       
        setTopSellerProducts(data.data);
      } catch (error) {
        console.error("Top seller products fetching error:", error);
      }
    };

    fetchTopSellerProducts();
  }, []);

  return (
    <div className="mx-auto ">
      <div className=" container max-w-[1120px] mx-auto flex flex-col items-center justify-center">
        <div className='flex items-center justify-center flex-col'>
          <p className='text-[50px] font-dancing'>Top products</p>
          <p className='font-raleway text-[38px] font-thin text-[#232323] leading-[50px]'>Top Sellers Products</p>
          <p className='font-nunito font-extralight text-[18px] text-[#9A9A9A] mt-[10px] mb-[50px]'>The stylish and organized cosmetic products</p>
        </div>
        <div className='grid grid-cols-1 gap-y-10 gap-x-10  md:grid-cols-4 '>
          {topSellerProducts.slice(0,4).map(product => (
            <SingleProduct  
              key={product._id}
              product={product}
              id={product._id}
              name={product.name}
              price={product.price}
              volume={product.volume}
              description={product.description}
              productPic={product.productPic}
            />
          ))}
        </div>
  <Link to={"/topProducts"}>   
    <button className='border border-[#232323] font-raleway text-[13px] px-10 py-[19px] mt-[50px]'>Explore More</button>
    </Link> 
      </div>
    </div>
  );
};

export default BestSeller;
