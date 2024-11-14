import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from './product';
import ReviewsAndDescription from './reviewsAndDescription';

const DetailPageComponent = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => { 
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${id}`);
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Product fetching error:", error);
      }
    };

    fetchProduct();
  }, [id]);


  if (!product) return <p>Loading...</p>;

  return (
    <div className="bg-white font-nunito">
      <div className="container max-w-[1920px] flex flex-col gap-10 justify-center mx-auto px-10 py-6">
        <Product product={product}  id={product._id}/>
        <ReviewsAndDescription  product={product} />


      </div>
    </div>
  );
};

export default DetailPageComponent;
