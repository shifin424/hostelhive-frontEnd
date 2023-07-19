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


export const paymentDataApi = ({ orderId, rentPayment, headers,hostelId }) => {
  console.log(orderId,"<<<<<",rentPayment,"<<<<",headers,"<<<<",hostelId);
  return axios.post(`/student/payment-verification/${hostelId}`, { orderId, rentPayment }, headers);
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

export const rentHistoryApi = (headers,id) =>{
  return axios.get(`/student/fetch-rent-history/${id}`,{headers})
}

export const fetchRentDueData = (headers)=>{
return axios.get('/student/fetch-rent-due-data',{headers})
}

export const vacatingLetter = (headers,values,id)=>{
  console.log(headers,values,id);
  return axios.post(`/student/post-vacating-data/${id}`,{values},{headers})
}

export const roomRatingApi = (headers,values,id)=>{
  console.log(headers,values,id);
  return axios.post(`/student/add-room-review/${id}`,{values},{headers})
}

export const fetchProfileData = (headers) =>{
  return axios.get('/student/fetch-profile-data',{headers})
}

export const editProfileApi = ({headers, values} ) => {
  return axios.put('/student/edit-profile',{},{ headers,params:values});
};

export const imageUploadApi = (headers,data)=>{
  return axios.patch('/student/upload-image',data,{ headers})
}
