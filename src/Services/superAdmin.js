import axios from '../axios'



export const adminLoginApi = (formData) => {
    return axios.post('/admin/login', formData)
}

export const hostelRequestApi = (headers) => {
    return axios.get('/admin/hostel-request', { headers });
};

export const hostelApprovalApi = (id, headers) => {
    return axios.patch(`/admin/approve-hostel/${id}`, {}, { headers })
}

export const hostelRejectedApi = (id, headers, description) => {
    return axios.patch(`/admin/reject-hostel/${id}`, { description }, { headers });
};

export const hostelStatusApi = (headers) =>{
    return axios.get('/admin/fetchHostelData',{headers})
}

export const hostelBlockingApi = (id,headers,adminId)=>{
    return axios.patch(`/admin/block-hostel/${id}/${adminId}`,{},{headers})
}

export const hostelUnlockApi = (id,headers,adminId)=>{
    return axios.patch(`/admin/unblock-hostel/${id}/${adminId}`,{},{headers})
}

export const adminDashboardApi = (headers) =>{
    return axios.get('/admin/fetch-admin-dashboard',{headers})
}

export const adminChartData = (headers) =>{
    return axios.get('/admin/fetch-chart-data',{headers})
}







