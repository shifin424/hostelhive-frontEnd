import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'

export default function AdminVerificaion({children}){
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('adminToken')){
            navigate('/admin/login')
        }else{
            navigate('/admin/dashBoard')
        }
    
    },[navigate])

    return children
}