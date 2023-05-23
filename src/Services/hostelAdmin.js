import axios from "axios";

export const hostelAdminApi = (data) =>{
    return axios.post('/hostelAdmin/signing',data)
}