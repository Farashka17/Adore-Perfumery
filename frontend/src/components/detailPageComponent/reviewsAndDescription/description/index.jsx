import React from 'react'
import { SiTicktick } from "react-icons/si";

const Description = ({product}) => {
  if (!product) return <p>Loading...</p>;
  return (
      
        <div className="bg-white font-nunito ">
      <div className="container    max-w-[1120px]   ">
        
          <p className='text-[#616161] text-[16px] font-nunito'>{product.description}</p>
              
        
    
    </div>
    </div>

 

  )
}

export default Description