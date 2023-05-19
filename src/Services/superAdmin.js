import axios from '../axios'

export const adminLoginApi = (formData) =>{
    return axios.post('/superAdmin/login',formData)
}





