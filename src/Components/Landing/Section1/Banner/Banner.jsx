import React from 'react';

import bannerImage from '../../../../assets/images/loginImage.jpg';
import bannerImage2 from '../../../../assets/images/banner.jpg';
import bannerImage3 from '../../../../assets/images/friends.jpg';



function Banner() {
    return (
        <div>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="grid gap-10 lg:grid-cols-2">
                    <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
                        <div className="max-w-xl mb-6">
                            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                                Elevate Your Hostel Experience with <span className="inline-block text-blue-600">Hostel Hive</span>
                            </h2>
                            <p className="text-base text-gray-700 md:text-lg">
                                Discover a world of seamless hostel living. Hostel Hive brings you an unparalleled experience, simplifying tasks and enhancing your stay. From easy bookings to streamlined administration, we're here to make your hostel life extraordinary.
                            </p>
                        </div>


                    </div>
                    <div className="flex items-center justify-center -mx-4 lg:pl-8">
                        <div className="flex flex-col items-end px-3">
                            <img
                                className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
                                src={bannerImage2}
                                alt=""
                            />
                            <img
                                className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
                                src={bannerImage3}
                                alt=""
                            />
                        </div>
                        <div className="px-3">
                            <img
                                className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
                                src={bannerImage}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
