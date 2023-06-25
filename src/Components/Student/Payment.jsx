import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchPaymentInfo } from '../../Services/studentsServices';

function Payment() {
    const [details, setDetails] = useState([]);
    const { id } = useParams();

    console.log(details, "logged data");

    useEffect(() => {

        const headers = {
            Authorization: JSON.parse(localStorage.getItem("StudentToken")).token
        };
        console.log(headers, "front end token ");
        const paymentInfo = async () => {
            try {
                console.log(headers, id);
                const response = await fetchPaymentInfo(headers, id)

                if (response.data) {
                    setDetails(response.data)
                } else {
                    console.log(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        paymentInfo()

    }, [id])

    function getCurrentMonthAndYear() {
        const now = new Date();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        return `${month} ${year}`;
    }

    return (
        <>

            <div class="flex justify-center items-center h-screen pb-16">
                <div class="flex flex-col shadow-xl bg-[#ccdcd4] rounded-md w-11/12 sm:w-3/4 lg:w-1/3">
                    <div class="font-bold text-xl px-6 py-8 text-black border-b border-[#bfbfbf]">Payment Summary</div>
                    <div class="flex justify-between py-5 text-black">
                        <div class="sm:text-lg px-6 font-semibold">Monthly Rent</div>
                        <div class="sm:text-lg px-12 font-semibold">Rs.{details.monthlyRent}</div>
                    </div>
                    <div class="flex justify-between py-5 text-black">
                        <div class="sm:text-lg px-6 font-semibold">Rent for {getCurrentMonthAndYear()}</div>
                        <div class="sm:text-lg px-12 font-semibold">Rs.{details.dynamicRent}</div>
                    </div>
                    <div class="flex justify-between py-5 text-black">
                        <div class="sm:text-lg px-6 font-semibold">Admission Fees</div>
                        <div class="sm:text-lg px-12 font-semibold">Rs.{details.admitFee}</div>
                    </div>
                    <div class="flex justify-between py-5 text-black">
                        <div class="sm:text-lg px-6 font-bold">Total Payment Amount</div>
                        <div class="sm:text-lg px-12 font-bold">Rs.{details.totalRent}</div>
                    </div>
                    <div class="flex justify-center py-7">
                        <button class="bg-[#235784] text-white w-5/6 py-2 font-bold text-lg rounded-md transform hover:scale-110 transition duration-300">Make Payment</button>
                    </div>
                    <div class="flex justify-center pb-8">
                        <button class="bg-blue-300 text-blue-900 w-5/6 py-2 font-bold text-lg rounded-md transform hover:scale-110 transition duration-300">
                            <a href="/roomTypes">Back</a>
                        </button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Payment
