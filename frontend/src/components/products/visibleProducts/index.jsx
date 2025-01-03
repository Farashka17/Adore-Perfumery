import React, { useEffect, useState } from 'react';
import SingleProduct from '../../common/singleProduct';
import { useLocation } from 'react-router-dom';

const VisibleProducts = () => {
  const [productData, setProductData] = useState([]);
  const location = useLocation();

  const fetchProductData = async () => {
    try {
      
      const query = location.search;
      const endpoint = query ? `http://localhost:3000/products${query}` : `http://localhost:3000/products`;

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch product data.");
      const result = await response.json();

      
      setProductData(result.data || []);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [location.search]); 

  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-[30px] mx-auto py-4 '>
        {productData.length > 0 ? (
          productData.map((product) => (
          
          <div>
             <SingleProduct 
             id={product._id}
              key={product._id}
              product={product}
              name={product.name}
              price={product.price}
              volume={product.volume}
              description={product.description}
              productPic={product.productPic}
            />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found based on the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default VisibleProducts;
