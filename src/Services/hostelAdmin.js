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
    console.log(data, "inservice file");
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

export const FetchRequestData = (headers, hostelId) => {
    return axios.get(`/hostel/fetchRequestData/${hostelId}`, { headers })
}

export const studentApprovalApi = (id, headers) => {
    return axios.patch(`/hostel/student-approval/${id}`, {}, { headers });
};

export const StudentRejectedApi = (id, headers, description) =>{
return axios.patch(`/hostel/student-rejection/${id}`,{description} ,{headers})
}


