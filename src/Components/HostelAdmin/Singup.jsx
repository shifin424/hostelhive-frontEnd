import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { hostelAdminApi } from '../../Services/hostelAdmin';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
          setError(response.data.error);
        } else {
          console.log('form submitted');
          dispatch(resetState());
          dispatch(registerHostelAdmin(values));
          navigate('/hostelAdmin/otpVerification');
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error || 'An error occurred');
      });
  };

  return (
    <div>
      <div className="w-full h-screen bg-white mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="max-w-2xl bg-[#93b8f9] mx-auto mt-8 rounded-md shadow-2xl p-6">
            <h2 className="text-2xl text-center font-bold mb-4 text-white">HostelAdmin Signup</h2>
            {error && <div className="text-red-500 text-center">{error}</div>}
  
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className='text-white'>Full Name</label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="border rounded-md p-2 w-full"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500" />
              </div>
  
              <div>
                <label htmlFor="email" className='text-white'>Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="border rounded-md p-2 w-full"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
  
              <div>
                <label htmlFor="password" className='text-white'>Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="border rounded-md p-2 w-full"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
  
              <div>
                <label htmlFor="confirmPassword" className='text-white'>Confirm Password</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="border rounded-md p-2 w-full"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
              </div>
  
              <div>
                <label htmlFor="mobileNumber" className='text-white'>Mobile Number</label>
                <Field
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  className="border rounded-md p-2 w-full"
                />
                <ErrorMessage name="mobileNumber" component="div" className="text-red-500" />
              </div>
  
              <div>
                <label htmlFor="qualification" className='text-white'>Qualification</label>
                <Field
                  type="text"
                  id="qualification"
                  name="qualification"
                  className="border rounded-md p-2 w-full"
                />
                <ErrorMessage name="qualification" component="div" className="text-red-500" />
              </div>
  
              <div>
                <label htmlFor="gender" className='text-white'>Gender</label>
                <Field
                  as="select"
                  id="gender"
                  name="gender"
                  className="border rounded-md p-2 w-full"
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
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
  
  
}

export default Singnup;
