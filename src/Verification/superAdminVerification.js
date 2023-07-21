
import {useNavigate} from 'react-router-dom'

export default function AdminVerificaion({children}){
    const navigate = useNavigate();
        if(!localStorage.getItem('adminToken')){
            navigate('/admin/login')
        }else{
            navigate('/admin/dashBoard')
        }
    
   

    return children
}