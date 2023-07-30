import React from 'react'
import './Style.css'
import service from '../../../../assets/images/service.jpg'
import Reviews from '../../../../assets/images/Reviews.jpg'
import Privacy from '../../../../assets/images/Privacy.jpg'

function Cards() {
    return (
        <>
            <div className='text-[#002D7A] p-4 font-bold text-3xl '>
                <h2>Things We Offer </h2>
            </div>
            <div className='flex justify-center w-full h-[27rem]'>
                <div class='container'>
                    <div class='card'>
                        <div class='imgBx'>
                            <img src={service} alt="" />
                        </div>
                        <div class='content'>
                            <h2 className=' text-[#002D7A] font-bold text-2xl mb-2'>Services</h2>
                            <p class='heading'>Convenient, efficient, real-time availability, secure payments, user-friendly interface, streamlines operations, enhances customer satisfaction, optimized resource management.
                            </p>
                        </div>
                    </div>
                    <div class='card'>
                        <div class='imgBx'>
                            <img src={Reviews} alt="" />
                        </div>
                        <div class='content'>
                            <h1 className=' text-[#002D7A] font-bold text-2xl mb-2'>Reviews</h1>
                            <p class='heading'>Guests' detailed reviews & ratings for rooms foster transparency and continuous improvement, aiding potential guests in making informed decisions. Hostel administrators gain valuable insights for better services.
                            </p>
                        </div>
                    </div>
                    <div class='card'>
                        <div class='imgBx'>
                            <img src={Privacy} alt="" />
                        </div>
                        <div class='content'>
                            <h1 className=' text-[#002D7A] font-bold text-2xl mb-2'>Data Security and Privacy</h1>
                            <p class='heading'>We prioritize guest data security, employing encryption, regular backups, and stringent compliance with data privacy regulations for a trusted and safe online experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Cards
