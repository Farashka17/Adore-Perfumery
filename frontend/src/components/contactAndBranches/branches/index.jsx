import React, { useState } from 'react';
import SingleBranches from './singleBranches';

const addresses = [
  {
    id: 1,
    name: 'Adore Narimanov',
    address: 'Aga Neymetulla str.42',
    hours: '10:00-20:00',
    phone: '(012) 970',
    imgUrl: 'https://adorebeauty.az/assets/img/stores/adorenarimanov/adorenerimanovsite.jpg',
    iframeSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.29065802932!2d49.870396275866845!3d40.402411371441914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d819f9a75c5%3A0xf33110c1ba052c37!2sAdore%20perfumery%20%26%20cosmetics!5e0!3m2!1sen!2saz!4v1730841367970!5m2!1sen!2saz'
  },
  {
    id: 2,
    name: 'Adore 28 Mall',
    address: 'Azadliq avenue 15a / 4',
    hours: '10:00-20:00',
    phone: '(012) 970',
    imgUrl: '	https://adorebeauty.az/assets/img/stores/adore28mallsite.jpg',
    iframeSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.3442467742475!2d49.84189448487231!3d40.379062397820434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307da7a06b402f%3A0xd8897cf79ec36111!2s28%20Mall!5e0!3m2!1sen!2saz!4v1730841533980!5m2!1sen!2saz'
  },
  {
    id: 3,
    name: 'Adore Ganjlik Mall',
    address: 'Fatali Khan Khoyski 14',
    hours: '10:00-20:00',
    phone: '(012) 970',
    imgUrl: '		https://adorebeauty.az/assets/img/stores/adoregenclikmallsite.jpg',
    iframeSrc:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.3935878613897!2d49.84807368487967!3d40.40013079780824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d5d5a2c1005%3A0x5ede1cc1418ccc54!2sGanjlik%20Mall!5e0!3m2!1sen!2saz!4v1730841731288!5m2!1sen!2saz'
  },
  
];

const Branches = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleMapClick = (branch) => {
    setSelectedBranch(branch);
  };

  return (
    <div className="bg-[white] md:mx-auto font-nunito w-full">
      <div className="container max-w-[1420px] flex flex-col items-center justify-center gap-14 mx-auto md:px-10 py-[25px] px-[15px]">
        <p className='font-dancing text-[48px]'>Our branches</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((branch) => (
            <SingleBranches key={branch.id} branch={branch} onMapClick={handleMapClick} />
          ))}
        </div>

        {/* Seçilen adresin haritası */}
        <div className="w-full mt-8">
          {selectedBranch ? (
            <iframe
              title={selectedBranch.name}
              src={selectedBranch.iframeSrc}
              width="100%"
              height="400px"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          ) : (
            <p className="text-center text-gray-500">Bir adres seçmek için "Look in map" butonuna tıklayın.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Branches;
