import React from 'react';
import Image from '../../../assets/images/hostel-promo.jpg';

function Banner() {
  const bannerStyle = {
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '30rem',
    width: '100%',
  };

  return (
    <div>
      <div>
        <img
          className='opacity-25 absolute'
          style={bannerStyle}
          src={Image}
          alt=""
        />
        <div className='w-full mx-auto max-w-screen-xl '>
          <h1 className='relative text-white animate-pulse text-center md:pt-44 text-5xl  font-popins'>
            "Hostels are a melting pot of cultures, languages, and experiences, where everyone is welcome and making memories together”
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Banner;
