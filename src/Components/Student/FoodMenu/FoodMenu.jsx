import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './FoodMenu.css'
import { MenuDataApi } from '../../../Services/studentsServices';



function FoodMenu() {

  const [foodData, setFoodData] = useState([]);
  console.log(foodData,"checking food data");

  const bookingStatus = useSelector(state => state?.roomBookingData?.bookingDetails?.bookingStatus[0]);
  const hostelId = bookingStatus.hostelId;

  console.log(hostelId,"checking hostel Id");

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const headers = {
          Authorization: JSON.parse(localStorage.getItem('StudentToken')).token,
        };
        const response = await MenuDataApi(headers, hostelId);
        if (response) {
          console.log(response?.data.menuData);
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

      <div className="flex justify-between p-3 mt-5">
        <h1 className="flex text-2xl text-[#002D74] font-bold text-center">Food Menu</h1>
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
                  No
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
                > Breakfast
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
                  className="odd:bg-white even:bg-gray-100 "
                  key={index}
                >
                  <td
                    role="cell"
                    className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                  >
                    {index + 1}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                  >
                    {data?.day}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                  >
                    {data?.breakfast}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                  >
                    {data?.lunch}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                  >
                    {data?.snacks}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                  >
                    {data?.dinner}
                  </td>
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




      {/* <div className="overflow-x-auto rounded-lg shadow">
        <table role="table" className="w-full">
          <thead className="bg-[#4874BF] text-white">
            <tr role="row">
              <th
                role="columnheader"
                className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
              >
                #
              </th>
              <th
                role="columnheader"
                className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
              >
                Day
              </th>
              <th
                role="columnheader"
                className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
              >
                Breakfast
              </th>
              <th
                role="columnheader"
                className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
              >
                Lunch
              </th>
              <th
                role="columnheader"
                className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
              >
                Snacks
              </th>
              <th
                role="columnheader"
                className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
              >
                Dinner
              </th>
            </tr>
          </thead>
          <tbody role="rowgroup" className="bg-white">
            <tr
              role="row"
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
            >
              <td
                role="cell"
                className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
              >
                1
              </td>
              <td
                role="cell"
                className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
              >
                Monday
              </td>
              <td
                role="cell"
                className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
              >
                Idli, Sambhar, Tea
              </td>
              <td
                role="cell"
                className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
              >
                Rice, Sambhar, Kumbalanga Pachadi, Achar, Pappadam
              </td>
              <td
                role="cell"
                className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
              >
                Black Tea and Biscuit
              </td>
              <td
                role="cell"
                className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
              >
                Chicken Majboos, Chicken Fry
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}

    </>
  );
}

export default FoodMenu;
