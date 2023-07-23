import axios from "../axios";

export const hostelInfoApi = () =>{
    return axios.get('/hostel-info')
}

export const hostelSingleViewApi =(id) =>{
    return axios.get(`/hostel-over-view/${id}`)
}

export const hostelRoomDetails = (hostelId, roomType) => {
    return axios.post(`/hostel-room-data/${hostelId}`, roomType);
  };
export const StudentSignupApi = (values) =>{
    console.log(values)
    return axios.post('/signup',values)
}

export const StudentOtpApi = (StudentAuth) =>{
    return axios.post('/otp',StudentAuth)
}

export const studentLoginApi = (values) =>{
    return axios.post('/login',values)
}

