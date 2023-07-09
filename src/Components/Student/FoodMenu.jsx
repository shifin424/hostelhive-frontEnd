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
      <div className="overflow-auto rounded-lg shadow">
        <table role="table" className="w-full table-auto">
          {foodData.length > 0 && (
            <thead className="bg-[#4874BF] text-white">
              <tr role="row">
                <th
                  colSpan="1"
                  role="columnheader"
                  className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                >
                  NO
                </th>
                <th
                  colSpan="1"
                  role="columnheader"
                  className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                >
                  Day
                </th>
                <th
                  colSpan="1"
                  role="columnheader"
                  className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                >
                  Breakfast
                </th>
                <th
                  colSpan="1"
                  role="columnheader"
                  className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                >
                  Lunch
                </th>
                <th
                  colSpan="1"
                  role="columnheader"
                  className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                >
                  Snacks
                </th>
                <th
                  colSpan="1"
                  role="columnheader"
                  className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                >
                  Dinner
                </th>
              </tr>
            </thead>
          )}
          <tbody role="rowgroup" className="bg-white">
            {foodData.length > 0 ? (
              foodData.map((data, index) => (
                <tr
                  role="row"
                  className="odd:bg-white even:bg-gray-200"
                  key={index}
                >
                  <td
                    role="cell"
                    className="p-3 text-gray-500 font-semibold text-center border-b border-gray-300"
                  >
                    {index + 1}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-gray-500 font-semibold text-center border-b border-gray-300"
                  >
                    {data?.day}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-gray-500 font-semibold text-center border-b border-gray-300"
                  >
                    {data?.breakfast}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-gray-500 font-semibold text-center border-b border-gray-300"
                  >
                    {data?.lunch}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-gray-500 font-semibold text-center border-b border-gray-300"
                  >
                    {data?.snacks}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-gray-500 font-semibold text-center border-b border-gray-300"
                  >
                    {data?.dinner}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="p-3 text-gray-500 text-2xl font-bold text-center"
                >
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
