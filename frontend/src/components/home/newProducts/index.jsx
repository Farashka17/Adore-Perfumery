import React, { useEffect, useState } from 'react'
import NewSingleProduct from '../../common/newSingleProduct'
import SolYarpaq from '../../../assets/SolYarpaq.svg'
import BigPerfume from '../../../assets/BigPerfume.svg'
import SagYarpaq from '../../../assets/SagYarpaq.svg'

const NewProducts = () => {

  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
   
        const response = await fetch('http://localhost:3000/products?newArrivals=true');
        const data = await response.json();
       
        setNewProducts(data.data);
      } catch (error) {
        console.error("New products fetching error:", error);
      }
    };

    fetchNewProducts();
  }, []);

  return (
  <div className=''>
  <div className='min-w-[390px] container max-w-[1920px] mx-auto my-8'>
    <div className=' flex flex-col items-center mt-[80px]'>
      <p className='font-dancing font-regular  text-[50px]'>New Products</p>
        <p className='font-raleway font-thin text-[38px] text-[#232323]'>Meet New Arrivals</p>
    </div>
    <div className='flex md:items-end items-center justify-center mt-10 md:justify-between mx-auto'>
      <div className='hidden lg:block '><img src={SolYarpaq}/></div>
      <div className='flex flex-col md:flex-row gap-[50px] '>
      <div className='grid gird-cols-1 md:grid-cols-2 gap-y-[30px] gap-x-[50px]'>
      {newProducts.slice(0,6).map(product => (
            <NewSingleProduct 
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
      <div className='flex items-center justify-center'>
        <img src={BigPerfume}/>
      </div>

      </div>
      <div className='hidden lg:block'><img src={SagYarpaq}/></div>
    </div>
    
    </div>
    </div>
  )
}

export default NewProducts