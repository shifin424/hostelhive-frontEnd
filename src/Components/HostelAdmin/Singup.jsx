import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { hostelAdminApi } from '../../Services/hostelAdmin';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd'
import { resetState, registerHostelAdmin } from '../../Redux/Features/hostelAdminSlice';

function Singnup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, errors } = useSelector((state) => state.hostelAdmin);

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    qualification: '',
    landMark: '',
    gender: '',
  };

  const [error, setError] = useState('');
  const [formValues, setFormValues] = useState(initialValues);

  const validationSchema = yup.object({
    fullName: yup.string().required('Required'),
    password: yup
      .string()
      .required('Required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    email: yup
      .string()
      .email('Invalid email address')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address')
      .required('Please enter your email'),
    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    mobileNumber: yup
      .string()
      .required('Mobile Number is required')
      .matches(/^\d{10}$/, 'Mobile Number must be exactly 10 digits'),
    qualification: yup.string().required('Required'),
    gender: yup.string().required('Required'),
  });

  const handleSubmit = (values) => {
    console.log(values);
    hostelAdminApi(values)
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error);
          setError(response.data.error);
        } else {
          console.log('form submitted');
          dispatch(resetState());
          dispatch(registerHostelAdmin(values));
          message.success('Form submitted successfully!'); 
          navigate('/hostelAdmin/otpVerification');
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error || 'An error occurred');
        toast.error(err.response.data.error || 'An error occurred'); 
      });
  };

  const goBack = () => {
    navigate('/hostelAdmin/login')
  };

  return (
    <div>
      <div className="w-full h-screen bg-white  mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="max-w-2xl bg-[#93b8f9] min-h-max mx-auto mt-8 rounded-md shadow-2xl p-6">
            <h2 className="text-2xl text-center font-bold mb-4 text-[#002D7A]">HostelAdmin Signup</h2>
            {error && <div className="text-red-500 text-center">{error}</div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="font-popins  text-[#002D7A]">
                  Full Name
                </label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="border rounded-md p-2 w-full text-gray-700 bg-slate-200"
                  placeholder="Enter your fullName"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500" />
              </div>

              <div>
                <label htmlFor="email" className="font-popins  text-[#002D7A]">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="border rounded-md p-2 w-full text-gray-700 bg-slate-200"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>

              <div>
                <label htmlFor="password" className="font-popins  text-[#002D7A]">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="border rounded-md p-2 w-full text-gray-700 bg-slate-200"
                  placeholder="Enter your Password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="font-popins  text-[#002D7A]">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="border rounded-md p-2 w-full text-gray-700 bg-slate-200"
                  placeholder="Confirm your password"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
              </div>

              <div>
                <label htmlFor="mobileNumber" className="font-popins  text-[#002D7A]">
                  Mobile Number
                </label>
                <Field
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  className="border rounded-md p-2 w-full text-gray-700 bg-slate-200"
                  placeholder="Enter your Mobile Number"
                />
                <ErrorMessage name="mobileNumber" component="div" className="text-red-500" />
              </div>

              <div>
                <label htmlFor="qualification" className="font-popins  text-[#002D7A]">
                  Qualification
                </label>
                <Field
                  type="text"
                  id="qualification"
                  name="qualification"
                  className="border rounded-md p-2 w-full text-gray-700 bg-slate-200"
                  placeholder="Enter your Qualification"
                />
                <ErrorMessage name="qualification" component="div" className="text-red-500" />
              </div>

              <div>
                <label htmlFor="gender" className="font-popins  text-[#002D7A]">
                  Gender
                </label>
                <Field
                  as="select"
                  id="gender"
                  name="gender"
                  className="border rounded-md p-2 w-full text-gray-700 bg-slate-200"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500" />
              </div>
            </div>

            <div className="text-center mt-8">
              <button type="submit" className="bg-[#1a4ca3] text-white text-lg hover:bg-blue-500 px-16 py-4 rounded-full">
                Submit
              </button>
            </div>
          </Form>
        </Formik>

        <p className="text-center mt-4">
          <button className="text-gray-500  font-bold font-popins text-center mt-4" onClick={() => goBack()}>
            Go back
          </button>
        </p>
      </div>
    </div>
  );


}

export default Singnup;
