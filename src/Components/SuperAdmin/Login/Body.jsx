import React, { useState } from "react";
import { adminLoginApi } from "../../../Services/superAdmin";
import {useNavigate} from 'react-router-dom'

function Body() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("")
  console.log(error);
  const navigate = useNavigate()

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  console.log("admin Login")

  const validatePassword = () => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one letter and one number"
      );
    } else {
      setPasswordError("");
    }
  };




  const handleSubmit = (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    const formData = {
      email: email,
      password: password
    };

    adminLoginApi(formData).then((responce)=>{
      if(responce.data.status){
        const jwtToken = responce.data.token;
        localStorage.setItem("adminToken",jwtToken);
        navigate('/admin/dashBoard');
      }else{
        setError(responce.data.errors)
      }
    }).catch((error)=>{
      console.log(error);
    })
  };

  return (
    <div className="h-screen bg-white">
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-[#93b8f9]  rounded-lg shadow-2xl p-6">
        <h1 className="text-4xl text-black font-bold mb-7 mx-8">Admin Login</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <input
              className="bg-transparent text-black border border-black w-[300px] px-3 py-2 rounded-full bg-white"
              type="email"
              placeholder="Enter your Email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
            />
            {emailError && (
              <p className="text-red-500 text-center w-[300px]">{emailError}</p>
            )}
          </div>
          <div>
            <input
              className="bg-transparent text-black border border-black w-[300px] px-3 py-2 rounded-full bg-white"
              type="password"
              placeholder="Enter your Password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
            />
            {passwordError && (
              <p className="text-red-500 text-center w-[300px]">{passwordError}</p>
            )}
          </div>
          <div className="text-white border border-black py-3 rounded-full hover:text-black bg-[#002D7A] font-semibold hover:bg-[#9dbbef] justify-center items-center text-center">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
}

export default Body;
