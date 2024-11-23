import React, { useEffect, useState } from 'react'
import PageTitleImageBackground from '../common/pageTitleImageBackground'
import SingleProduct from '../common/singleProduct';

const TopProductsComponent = () => {
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

    const title="Top Products"
  return (
    <div className="bg-[white]  md:mx-auto font-nunito w-full">
    <div className="w-full flex flex-col  mx-auto  py-[25px]">
      <PageTitleImageBackground title={title}/>
         <div className='grid grid-cols-2 gap-y-10 gap-x-10  md:grid-cols-4 container max-w-[1210px] mx-auto my-5'>
          {topSellerProducts.map(product => (
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
     </div>
     </div>

  )
}

export default TopProductsComponent