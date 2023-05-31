import axios from '../axios'



export const adminLoginApi = (formData) =>{
    return axios.post('/superAdmin/login',formData)
}

export const hostelRequestApi = (headers) => {
    console.log(headers, 444);
    return axios.get('/superAdmin/hostel-request', { headers });
};





