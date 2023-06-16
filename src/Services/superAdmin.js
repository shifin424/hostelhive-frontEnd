import axios from '../axios'



export const adminLoginApi = (formData) =>{
    return axios.post('/admin/login',formData)
}

export const hostelRequestApi = (headers) => {
    return axios.get('/admin/hostel-request', { headers });
};

export const hostelApprovalApi = (id,headers) =>{
    return axios.patch(`/admin/approve-hostel/${id}`,{},{headers})
}

export const hostelRejectedApi = (id, headers, description) => {
    return axios.patch(`/admin/reject-hostel/${id}`, { description }, { headers });
  };
  








