import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { VacateDataApi } from '../../../Services/hostelAdmin';

function VacatingLetters() {
  const [details, setDetails] = useState([]);
  const hostelId = useSelector(state => state?.adminHostelData?.hostelId);

  const headers = useMemo(() => ({
    Authorization: JSON?.parse(localStorage.getItem("HostelAdminToken"))?.token
  }), []); 
  useEffect(() => {
    const fetchVacateLetters = async () => {
      try {
        const response = await VacateDataApi(headers, hostelId);

        if (response.data) {
          setDetails(response?.data?.VacateDatas);
        } else {
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchVacateLetters();
  }, [headers, hostelId]);

  return (
    <>
      <div>
        <h1 className="text-[#002D74] text-2xl font-bold pb-5">Vacating Letters</h1>
      </div>
      <div className="overflow-auto rounded-lg shadow">
        <table role="table" className="w-full table-auto">
          {details?.length > 0 && (
            <thead className="bg-[#4874BF] text-white">
              <tr role="row">
                <th colSpan={1} role="columnheader" className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">
                  No
                </th>
                <th colSpan={2} role="columnheader" className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">
                  Student Id
                </th>
                <th colSpan={3} role="columnheader" className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">
                  Student Name
                </th>
                <th colSpan={4} role="columnheader" className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">
                  Hostel Id
                </th>
                <th colSpan={5} role="columnheader" className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">
                  Date of vacate
                </th>
                <th colSpan={6} role="columnheader" className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">
                  Reason
                </th>
              </tr>
            </thead>
          )}
          <tbody className="bg-white">
            {details?.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-3 text-gray-500 text-2xl font-bold text-center">
                  No data available
                </td>
              </tr>
            ) : (
              details.map((VacateDatas, index) => (
                <tr className={index % 2 === 0 ? 'odd:bg-white even:bg-gray-200' : 'odd:bg-white even:bg-gray-50 hover:bg-gray-200'} key={VacateDatas._id}>
                  <td role="cell" className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">{index + 1}</td>
                  <td role="cell" className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">{VacateDatas?.userId}</td>
                  <td role="cell" className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">{VacateDatas?.fullName}</td>
                  <td role="cell" className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">{VacateDatas?.hostelId}</td>
                  <td role="cell" className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">{VacateDatas?.vacatingLetterDate}</td>
                  <td role="cell" className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">{VacateDatas?.reason}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default VacatingLetters;
