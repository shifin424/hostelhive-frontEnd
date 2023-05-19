import axios from "axios";

export const hostelDataApi = (data) =>{
    return axios.post('/hostelAdmin/register',data)
}