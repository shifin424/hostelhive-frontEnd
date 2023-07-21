
import { Navigate } from 'react-router-dom'


export default function AdminVerificaion({ children }) {

    let auth = localStorage.getItem('adminToken')

    if (!auth) {
        return <Navigate to={'/admin/login'}/>
        }else{
           return children
        }
    }