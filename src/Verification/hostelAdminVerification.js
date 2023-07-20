import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function HostelAdminVerification({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!localStorage.getItem("HostelAdminToken")) {

            console.log(location.pathname)
            if (location.pathname !== "/hostel/register" && location.pathname !== "/hostel/otpVerification")

                navigate("/hostel/login");
        } else {
                
            navigate('/hostel/dashboard')
        }
    }, [location.pathname,navigate]);

    return children;
}
