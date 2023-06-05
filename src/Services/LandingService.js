import axios from "../axios";

export const hostelInfoApi = () =>{
    return axios.get('/hostel-info')
}

export const hostelSingleViewApi =() =>{
    return axios.get('/hostel-over-view')
}