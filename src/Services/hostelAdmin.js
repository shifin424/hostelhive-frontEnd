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

export const addHostelApi =(data,headers) =>{
    return axios.post('/hostelAdmin/add-Hostel',data,headers)
}

export const hostelDataApi = (headers) =>{
    return axios.get('/hostelAdmin/get-hostel-data',{headers})
}


