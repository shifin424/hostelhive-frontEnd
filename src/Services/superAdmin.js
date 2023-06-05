import axios from '../axios'



export const adminLoginApi = (formData) =>{
    return axios.post('/superAdmin/login',formData)
}

export const hostelRequestApi = (headers) => {
    return axios.get('/superAdmin/hostel-request', { headers });
};

export const hostelApprovalApi = (id,headers) =>{
    return axios.patch(`/superAdmin/approve-hostel/${id}`,{},{headers})
}

export const hostelRejectedApi = (id,headers) =>{
    return axios.patch(`/superAdmin/reject-hostel/${id}`,{},{headers})
}








