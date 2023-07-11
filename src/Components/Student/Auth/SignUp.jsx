import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import image from '../../../assets/images/loginImage.jpg';
import setUpRecaptcha  from '../../../Contex/UserAuth'
import {StudentAuth, otpConfirmObj} from '../../../Redux/Features/student/AuthSlice'
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';


function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('fullName is required'),
    email: Yup.string()
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email Format')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone Number must be 10 digits')
      .required('Phone Number is required'),
    gender: Yup.string().required('Gender is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], "Passwords don't match")
      .required('Confirm Password is required'),
  });
  
 

  const handleSubmit = async (values) => {
    try{
      console.log(values,"here the signup values");
        const response = await setUpRecaptcha("+91"+values.phone)
        dispatch(StudentAuth(values))
        dispatch(otpConfirmObj(response))
        navigate('/otp-page')
    }catch(err){
        message(err.message)
    }
   
  };

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-8">
            <h2 className="font-bold text-2xl text-[#002D74]">Signup</h2>
            <p className="text-xs mt-4 text-[#002D74]">
              Create a new account to get started
            </p>

            <Formik
              initialValues={{
                fullName: '',
                email: '',
                phone: '',
                gender: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="flex flex-col gap-4">
                <Field
                  className="p-2 rounded-xl border bg-white"
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-xs"
                />

                <Field
                  className="p-2 rounded-xl border bg-white"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs"
                />

                <Field
                  className="p-2 rounded-xl border bg-white"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-xs"
                />

                <Field
                  as="select"
                  className="p-2 rounded-xl border bg-white"
                  name="gender"
                  defaultValue=""
                >
                  <option value="" disabled hidden>
                    Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-xs"
                />

                <Field
                  className="p-2 rounded-xl border bg-white"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs"
                />

                <Field
                  className="p-2 rounded-xl border bg-white"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-xs"
                />

                <button
                  className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                  type="submit"
                >
                  Signup
                </button>
              </Form>
            </Formik>

            <div id="recaptcha-container" ></div>

            <div className="mt-6 text-xs text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center">Already have an account?</p>
              <Link to={'/login'} className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 text-[#002D74]">
                Login
              </Link>
            </div>
          </div>

          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={image} alt="Signup Image" />
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
