import axios from "../axios";

export const StudentRequestApi = (headers, values, id) => {
    console.log(headers,values,id,"id <<<<<<<<<<<<<<<<<");
    return axios.post(`/student/request-data/${id}`, values, { headers });
  };

 