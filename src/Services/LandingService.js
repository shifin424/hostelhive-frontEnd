import axios from "../axios";

export const hostelInfoApi = () =>{
    return axios.get('/hostel-info')
}

export const hostelSingleViewApi =(id) =>{
    return axios.get(`/hostel-over-view/${id}`)
}

export const hostelRoomDetails = (id,roomType)=>{
    return axios.post(`/hostel-room-data/${id}`,roomType)
}

export const StudentSignupApi = (values) =>{
    return axios.post('/signup',values)
}

export const StudentOtpApi = (StudentAuth) =>{
    return axios.post('/otp',StudentAuth)
}

export const studentLoginApi = (values) =>{
    return axios.post('/login',values)
}