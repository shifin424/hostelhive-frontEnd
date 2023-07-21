
import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function HostelAdminVerification({ children }) {
    const location = useLocation();
    useEffect(() => {

        if (!localStorage.getItem("HostelAdminToken")) {
            if (location.pathname !== "/hostel/register" && location.pathname !== "/hostel/otpVerification")
                <Navigate to={"/hostel/login"}/>
        } else {
                
            < Navigate to={'/hostel/dashboard'}/>
        }
        // eslint-disable-next-line
    }, []);
    return children;
}
