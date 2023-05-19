import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'

export default function AdminVerificaion({children}){
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('AdminToken')){
            navigate('/admin',{replace:true})
        }
    
    },[])
    return children
}