import React, { useEffect, useState,useMemo } from 'react'
import { rentHistoryApi } from '../../../Services/studentsServices';
import { useSelector } from 'react-redux';

function RentHistory() {
  const [details, setDetails] = useState([])
  const bookingStatus = useSelector(state => state?.roomBookingData?.bookingDetails?.bookingStatus[0]);
  const hostelId = bookingStatus.hostelId
  console.log(details, "<<< checking front end data");

  const headers = useMemo(() => ({
    Authorization: JSON?.parse(localStorage.getItem("HostelAdminToken"))?.token
  }), []); 
  
  useEffect(() => {
   

    const fetchRentHistory = async () => {
      try {
        const response = await rentHistoryApi(headers, hostelId);

        if (response.data) {
          setDetails(response.data.rentData);
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRentHistory();
  }, [headers,hostelId]);

  return (
    <>
      <div className="flex justify-between p-3 mt-5">
        <h1 className="flex text-2xl text-[#002D74] font-bold text-center">Rent History</h1>
      </div>


      <div className="overflow-x-auto rounded-lg shadow">
        <table role="table" className="w-full">
          {details?.length > 0 && (
            <thead className="bg-[#4874BF] text-white">
              <tr role="row">
                <th
                  role="columnheader"
                  className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                >
                  No
                </th>
                <th
                  role="columnheader"
                  className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                >
                  Payment Id
                </th>
                <th
                  role="columnheader"
                  className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                >
                  Student Name
                </th>
                <th
                  role="columnheader"
                  className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                >
                  Rent Amount
                </th>
                <th
                  role="columnheader"
                  className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                >
                  Month Of Payment
                </th>
                <th
                  role="columnheader"
                  className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                >
                  Date Of Payment
                </th>
              </tr>
            </thead>
          )}
          <tbody role="row" className="bg-white">
            {details?.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-3 text-gray-500 text-2xl font-bold text-center">
                  No data available
                </td>
              </tr>
            ) : (
              details?.map((rentDatas, index) => (
                <tr
                  role="row"
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
                >
                  <td
                    role="cell"
                    className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                    key={rentDatas?._id}
                  >
                    {index + 1}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                  >
                    {rentDatas?._id}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                  >
                  {rentDatas?.student?.fullName}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                  >
                  ₹{rentDatas?.rentAmount}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                  >
                    {rentDatas?.monthOfPayment}
                  </td>
                  <td
                    role="cell"
                    className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                  >
                   {rentDatas?.createdAt}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>





    </>
  )
}

export default RentHistory
