import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function HostelAdminVerification({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!localStorage.getItem("HostelAdminToken")) {

            console.log(location.pathname)
            if (location.pathname !== "/hostelAdmin/register" && location.pathname !== "/hostelAdmin/otpVerification")

                navigate("/hostelAdmin/login");
        } else {
                
            navigate('/hostelAdmin/getStarted')
        }
    }, []);

    return children;
}
