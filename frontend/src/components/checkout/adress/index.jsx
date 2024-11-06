import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import OrangeShape from "../../../assets/OrangeShape.svg";

const Adress = () => {
  const [selectedRayon, setSelectedRayon] = useState("Select a region");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (rayon) => {
    setSelectedRayon(rayon);
    setIsOpen(false);
  };
  const rayonlar = [
    "Absheron", "Aghdam", "Aghdash", "Aghjabadi", "Aghstafa", "Aghsu", "Astara",
    "Babek", "Balakan", "Barda", "Beylagan", "Bilasuvar", "Dashkasan", "Fuzuli", 
    "Gadabay", "Ganja", "Goranboy", "Goychay", "Goygol", "Hajigabul", "Imishli", 
    "Ismayilli", "Jabrayil", "Jalilabad", "Kalbajar", "Khachmaz", "Khizi", 
    "Khojavend", "Kangarli", "Kurdamir", "Lachin", "Lankaran", "Lerik", 
    "Masalli", "Mingachevir", "Naftalan", "Nakhchivan", "Neftchala", "Oghuz", 
    "Ordubad", "Qabala", "Qakh", "Qazakh", "Quba", "Qubadli", "Qusar", 
    "Saatly", "Sabirabad", "Salyan", "Samukh", "Shabran", "Shahbuz", "Shaki", 
    "Shamakhi", "Shamkir", "Sharur", "Shirvan", "Siazan", "Sumgayit", "Tartar", 
    "Tovuz", "Ujar", "Yardimli", "Yevlakh", "Zangilan", "Zaqatala", "Zardab"
  ];

  return (
    <div className=" p-6 w-full">
      <img src={OrangeShape} className="w-[30px] h-[6px]" />
      <h2 className="font-raleway text-[#232323] text-[24px] font-thin">
        Billing Details
      </h2>

      <div className="flex flex-col md:flex-row md:gap-6 md:mb-4 justify-between">
        {/* First Name */}
        <div className="w-full">
          <input
            type="text"
            id="firstName"
            className="mt-1  w-full border border-[#E0E0E0] p-[17.2px]  placeholder:text-[#969696] font-nunito "
            placeholder="First name"
          />
        </div>

        {/* Last Name */}
        <div className="w-full">
          <input
            type="text"
            id="lastName"
            className="mt-1  w-full border border-[#E0E0E0] p-[17.2px]  placeholder:text-[#969696] font-nunito "
            placeholder="Last name"
          />
        </div>
      </div>

      {/* Diğer alanlar */}
      <div className="mb-4 flex flex-col gap-2">
        <input
          type="text"
          id="companyName"
          className="mt-1  w-full border border-[#E0E0E0] p-[17.2px] placeholder:placeholder:text-[#969696] font-nunito "
          placeholder="Company name"
        />

        {/* Rayon seçimi */}
        <div className="relative inline-block w-full ">
          {/* Select-like button */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="mt-1  w-full border border-[#E0E0E0] bg-white flex justify-between items-center p-[17.2px]  placeholder:text-[#969696] font-nunito "
          >
            <span className="text-black">{selectedRayon}</span>
            <span className="material-icons">
              {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </div>

          {/* Options list */}
          {isOpen && (
            <div className="absolute z-10 w-full bg-white border border-gray-300  rounded-md mt-2 max-h-60 overflow-y-auto shadow-lg">
              {rayonlar.map((rayon, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(rayon)}
                  className="cursor-pointer px-4 py-2  hover:bg-gray-100"
                >
                  {rayon}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          type="text"
          id="companyName"
          className="mt-1  w-full border border-[#E0E0E0] p-[17.2px]  placeholder:text-[#969696] font-nunito "
          placeholder="Town/City"
        />

        <input
          type="text"
          id="companyName"
          className="mt-1  w-full border border-[#E0E0E0] p-[17.2px]  placeholder:text-[#969696] font-nunito "
          placeholder="House number and street number"
        />

        <input
          type="text"
          id="companyName"
          className="mt-1  w-full border border-[#E0E0E0] p-[17.2px]  placeholder:text-[#969696] font-nunito "
          placeholder="Aparment,suite,unit etc.(optional)"
        />

        <input
          type="text"
          id="companyName"
          className="mt-1  w-full border border-[#E0E0E0] p-[17.2px]  placeholder:text-[#969696] font-nunito "
          placeholder="Zip Code"
        />

        <input
          type="text"
          id="companyName"
          className="mt-1  w-full border border-[#E0E0E0] p-[17.2px]  placeholder:text-[#969696] font-nunito "
          placeholder="Phone"
        />

        <input
          type="text"
          id="companyName"
          className="mt-1  w-full border border-[#E0E0E0] p-[17.2px]  placeholder:text-[#969696] font-nunito "
          placeholder="Email Address"
        />
      </div>

      {/* Ek alanlar için benzer input yapısı */}
      {/* Devamında ülke, şehir vb. alanları da ekleyebilirsiniz */}

      {/* Additional Information */}
      <div className="mt-6">
      <img src={OrangeShape} className="w-[30px] h-[6px]" />
        <h3 className="font-raleway text-[#232323] text-[24px] font-thin">
          Additional Information
        </h3>

        <textarea
          id="orderNotes"
          className="mt-1  w-full border border-[#E0E0E0] p-[17.2px]  placeholder:text-[#969696] font-nunito "
          placeholder="Order notes"
        ></textarea>
      </div>
    </div>
  );
};

export default Adress;
