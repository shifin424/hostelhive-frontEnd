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

export const complaintApi = (headers,values,id)=>{
  return axios.post(`/student/student-complaint/${id}`,{values},{headers})
}

export const fetchComplaintData = (headers,id) =>{
  return axios.get(`/student/student-complaint-data/${id}`,{headers})
}

export const MenuDataApi = (headers,id) =>{
  return axios.get(`/student/fetch-food-menu/${id}`,{headers})
}

export const leaveLetterApi = (headers,values,id)=>{
  return axios.post(`/student/add-leave-letter/${id}`,{values},{headers})
}

export const fetchLeaveLetter = (headers,id)=>{
  return axios.get(`/student/fetch-leave-letter/${id}`,{headers})
}

