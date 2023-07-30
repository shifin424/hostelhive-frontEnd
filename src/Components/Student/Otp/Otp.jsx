import React, { useState, useRef } from 'react';
import { createRef } from 'react';
import image from '../../../assets/images/loginImage.jpg';
import { otpData } from '../../../Redux/Features/student/OtpSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik'; 
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import {toast} from 'react-toastify'


function Otp() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  console.log(error);
  const [isInvalidOtp, setIsInvalidOtp] = useState(false);

  const inputRefs = useRef([...Array(6)].map(() => createRef()));
  const navigate = useNavigate()
  const  StudentAuth  = useSelector((state) => state?.studentAuth?.AuthData?.response);
  const dispatch = useDispatch();
  const submitButtonRef = useRef(null);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) {
      setError('Only numbers are allowed');
      setIsInvalidOtp(true);
      return;
    }
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
    setError('');
    setIsInvalidOtp(false);

    const updatedFormikOtp = updatedOtp.join('');
    formik.setFieldValue('otp', updatedFormikOtp);

    if (value !== '') {
      if (index === otp.length - 1) {
        submitButtonRef.current.focus();
      } else {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = '';
      setOtp(updatedOtp);
      if (index > 0) {
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      otp: otp,
    },
  });

  const handleSubmit = async (e) => {
    console.log("inside otp controller");
    e.preventDefault();
    if (isInvalidOtp) {
      setError('Invalid OTP');
      return;
    }
    try {
      const enteredOtp = formik.values.otp; 
      const dataToSend = {
        ...StudentAuth,
        otp: enteredOtp, 
      };
      const response = await dispatch(otpData(dataToSend));
      if (response) {
        console.log(response);
       navigate('/login');
       message.success("Otp Verified Successfully")
      }
    } catch (error) {
      toast.error(error)
      console.log('Error occurred during OTP confirmation:', error);
    }
  };

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center  ">
        <div className="bg-gray-100 flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-8">
            <h2 className="font-bold text-2xl text-[#002D74]">OTP Verification</h2>
            <p className="text-xs mt-4 text-[#002D74]">Enter the OTP sent to your phone number</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex justify-between">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    className="p-2 rounded-xl border mr-1 bg-white w-1/6 text-center"
                    type="text"
                    name="otp"
                    maxLength={1}
                    ref={inputRefs.current[index]}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onChange={(e) => handleChange(e, index)}
                    value={formik.values.otp[index]}
                  />
                ))}
              </div>

              {isInvalidOtp && <div className="text-red-500 text-xs">Invalid OTP</div>}

              <button
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                type="submit"
                ref={submitButtonRef}
              >
                Verify
              </button>
            </form>

            <div id="recaptcha-container"></div>

            <div className="mt-6 text-xs text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center">Didn't receive the OTP?</p>
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 text-[#002D74]">
                Resend OTP
              </button>
            </div>
          </div>

          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={image} alt="Signup " />
          </div>
        </div>
      </section>
    </>
  );
}

export default Otp;
