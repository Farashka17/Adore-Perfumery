import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Hero = () => {

        const settings = {
 
          infinite: true,
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
          pauseOnHover: false,
          arrows: false,
          fade: true,
        };
      
        const images = [
          'https://adorebeauty.az/assets/img/banner/4.jpg',
          'https://adorebeauty.az/assets/img/banner/2.jpg',
          'https://adorebeauty.az/assets/img/banner/3.jpg',
          '	https://adorebeauty.az/assets/img/banner/1.jpg',
          'https://adorebeauty.az/assets/img/banner/5.jpg',
          '	https://adorebeauty.az/assets/img/banner/7.jpg'
        ];

  return (
    <div className=" mx-auto ">
      <div className="container max-w-[1920px] mx-auto ">
    
    <Slider {...settings}>
      {images.map((image, index) => (
        <button key={index}>
          <img src={image} alt={`Slide ${index}`} className="w-full h-auto transition-opacity duration-500"  />
        </button>
      ))}
    </Slider>
  </div>
  </div>

  )
}

export default Hero