import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { StudentRequestApi } from '../../Services/studentsServices';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Request() {

  const { hostelView } = useSelector(state => state)
  const hostelId = hostelView.hostelData._id

  const { id } = useParams();
  const navigate = useNavigate()


  const validationSchema = Yup.object().shape({
    dateOfBirth: Yup.date()
      .max(new Date(), 'Date of Birth cannot be in the future')
      .required('Date of Birth is required'),
    bloodGroup: Yup.string().required('Blood Group is required'),
    houseName: Yup.string().required('House Name is required'),
    city: Yup.string().required('City is required'),
    area: Yup.string().required('Area is required'),
    landmark: Yup.string().required('Landmark is required'),
    pincode: Yup.string()
      .required('Pincode is required')
      .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
    country: Yup.string().required('Country is required'),
  });

  const initialValues = {
    dateOfBirth: '',
    bloodGroup: '',
    houseName: '',
    city: '',
    area: '',
    landmark: '',
    pincode: '',
    country: '',
  };

  const headers = {
    Authorization: JSON.parse(localStorage.getItem("StudentToken"))?.token
  };


  const handleSubmit = async (values) => {
    try {
      const requestValues = {
        ...values,
      };

      const response = await StudentRequestApi(headers, requestValues, id,hostelId);

      if (response.status !== 200) {
        message.error("Error occurred while submitting the form");
        return;
      }
      message.success("Request Submitted Successfully");
      navigate('/over-view');
    } catch (error) {
      message.error(error.response.data.message);
    }
  };



  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[600px] h-[600px]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="bg-gray-200 shadow-xl rounded-md px-8 pt-6 pb-8 ">
            <h2 className="text-2xl font-bold mb-4 text-[#002D7A] text-center">Verification</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">
                  Date of Birth:
                </label>
                <Field
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="shadow bg-white appearance-none border rounded w-full py-3 px-4 text-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="bloodGroup" className="block text-gray-700 text-sm font-bold mb-2">
                  Blood Group:
                </label>
                <Field
                  type="text"
                  id="bloodGroup"
                  name="bloodGroup"
                  placeholder='eg: A+'
                  className="shadow bg-white appearance-none border rounded w-full py-3 px-4 text-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="bloodGroup" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="houseName" className="block text-gray-700 text-sm font-bold mb-2">
                  House Name:
                </label>
                <Field
                  type="text"
                  id="houseName"
                  name="houseName"
                  placeholder='eg: villa'
                  className="shadow bg-white appearance-none border rounded w-full py-3 px-4 text-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="houseName" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                  City:
                </label>
                <Field
                  type="text"
                  id="city"
                  name="city"
                  placeholder='eg: calicut'
                  className="shadow bg-white appearance-none border rounded w-full py-3 px-4 text-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="city" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="area" className="block text-gray-700 text-sm font-bold mb-2">
                  Area:
                </label>
                <Field
                  type="text"
                  id="area"
                  name="area"
                  placeholder='eg: town'
                  className="shadow bg-white appearance-none border rounded w-full py-3 px-4 text-mdg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="area" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="landmark" className="block text-gray-700 text-sm font-bold mb-2">
                  Landmark:
                </label>
                <Field
                  type="text"
                  id="landmark"
                  name="landmark"
                  placeholder='eg: near hospital'
                  className="shadow bg-white  appearance-none border rounded w-full py-3 px-4 text-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="landmark" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="pincode" className="block text-gray-700 text-sm font-bold mb-2">
                  Pincode:
                </label>
                <Field
                  type="text"
                  id="pincode"
                  name="pincode"
                  placeholder='eg: 673201'
                  className="shadow bg-white appearance-none border rounded w-full py-3 px-4 text-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="pincode" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
                  Country:
                </label>
                <Field
                  type="text"
                  id="country"
                  name="country"
                  placeholder='eg: india'
                  className="shadow bg-white appearance-none border rounded w-full py-3 px-4 text-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="country" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>
            <div className='flex justify-center'>
              <button
                type="submit"
                className="bg-[#002D7A] mt-5 px-7 py-3 hover:bg-[#296bde] font-semibold hover:text-black rounded-full  "
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

export default Request;
