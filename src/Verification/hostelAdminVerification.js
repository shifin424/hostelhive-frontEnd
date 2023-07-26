
import { useLocation, Navigate } from "react-router-dom";

export default function HostelAdminVerification({ children }) {
    const location = useLocation();

    const token = localStorage.getItem("HostelAdminToken")

    if (!token) {
        if (location.pathname === "/hostel/register" || location.pathname === "/hostel/otpVerification" || location.pathname === "/hostel/login")
            return children;
        else
            return <Navigate to={"/hostel/login"} />
    } else {
        if (location.pathname === "/hostel/register" || location.pathname === "/hostel/otpVerification" || location.pathname === "/hostel/login")
            return <Navigate to={"/hostel/dashboard"} />
        else
            return children;

    }
    // eslint-disable-next-line

}
