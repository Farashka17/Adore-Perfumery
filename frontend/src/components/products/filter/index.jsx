import React, { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../../store/useStore';

const Filter = ({ isMobileFilterOpen, closeFilter }) => {
  const { setFilter, fetchFilteredProducts, clearFilters } = useStore();  
  const [isFragranceOpen, setIsFragranceOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isConcentrationOpen, setIsConcentrationOpen] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleFragranceArrows = () => setIsFragranceOpen(!isFragranceOpen);
  const toggleBrandArrows = () => setIsBrandOpen(!isBrandOpen);
  const toggleGenderArrows = () => setIsGenderOpen(!isGenderOpen);
  const toggleConcentrationArrows = () => setIsConcentrationOpen(!isConcentrationOpen);
  const toggleVolumeArrows = () => setIsVolumeOpen(!isVolumeOpen);
  const togglePriceArrows = () => setIsPriceOpen(!isPriceOpen);

  const [fragranceData, setFragranceData] = useState([]);
  const [concentrationData, setConcentrationData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterSelect = (filterType, value, displayValue) => {
    const searchParams = new URLSearchParams(location.search);
  
   
    searchParams.set(filterType, value);
  
   
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: displayValue
    }));
  
    
    fetchFilteredProducts();
  
    navigate(`?${searchParams.toString()}`);
  };
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
      if (!response.ok) throw new Error("Failed to fetch volume data.");
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
    fetchVolumeData();
    fetchBrandData();
  }, []);

 
  const handleAllProductsClick = () => {
    clearFilters();  
    navigate("/products");  
    fetchFilteredProducts(); 
  };

  return (
    <div
    className={`bg-white px-6 md:px-0 mx-auto z-20 md:relative py-5  max-w-[250px]  border border-black border-opacity-10 rounded-[20px] md:border-none md:rounded-none md:w-full transition-transform duration-300 ease-in-out ${
      isMobileFilterOpen ? "fixed top-0 left-0 w-full h-full overflow-y-auto" : "hidden"
    } md:block`}
  >
    <div className="md:hidden flex justify-end mb-4">
      <button onClick={closeFilter}>
        <IoMdClose className="w-6 h-6 text-black" />
      </button>
    </div>
      <button onClick={handleAllProductsClick}><p className='font-raleway text-[25px] text-left'>All products</p></button>
      <div className='w-full h-[2px] bg-[#dbaf77] my-3'></div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-[22px] font-medium text-[#212121]">Fragrance Family</p>
          <button onClick={toggleFragranceArrows} >
            {isFragranceOpen ? <IoIosArrowUp className="cursor-pointer" /> : <IoIosArrowDown className="cursor-pointer" />}
          </button>
        </div>
        <div>
      {isFragranceOpen && (
         <ul className='flex flex-col items-start gap-3'>
         {fragranceData && fragranceData.map((fragrance) => (
        <button key={fragrance._id}  onClick={() => handleFilterSelect('fragranceFamily', fragrance.name)}>
          <li className='hover:text-[#dbaf77] text-[18px] font-raleway'>{fragrance.name}</li>
        </button>
        ))}
       </ul>
      )}
      </div>
      </div>

      <div className='w-full h-[2px] bg-[#dbaf77] my-3'></div>

      <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-[22px] font-medium text-[#212121]">Gender</p>
          <button onClick={toggleGenderArrows} >
            {isGenderOpen ? <IoIosArrowUp className="cursor-pointer" /> : <IoIosArrowDown className="cursor-pointer" />}
          </button>
        </div>
        <div>
          {isGenderOpen && (
            <ul className='flex flex-col items-start gap-3'>
              {['Woman', 'Man', 'Unisex', 'Kids'].map((gender) => (
            <button key={gender}  onClick={() => handleFilterSelect('gender', gender)}>
              <li className='hover:text-[#dbaf77] text-[18px] font-raleway'>{gender}</li>
            </button>
          ))}
            </ul>
          )}
        </div>
      </div>

      <div className='w-full h-[2px] bg-[#dbaf77] my-3'></div>

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
        <button key={concentration._id} onClick={() => handleFilterSelect('concentration', concentration.name)}>
          <li className='hover:text-[#dbaf77] text-[18px] font-raleway'>{concentration.name}</li>
        </button>
        ))}
            </ul>
          )}
        </div>
      </div>

      <div className='w-full h-[2px] bg-[#dbaf77] my-3'></div>

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
        <button key={brand._id} onClick={() => handleFilterSelect('brand', brand.name)}>
          <li className='hover:text-[#dbaf77] text-[18px] font-raleway'>{brand.name}</li>
        </button>
        ))}
            </ul>
          )}
        </div>
      </div>

      <div className='w-full h-[2px] bg-[#dbaf77] my-3'></div>

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
        <button key={volume._id} onClick={() => handleFilterSelect('volume', volume.name)}>
          <li className='hover:text-[#dbaf77] text-[18px] font-raleway'>{volume.name}</li>
        </button>
        ))}
            </ul>
          )}
        </div>
      </div>

      <div className='w-full h-[2px] bg-[#dbaf77] my-3'></div>

      {/* <div>
        <div className="flex justify-between items-center mb-3">
          <p className="text-[22px] font-medium text-[#212121]">Price</p>
          <button onClick={togglePriceArrows}>
            {isPriceOpen ? <IoIosArrowUp className="cursor-pointer" /> : <IoIosArrowDown className="cursor-pointer" />}
          </button>
        </div>
        <div>
          {isPriceOpen && (
            <ul className='flex flex-col items-start gap-3'>


{['Under $50', '$50 - $100', '$100 - $150', 'Over $150'].map((price) => (
            <button key={price}  onClick={() => handleFilterSelect('price', price)}>
              <li className='hover:text-[#dbaf77] text-[18px] font-raleway'>{price}</li>
            </button>
          ))}
            </ul>
          )}
        </div>
      </div> */}
      {/* <div className='w-full h-[2px] bg-[#dbaf77] my-3'></div> */}

      {/* <div className="flex justify-start items-center mb-3">
        <input
          type="checkbox"
          checked={isOnSale}
          onChange={() => setIsOnSale(!isOnSale)}
          className="mr-2 cursor-pointer"
        />
        <p className="text-[22px] font-medium text-[#212121]">On Sale</p>
      </div> */}

    </div>
  );
};

export default Filter;
