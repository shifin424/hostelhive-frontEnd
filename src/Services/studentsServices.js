import axios from "../axios";

export const StudentRequestApi = (headers, values, id,hostelId) => {
    return axios.post(`/student/request-data/${id}/${hostelId}`, values, { headers });
  };

export const RoomBookingApi = (headers) =>{
  return axios.get('/student/room-booking',headers)
}

export const fetchPaymentInfo = (headers,id) =>{
  console.log(headers,id ,"in student api checking");
  return axios.get(`/student/payment-data/${id}`,{headers})
}


 