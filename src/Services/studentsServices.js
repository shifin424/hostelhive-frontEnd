import axios from "../axios";

export const StudentRequestApi = (headers, values, id,hostelId) => {
    return axios.post(`/student/request-data/${id}/${hostelId}`, values, { headers });
  };

export const RoomBookingApi = (headers) =>{
  return axios.get('/student/room-booking',headers)
}


export const fetchPaymentInfo = (headers,id) =>{
  return axios.get(`/student/payment-data/${id}`,{headers})
}

export const paymentApi = (headers, paymentResponce) => {
  console.log(paymentResponce, headers, "front end data checking");
  return axios.post('/student/payment-Request', paymentResponce,  headers);
}


export const paymentDataApi = ({ orderId, rentPayment, headers }) => {
  return axios.post('/student/payment-verification', { orderId, rentPayment }, headers);
}

