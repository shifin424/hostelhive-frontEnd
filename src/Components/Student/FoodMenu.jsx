import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MenuDataApi } from '../../Services/studentsServices';

function FoodMenu() {
  const [foodData, setFoodData] = useState([]);
 
  const bookingStatus = useSelector(state => state?.roomBookingData?.bookingDetails?.bookingStatus[0]);
  const hostelId = bookingStatus.hostelId;

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const headers = {
          Authorization: JSON.parse(localStorage.getItem('StudentToken')).token,
        };
        const response = await MenuDataApi(headers, hostelId);
        if (response) {
          console.log(response.data.menuData);
          setFoodData(response.data.menuData);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMenuData();
  }, [hostelId]);


  return (
    <>
      <div>
        <h1 className='text-[#002D74] font-bold text-2xl pb-5 '>Food Menu </h1>
      </div>
      <div className="overflow-x-auto ">
        <table className="w-full bg-white rounded-lg overflow-hidden">
          {foodData.length > 0 && (
            <thead className="bg-[#4874BF]">
              <tr>
                <th className="p-3 text-white text-sm font-bold tracking-wide text-left">NO</th>
                <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Day</th>
                <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Breakfast</th>
                <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Lunch</th>
                <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Snacks</th>
                <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Dinner</th>
              </tr>
            </thead>
          )}
          <tbody>
            {foodData.length > 0 ? (
              foodData.map((data, index) => (
                <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} key={index}>
                  <td className="p-3 text-gray-500 font-semibold">{index + 1}</td>
                  <td className="p-3 text-gray-500 font-semibold">{data?.day}</td>
                  <td className="p-3 text-gray-500 font-semibold">{data?.breakfast}</td>
                  <td className="p-3 text-gray-500 font-semibold">{data?.lunch}</td>
                  <td className="p-3 text-gray-500 font-semibold">{data?.snacks}</td>
                  <td className="p-3 text-gray-500 font-semibold">{data?.dinner}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-3 text-gray-500 text-2xl font-bold text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FoodMenu;
