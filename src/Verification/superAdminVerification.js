import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'

export default function AdminVerificaion({children}){
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('adminToken')){
            navigate('/superAdmin/login')
        }else{
            navigate('/superAdmin/dashBoard')
        }
    
    },[])

    return children
}