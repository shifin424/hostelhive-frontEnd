import React from 'react';
import './Style.css';
import service from '../../../../assets/images/service.jpg';
import Reviews from '../../../../assets/images/Reviews.jpg';
import Privacy from '../../../../assets/images/Privacy.jpg';

function Cards() {
  return (
    <div className="cards-container mt-5 ">
      <div className="text-[#002D7A] p-4 font-bold text-3xl ">
        <h2>Things We Offer</h2>
      </div>
      <div className="flex justify-center w-full">
        <div className="container">
          <div className="card">
            <div className="imgBx">
              <img src={service} alt="" />
            </div>
            <div className="content">
              <h2 className="text-[#002D7A] font-bold text-2xl mb-2">Services</h2>
              <p className="heading">
                Convenient, efficient, real-time availability, secure payments, user-friendly interface, streamlines
                operations, enhances customer satisfaction,innovative technology optimized resource management.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="imgBx">
              <img src={Reviews} alt="" />
            </div>
            <div className="content">
              <h1 className="text-[#002D7A] font-bold text-2xl mb-2">Reviews</h1>
              <p className="heading">
              Guests' detailed reviews & ratings for rooms foster transparency and continuous improvement, aiding potential guests in making informed decisions. Hostel administrators gain valuable insights for better services, accountability, and growth.              </p>
            </div>
          </div>
          <div className="card">
            <div className="imgBx">
              <img src={Privacy} alt="" />
            </div>
            <div className="content">
              <h1 className="text-[#002D7A] font-bold text-2xl mb-2">Data Security and Privacy</h1>
              <p className="heading">
                We prioritize guest data security, employing encryption, regular backups, regular and  backups and stringent compliance with
                data privacy regulations for a trusted and safe online experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
