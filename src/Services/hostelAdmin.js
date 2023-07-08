import axios from "../axios";



export const hostelAdminApi = (values) => {
    return axios.post('/hostel/signing', values)
}

export const verifyOtp = (data) => {
    return axios.post('/hostel/verifyOtp', data)
}

export const hostelAdminLogin = (values) => {
    return axios.post('/hostel/postLogin', values)
}

export const addHostelApi = (data, headers) => {
    return axios.post('/hostel/add-Hostel', data, headers)
}

export const hostelDataApi = (headers) => {
    return axios.get('/hostel/get-hostel-data', { headers })
}

export const hostelRoomApi = (formData, headers, hostelId) => {
    return axios.post(`/hostel/add-rooms/${hostelId}`, formData, headers)
}

export const hostelRoomData = (headers, hostelId) => {
    return axios.get(`/hostel/room-data/${hostelId}`, { headers })
}

export const editRoomApi = (headers,id)=>{
    return axios.get(`/hostel/edit-room-data/${id}`,{headers})
}

export const FetchRequestData = (headers, hostelId) => {
    return axios.get(`/hostel/fetchRequestData/${hostelId}`, { headers })
}

export const studentApprovalApi = (id, headers) => {
    return axios.patch(`/hostel/student-approval/${id}`, {}, { headers });
};

export const StudentRejectedApi = (id, headers, description) =>{
return axios.patch(`/hostel/student-rejection/${id}`,{description} ,{headers})
}

export const FoodMenuApi = (headers,id) =>{
    console.log(id,"checked point 2");
return axios.get(`/hostel/fetch-food-menu/${id}`,{headers})
}

export const editFoodMenuApi = (headers,values,id) =>{
    return axios.put(`/hostel/edit-food-menu/${id }`,{values},{headers})
}

export const StudentDataApi = (headers,id) =>{
    return axios.get(`/hostel/fetch-student-data/${id}`,{headers})
}

export const studentBlockingApi = (headers,id) =>{
    return axios.patch(`/hostel/block-student/${id}`,{},{headers})
}

export const studentUnBlockingApi = (headers,id)=>{
    return axios.patch(`/hostel/unblock-student/${id}`,{},{headers})
}

export const studentDeleteApi = (headers,id) =>{
    return axios.patch(`/hostel/delete-student/${id}`,{},{headers})
}

export const addFoodmenuApi = (headers,values,id) =>{
    return axios.post(`/hostel/add-food-menu/${id}`,{values},{headers})
}

export const complaintsListingApi = (headers,id) =>{
    return axios.get(`/hostel/complaints-data/${id}`,{headers})
}

export const editComplaintApi = (headers,values,id) =>{
    console.log(headers,values,id,"in service");
    return axios.patch(`/hostel/edit-complaints-data/${id}`,{values},{headers})
}

export const LeaveDataApi = (headers,id)=>{
    return axios.get(`/hostel/fetch-leave-data/${id}`,{headers})
}



