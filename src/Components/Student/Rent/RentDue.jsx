import React, { useEffect, useState } from 'react'
import { fetchRentDueData } from '../../../Services/studentsServices';


function RentDue() {

  const [details, setDetails] = useState([])
  console.log(details, 'Checking state data');

  useEffect(() => {
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("StudentToken")).token
    };
    const paymentInfo = async () => {
      try {
        const response = await fetchRentDueData(headers);
        console.log(response, "checking responce");

        if (response.data) {
          setDetails(response.data.data);
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    paymentInfo();
  }, []);

  async function handleClick() {
    console.log("handle clicked");
  }


  return (
    <>

      <div>
        <div className="flex justify-between p-3 mt-5">
          <h1 className="flex text-2xl text-[#002D74] font-bold text-center">Rent Due</h1>
        </div>
        {details?.length === 0 ? (
          <tr>
            <td colSpan={6} className="p-3 text-gray-500 text-2xl font-bold text-center">
              No data available
            </td>
          </tr>
        ) : (
          details.map((RentDatas, index) => (

            <div className="flex justify-center items-center">
              <div className="flex flex-col shadow-xl bg-[#ccdcd4] rounded-md w-11/12 sm:w-3/4 lg:w-1/3">
                <div className="font-bold text-xl px-6 py-8 text-black border-b border-[#bfbfbf]">Payment Summary</div>

                <div className="flex justify-between py-5 text-black">
                  <div className="sm:text-lg px-6 font-semibold">Rent Date</div>
                  <div className="sm:text-lg px-12 font-semibold">{RentDatas?.rentDate}</div>
                </div>
                <div className="flex justify-between py-5 text-black">
                  <div className="sm:text-lg px-6 font-semibold">Last Date (Without Fine)</div>
                  <div className="sm:text-lg px-12 font-semibold">{RentDatas?.lastDateWithoutFine}</div>
                </div>
                <div className="flex justify-between py-5 text-black">
                  <div className="sm:text-lg px-6 font-semibold">Last Date (With Fine)</div>
                  <div className="sm:text-lg px-12 font-semibold">{RentDatas?.lastDateWithFine}</div>
                </div>
                <div className="flex justify-between py-5 text-black">
                  <div className="sm:text-lg px-6 font-bold">Rent Amount</div>
                  <div className="sm:text-lg px-12 font-bold">Rs.{RentDatas?.rentAmount}</div>
                </div>
                <div className="flex justify-between py-5 text-black">
                  <div className="sm:text-lg px-6 font-bold">Fine Amount</div>
                  <div className="sm:text-lg px-12 font-bold">Rs.{RentDatas?.fine}</div>
                </div>
                <div className="flex justify-between py-5 text-black">
                  <div className="sm:text-lg px-6 font-bold">Total Payment Amount</div>
                  <div className="sm:text-lg px-12 font-bold">Rs.{RentDatas?.rentAmount + RentDatas?.fine}</div>
                </div>
                <div className="flex justify-center py-7">
                  <button
                    className="bg-[#235784] text-white w-5/6 py-2 font-bold text-lg rounded-md transform hover:scale-110 transition duration-300"
                    onClick={() => handleClick()}
                  >
                    Make Payment
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default RentDue
