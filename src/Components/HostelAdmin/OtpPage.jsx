import React, { useState, useRef, createRef, useEffect } from 'react';
import { verifyOtp } from '../../Services/hostelAdmin';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function OtpVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');

  const inputRefs = useRef([...Array(6)].map(() => createRef()));
  const submitButtonRef = useRef(null);

  const navigate = useNavigate();

  const [hostelAdmins,SetHostelAdmin] = useState(null)

  const hostelAdmin = useSelector(state => state.hostelAdmin.user)

  useEffect(() => {
    SetHostelAdmin(hostelAdmin)
  }, [hostelAdmin])
  

  console.log(hostelAdmin)

  const handleChange = (e, index) => {
    const { value } = e.target;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    setError('');

    if (value !== '') {
      if (index === otp.length - 1) {
        submitButtonRef.current.focus();
      } else {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const otpValue = otp.join('');



    if (otpValue.length !== 6) {
      setError('OTP must be 6 digits long');
    } else {
      const data = {
        ...hostelAdmins,
        otpCode: otpValue,
      };

      console.log("heyyyyyyy",data)

      verifyOtp(data)
        .then(() => {
          navigate('/hostelAdmin/login');
        })
        .catch((error) => {
          console.error('Error:', error);
          setError('Failed to verify OTP');
        });
    }
  };

  const handleResend = () => {
    // Resend OTP logic here
    console.log('OTP resent!');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-full sm:w-96 bg-white rounded-lg shadow-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-around mb-4">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                name="otpCode"
                className={`w-12 h-12 border rounded-lg px-3 py-2 bg-white border-blue-500 text-center ${
                  error && 'border-red-500'
                }`}
                value={otp[index] || ''}
                onChange={(e) => handleChange(e, index)}
                ref={inputRefs.current[index]} // Attach the reference to the input field
              />
            ))}
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mb-2"
            ref={submitButtonRef} // Attach the reference to the submit button
          >
            Submit
          </button>
        </form>
        <button
          onClick={handleResend}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}

export default OtpVerification;
