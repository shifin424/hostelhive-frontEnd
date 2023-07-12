import React, { useEffect, useState } from 'react'
import { fetchRentDueData } from '../../../Services/studentsServices';


function RentDue() {

  const [details, setDetails] = useState([])

  useEffect(() => {
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("StudentToken")).token
    };
    const paymentInfo = async () => {
      try {
        const response = await fetchRentDueData(headers);

        if (response.data) {
          setDetails(response.data);
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
      {details.length === 0 ? (
        <div>
          <div className="flex justify-between p-3 mt-5">
            <h1 className="flex text-2xl text-[#002D74] font-bold text-center">Payment Info</h1>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-col shadow-xl bg-[#ccdcd4] rounded-md w-11/12 sm:w-3/4 lg:w-1/3">
              <div className="font-bold text-xl px-6 py-8 text-black border-b border-[#bfbfbf]">Payment Summary</div>
              <div className="flex justify-between py-5 text-black">
                <div className="sm:text-lg px-6 font-semibold">Rent Date</div>
                <div className="sm:text-lg px-12 font-semibold">Rs.50000</div>
              </div>
              <div className="flex justify-between py-5 text-black">
                <div className="sm:text-lg px-6 font-semibold">Last Date (Without Fine)</div>
                <div className="sm:text-lg px-12 font-semibold">Rs.5000</div>
              </div>
              <div className="flex justify-between py-5 text-black">
                <div className="sm:text-lg px-6 font-semibold">Last Date (With Fine)</div>
                <div className="sm:text-lg px-12 font-semibold">Rs.1000</div>
              </div>
              <div className="flex justify-between py-5 text-black">
                <div className="sm:text-lg px-6 font-bold">Rent Amount</div>
                <div className="sm:text-lg px-12 font-bold">Rs.3000</div>
              </div>
              <div className="flex justify-between py-5 text-black">
                <div className="sm:text-lg px-6 font-bold">Fine Amount</div>
                <div className="sm:text-lg px-12 font-bold">Rs.3000</div>
              </div>
              <div className="flex justify-between py-5 text-black">
                <div className="sm:text-lg px-6 font-bold">Total Payment Amount</div>
                <div className="sm:text-lg px-12 font-bold">Rs.3000</div>
              </div>
              <div className="flex justify-center py-7">
                <button
                  className="bg-[#235784] text-white w-5/6 py-2 font-bold text-lg rounded-md transform hover:scale-110 transition duration-300"
                  onClick={() => handleClick()}
                >
                  Make Payment
                </button>
              </div>
              <div className="flex justify-center pb-8">
                <button className="bg-blue-300 text-blue-900 w-5/6 py-2 font-bold text-lg rounded-md transform hover:scale-110 transition duration-300">
                  <a href="/roomTypes">Back</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-black text-2xl'>No due amount</div>
      )}
    </>
  );
}

export default RentDue
