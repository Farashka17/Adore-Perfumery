import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Brands = () => {
    const images = [
        "https://adorebeauty.az/assets/img/clients/givenchylogo.png",
        "https://adorebeauty.az/assets/img/clients/diorlogo.png",
        "https://adorebeauty.az/assets/img/clients/xerjofflogo.png",
        "https://adorebeauty.az/assets/img/clients/tomfordlogo.png",
        "https://adorebeauty.az/assets/img/clients/guerlainlogo.png",
        "https://adorebeauty.az/assets/img/clients/pacorabannelogo.png",
        "https://adorebeauty.az/assets/img/clients/pilot65logo.png",
        "https://adorebeauty.az/assets/img/clients/esteelauderlogo.png",
        "https://adorebeauty.az/assets/img/clients/collistarlogo.png",
        "https://adorebeauty.az/assets/img/clients/carolinaherreralogo.png",
        "https://adorebeauty.az/assets/img/clients/bdklogo.png",


    ];
  
    const extendedImages = [...images, ...images]; // Görüntüleri iki kez ekleyin
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % extendedImages.length);
        }, 2000); // 2 saniye

        return () => clearInterval(interval);
    }, [extendedImages.length]);

  return (
    <div className=" mx-auto bg-[#b88e5d] bg-opacity-15 mt-[50px]">
      <div className=" mx-auto flex flex-col items-center justify-center  h-auto" >
      <div className="overflow-hidden w-full">
    <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 392 ? 4 : 1))}%)` }} // 4 görüntü görünür
    >
        {extendedImages.map((image, index) => (
            <button key={index} className="w-full md:w-1/4 flex-shrink-0">
                <img src={image} alt={`Slide ${index}`} className="w-full h-auto object-cover" />
            </button>
        ))}
    </div>
</div>
   
     </div>
    </div>
  )
}

export default Brands