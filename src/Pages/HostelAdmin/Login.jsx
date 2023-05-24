import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { hostelAdminLogin } from '../../Services/hostelAdmin'
import * as Yup from 'yup';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (values) => {
    hostelAdminLogin(values)
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          console.log("Form submitted");
          // navigate('/hostelAdmin/otpVerification');
          alert("Entered the home page");
        }
      })
      .catch((err) => {
        console.log(err)
        setError(err.response.data.error || "An error occurred");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <Formik
          initialValues={credentials}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="mb-4 text-center text-2xl font-bold">Login</h2>
            <div className="mb-4">
              <label
                className="block text-[#002D7A] text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                className="shadow appearance-none text-white border rounded  w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-[#002D7A] text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                className="shadow appearance-none border border-red rounded w-full text-white py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
            {error && (
              <div className="text-red-500 text-sm ">
                {error}
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
