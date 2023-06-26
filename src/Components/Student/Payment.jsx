import React, { useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { fetchPaymentInfo, paymentApi, paymentDataApi } from '../../Services/studentsServices';
import {message} from 'antd'

function Payment() {
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate()

  console.log(details, "logged data");

  useEffect(() => {
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("StudentToken")).token
    };
    console.log(headers, "front end token ");

    const paymentInfo = async () => {
      try {
        console.log(headers, id);
        const response = await fetchPaymentInfo(headers, id);

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
  }, [id]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  async function handleClick() {
    let orderId =
      "OD" + Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("razorpay SDK failed to load. Are you online?");
    }

   
    let paymetRes = {
      order_id: orderId,
      amount: details.totalRent,
      currency: "INR",
      payment_capture: 1,
    };

    const headers = {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('StudentToken')).token,
      },
    };

    const responce = await paymentApi(headers,paymetRes);
    console.log(responce, "responce of the payment");

    if (!responce.data.data) alert("Server error. Are you online?");
    else {
      const options = {
        key: "rzp_test_olbfPbHyDJjoSe",
        currency: responce.data.data.currency,
        amount: responce.data.data.amount,
        name: "Hostel Hive",
        description: "Wallet Transaction",
        image: "http://localhost:1337/logo.png",
        order_id: responce.data.data.id,

        handler: async function (response) {
         
            let rentPayment = {
              room_id: id,
              rentAmount: details.totalRent,
              rentpaymentMonth: getCurrentMonthAndYear()
            };

            const responce = await paymentDataApi({
              orderId: response.razorpay_order_id,
              rentPayment,
              headers,
            }).then(()=>{
              navigate("/success");
            }).catch((err)=>{
             message.error("Error occured")
            })
          
        },
        prefill: {
          name: "Muhammed shifin",
          email: "HostelHive@gmai.com",
          contact: "9999999999",
        },
        theme: { color: "#1f5215" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  }

  function getCurrentMonthAndYear() {
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    return `${month} ${year}`;
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen pb-16">
        <div className="flex flex-col shadow-xl bg-[#ccdcd4] rounded-md w-11/12 sm:w-3/4 lg:w-1/3">
          <div className="font-bold text-xl px-6 py-8 text-black border-b border-[#bfbfbf]">Payment Summary</div>
          <div className="flex justify-between py-5 text-black">
            <div className="sm:text-lg px-6 font-semibold">Monthly Rent</div>
            <div className="sm:text-lg px-12 font-semibold">Rs.{details.monthlyRent}</div>
          </div>
          <div className="flex justify-between py-5 text-black">
            <div className="sm:text-lg px-6 font-semibold">Rent for {getCurrentMonthAndYear()}</div>
            <div className="sm:text-lg px-12 font-semibold">Rs.{details.dynamicRent}</div>
          </div>
          <div className="flex justify-between py-5 text-black">
            <div className="sm:text-lg px-6 font-semibold">Admission Fees</div>
            <div className="sm:text-lg px-12 font-semibold">Rs.{details.admitFee}</div>
          </div>
          <div className="flex justify-between py-5 text-black">
            <div className="sm:text-lg px-6 font-bold">Total Payment Amount</div>
            <div className="sm:text-lg px-12 font-bold">Rs.{details.totalRent}</div>
          </div>
          <div className="flex justify-center py-7">
            <button
              className="bg-[#235784] text-white w-5/6 py-2 font-bold text-lg rounded-md transform hover:scale-110 transition duration-300"
              onClick={handleClick}
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
    </>
  );
}

export default Payment;
