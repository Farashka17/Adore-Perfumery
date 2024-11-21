import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import OrangeShape from "../../../assets/OrangeShape.svg";

const Adress = ({ onAddressChange }) => {  // Yeni prop ekledik
  const [selectedregion, setSelectedregion] = useState("Select a region");
  const [isOpen, setIsOpen] = useState(false);
  const [fullAddress, setFullAddress] = useState("");

  useEffect(() => {
    const storedAddress = localStorage.getItem("fullAddress");
    if (storedAddress) {
      setFullAddress(storedAddress);
    }
  }, []);
  

  const handleAddressChange = (e) => {
    setFullAddress(e.target.value);
    // Adres her değiştiğinde localStorage'a kaydediyoruz
    localStorage.setItem("fullAddress", e.target.value);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    region: "",
    city: "",
    fullAddress: "",
    apartment: "",
    zipCode: "",
    orderNotes: "",
  });

  const regionlar = [
    "Absheron", "Aghdam", "Aghdash", "Aghjabadi", "Aghstafa", "Aghsu", "Astara",
    "Babek","Baku", "Balakan", "Barda", "Beylagan", "Bilasuvar", "Dashkasan", "Fuzuli", 
    "Gadabay", "Ganja", "Goranboy", "Goychay", "Goygol", "Hajigabul", "Imishli", 
    "Ismayilli", "Jabrayil", "Jalilabad", "Kalbajar", "Khachmaz", "Khizi", 
    "Khojavend", "Kangarli", "Kurdamir", "Lachin", "Lankaran", "Lerik", 
    "Masalli", "Mingachevir", "Naftalan", "Nakhchivan", "Neftchala", "Oghuz", 
    "Ordubad", "Qabala", "Qakh", "Qazakh", "Quba", "Qubadli", "Qusar", 
    "Saatly", "Sabirabad", "Salyan", "Samukh", "Shabran", "Shahbuz", "Shaki", 
    "Shamakhi", "Shamkir", "Sharur", "Shirvan", "Siazan", "Sumgayit", "Tartar", 
    "Tovuz", "Ujar", "Yardimli", "Yevlakh", "Zangilan", "Zaqatala", "Zardab"
  ];

  const handleSelect = (region) => {
    setFormData({ ...formData, region });
    setSelectedregion(region);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    onAddressChange({ ...formData, [name]: value });  // Güncellenmiş formData'yı gönder
  };


  return (
    <div className="p-6 w-full">
      <img src={OrangeShape} className="w-[30px] h-[6px]" alt="Decoration" />
      <h2 className="font-raleway text-[#232323] text-[24px] font-thin">
        Billing Details
      </h2>

      <div className="flex flex-col md:flex-row md:gap-6 md:mb-4 justify-between">
        <div className="w-full">
          <input
            required
            type="text"
            name="firstName"
            className="mt-1 w-full border border-[#E0E0E0] p-[17.2px] placeholder:text-[#969696] font-nunito"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full">
          <input
            required
            type="text"
            name="lastName"
            className="mt-1 w-full border border-[#E0E0E0] p-[17.2px] placeholder:text-[#969696] font-nunito"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <div className="relative inline-block w-full">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="mt-1 w-full border border-[#E0E0E0] bg-white flex justify-between items-center p-[17.2px] placeholder:text-[#969696] font-nunito"
          >
            <span className="text-black">{selectedregion}</span>
            <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
          </div>

          {isOpen && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-2 max-h-60 overflow-y-auto shadow-lg">
              {regionlar.map((region, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(region)}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  {region}
                </div>
              ))}
            </div>
          )}
        </div>

        <input
          required
          type="text"
          name="city"
          className="mt-1 w-full border border-[#E0E0E0] p-[17.2px] placeholder:text-[#969696] font-nunito"
          placeholder="Town/City"
          value={formData.city}
          onChange={handleInputChange}
        />

        <input
          required
          type="text"
          name="Adress"
          className="mt-1 w-full border border-[#E0E0E0] p-[17.2px] placeholder:text-[#969696] font-nunito"
          placeholder="Full adress"
          value={formData.fullAdress}
          onChange={handleInputChange}
        />

    

        <input
          required
          type="text"
          name="zipCode"
          className="mt-1 w-full border border-[#E0E0E0] p-[17.2px] placeholder:text-[#969696] font-nunito"
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={handleInputChange}
        />

        <input
          required
          type="text"
          name="phone"
          className="mt-1 w-full border border-[#E0E0E0] p-[17.2px] placeholder:text-[#969696] font-nunito"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
        />

        <input
          required
          type="email"
          name="email"
          className="mt-1 w-full border border-[#E0E0E0] p-[17.2px] placeholder:text-[#969696] font-nunito"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-6">
        <img src={OrangeShape} className="w-[30px] h-[6px]" alt="Decoration" />
        <h3 className="font-raleway text-[#232323] text-[24px] font-thin">
          Additional Information
        </h3>
        <textarea
          name="orderNotes"
          className="mt-1 w-full border border-[#E0E0E0] p-[17.2px] placeholder:text-[#969696] font-nunito"
          placeholder="Order notes"
          value={formData.orderNotes}
          onChange={handleInputChange}
        ></textarea>
      </div>
    </div>
  );
};

export default Adress;
