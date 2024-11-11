import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Filter = () => {
  const [isFragranceOpen, setIsFragranceOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isConcentrationOpen, setIsConcentrationOpen] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);

  const toggleFragranceArrows = () => {
    setIsFragranceOpen(!isFragranceOpen);
  };
  const toggleBrandArrows = () => {
    setIsBrandOpen(!isBrandOpen);
  };
  const toggleGenderArrows = () => {
    setIsGenderOpen(!isGenderOpen);
  };
  const toggleConcentrationArrows = () => {
    setIsConcentrationOpen(!isConcentrationOpen);
  };
  const toggleVolumeArrows = () => {
    setIsVolumeOpen(!isVolumeOpen);
  };
  const togglePriceArrows = () => {
    setIsPriceOpen(!isPriceOpen);
  };

  
  const [fragranceData, setFragranceData] = useState([]);
  const [concentrationData, setConcentrationData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [brandData, setBrandData] = useState([]);




  // Veritabanından fragrance verilerini çekme fonksiyonu
  const fetchFragranceData = async () => {
    try {
      const response = await fetch("http://localhost:3000/fragranceFamily");
      if (!response.ok) throw new Error("Failed to fetch fragrance data.");
      const result = await response.json();
      setFragranceData(result.data || []);
    } catch (error) {
      console.error("Error fetching fragrance data:", error);
    }
  };

  const fetchConcentrationData = async () => {
    try {
      const response = await fetch("http://localhost:3000/concentrations");
      if (!response.ok) throw new Error("Failed to fetch concentration data.");
      const result = await response.json();
      setConcentrationData(result.data || []);
    } catch (error) {
      console.error("Error fetching concentration data:", error);
    }
  };

  const fetchVolumeData = async () => {
    try {
      const response = await fetch("http://localhost:3000/volumes");
      if (!response.ok) throw new Error("Failed to fetch concentration data.");
      const result = await response.json();
      setVolumeData(result.data || []);
    } catch (error) {
      console.error("Error fetching volume data:", error);
    }
  };

  const fetchBrandData = async () => {
    try {
      const response = await fetch("http://localhost:3000/brands");
      if (!response.ok) throw new Error("Failed to fetch brand data.");
      const result = await response.json();
      setBrandData(result.data || []);
    } catch (error) {
      console.error("Error fetching brand data:", error);
    }
  };

  useEffect(() => {
    fetchFragranceData();
    fetchConcentrationData();
    fetchVolumeData()
    fetchBrandData()
  }, []);

  return (
    <div className='absolute  mx-auto z-10 md:relative w-[200px] hidden md:flex flex-col justify-start'>
      <button><p className='font-raleway text-[25px] text-left'>All products</p></button>
      <div className='w-[200px] h-[2px] bg-[#dbaf77] my-3'></div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-[22px] font-medium text-[#212121]">Fragrance Family</p>
          <button onClick={toggleFragranceArrows}>
            {isFragranceOpen ? <IoIosArrowUp className="cursor-pointer" /> : <IoIosArrowDown className="cursor-pointer" />}
          </button>
        </div>
        <div>
      {isFragranceOpen && (
         <ul className='flex flex-col items-start gap-3'>
         {fragranceData && fragranceData.map((fragrance) => (
        <button key={fragrance._id}>
          <li className='hover:text-[#dbaf77] text-[18px] font-raleway'>{fragrance.name}</li>
        </button>
        ))}
       </ul>
      )}
      </div>
      </div>

      <div className='w-[200px] h-[2px] bg-[#dbaf77] my-3'></div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-[22px] font-medium text-[#212121]">Gender</p>
          <button onClick={toggleGenderArrows}>
            {isGenderOpen ? <IoIosArrowUp className="cursor-pointer" /> : <IoIosArrowDown className="cursor-pointer" />}
          </button>
        </div>
        <div>
          {isGenderOpen && (
            <ul className='flex flex-col items-start gap-3'>
              <button><li className='hover:text-[#dbaf77] text-[18px] font-raleway'>Woman</li></button>
              <button><li className='hover:text-[#dbaf77] text-[18px] font-raleway'>Man</li></button>
              <button><li className='hover:text-[#dbaf77] text-[18px] font-raleway'>Unisex</li></button>
              <button><li className='hover:text-[#dbaf77] text-[18px] font-raleway'>Kids</li></button>
            </ul>
          )}
        </div>
      </div>

      <div className='w-[200px] h-[2px] bg-[#dbaf77] my-3'></div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-[22px] font-medium text-[#212121]">Concentration</p>
          <button onClick={toggleConcentrationArrows}>
            {isConcentrationOpen ? <IoIosArrowUp className="cursor-pointer" /> : <IoIosArrowDown className="cursor-pointer" />}
          </button>
        </div>
        <div>
          {isConcentrationOpen && (
            <ul className='flex flex-col items-start gap-3'>
        {concentrationData && concentrationData.map((concentration) => (
        <button key={concentration._id}>
          <li className='hover:text-[#dbaf77] text-[18px] font-raleway'>{concentration.name}</li>
        </button>
        ))}
            </ul>
          )}
        </div>
      </div>

      <div className='w-[200px] h-[2px] bg-[#dbaf77] my-3'></div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-[22px] font-medium text-[#212121]">Brands</p>
          <button onClick={toggleBrandArrows}>
            {isBrandOpen ? <IoIosArrowUp className="cursor-pointer" /> : <IoIosArrowDown className="cursor-pointer" />}
          </button>
        </div>
        <div>
          {isBrandOpen && (
            <ul className='flex flex-col items-start gap-3'>
               {brandData && brandData.map((brand) => (
        <button key={brand._id}>
          <li className='hover:text-[#dbaf77] text-[18px] font-raleway'>{brand.name}</li>
        </button>
        ))}
            </ul>
          )}
        </div>
      </div>

      <div className='w-[200px] h-[2px] bg-[#dbaf77] my-3'></div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-[22px] font-medium text-[#212121]">Volume</p>
          <button onClick={toggleVolumeArrows}>
            {isVolumeOpen ? <IoIosArrowUp className="cursor-pointer" /> : <IoIosArrowDown className="cursor-pointer" />}
          </button>
        </div>
        <div>
          {isVolumeOpen && (
            <ul className='flex flex-col items-start gap-3'>
               {volumeData && volumeData.map((volume) => (
        <button key={volume._id}>
          <li className='hover:text-[#dbaf77] text-[18px] font-raleway'>{volume.name}</li>
        </button>
        ))}
            </ul>
          )}
        </div>
      </div>

      <div className='w-[200px] h-[2px] bg-[#dbaf77] my-3'></div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-[22px] font-medium text-[#212121]">Price</p>
          <button onClick={togglePriceArrows}>
            {isPriceOpen ? <IoIosArrowUp className="cursor-pointer" /> : <IoIosArrowDown className="cursor-pointer" />}
          </button>
        </div>
        <div>
          {isPriceOpen && (
            <ul className='flex flex-col items-start gap-3'>
              <button><li className='hover:text-[#dbaf77] text-[18px] font-raleway'>Under $50</li></button>
              <button><li className='hover:text-[#dbaf77] text-[18px] font-raleway'>$50 - $100</li></button>
              <button><li className='hover:text-[#dbaf77] text-[18px] font-raleway'>$100 - $150</li></button>
              <button><li className='hover:text-[#dbaf77] text-[18px] font-raleway'>Over $150</li></button>
            </ul>
          )}
        </div>
      </div>
      <div className='w-[200px] h-[2px] bg-[#dbaf77] my-3'></div>

      <div className="flex justify-start items-center mb-3">
        <input
          type="checkbox"
          checked={isOnSale}
          onChange={() => setIsOnSale(!isOnSale)}
          className="mr-2 cursor-pointer"
        />
        <p className="text-[22px] font-medium text-[#212121]">On Sale</p>
      </div>

    </div>
  );
};

export default Filter;
