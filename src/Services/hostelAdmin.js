import axios from "../axios";



export const hostelAdminApi = (values) =>{
    return axios.post('/hostelAdmin/signing',values)
}

export const verifyOtp = (data)=>{
    return axios.post('/hostelAdmin/verifyOtp',data)
}

export const hostelAdminLogin =(values) =>{
    return axios.post('/hostelAdmin/postLogin',values)
}

export const addHostelApi =(data) =>{
    return axios.post('/hostelAdmin/addHostel',data)
}

