import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { vacatingLetter } from '../../../Services/studentsServices';
import { useSelector } from 'react-redux';

function VacatingLetter() {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});
  const bookingStatus = useSelector(state => state?.roomBookingData?.bookingDetails?.bookingStatus[0]);
  const hostelId = bookingStatus?.hostelId

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};


    const currentDate = new Date().toISOString().split('T')[0];
    if (date === '') {
      validationErrors.date = 'Date is required';
    } else if (date <= currentDate) {
      validationErrors.date = 'Please select a future date';
    }

    if (reason === '') {
      validationErrors.reason = 'Reason is required';
    } else if (reason.split(' ').length < 5) {
      validationErrors.reason = 'Reason should have at least 5 words';
    } else if (reason.split(' ').length > 20) {
      validationErrors.reason = 'Reason should have at most 20 words';
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        const headers = {
          Authorization: JSON.parse(localStorage.getItem("StudentToken"))?.token
        };

        const data = {
          date,
          reason,
        };

        const response = await vacatingLetter(headers, data, hostelId)
        if (response.data.success) {
          console.log(response);
          toast.success("You are vacatted from the hostel")
        } else {
          toast.error("Error occured please try agin later")
        }
      }catch(error){
        toast.error("Error occured please try agin later")
      }

    
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-[#002D74] text-2xl font-bold pb-5">Vacating Letter</h1>
      </div>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-2xl overflow-hidden mt-10">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">Vacating Letter</h2>
        </div>
        <div className="px-4 py-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="datepicker" className="block text-gray-700 text-sm font-bold mb-2">
                Select Date:
              </label>
              <input
                id="datepicker"
                type="date"
                className={`rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 border ${errors.date ? 'border-red-500' : 'border-black'
                  } bg-white text-black focus:ring-blue-500`}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="reason" className="block text-gray-700 text-sm font-bold mb-2">
                Reason for Vacating:
              </label>
              <textarea
                id="reason"
                className={`rounded-md px-3 py-2 w-full h-32 resize-none text-black focus:outline-none border ${errors.reason ? 'border-red-500' : 'border-black'
                  } bg-white focus:ring-2 focus:ring-blue-500`}
                value={reason}
                placeholder="Enter your reason here...."
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
              {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-14 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default VacatingLetter;
