import React from 'react';
import { toast } from 'react-toastify';
import { vacatingLetter } from '../../../Services/studentsServices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  date: Yup.date()
    .required('Date is required')
    .min(new Date().toISOString().split('T')[0], 'Please select a future date'),
  reason: Yup.string()
    .required('Reason is required')
    .test('word-count', 'Reason should have between 5 and 20 words', value => {
      if (value) {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= 5 && wordCount <= 20;
      }
      return false;
    }),
});

function VacatingLetter() {
  const navigate = useNavigate();
  const bookingStatus = useSelector(state => state?.roomBookingData?.bookingDetails?.bookingStatus);
  const hostelId = bookingStatus?.hostelId;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const headers = {
        Authorization: JSON.parse(localStorage.getItem("StudentToken"))?.token
      };

      const response = await vacatingLetter(headers, values, hostelId);
      console.log(response, "this is the response");
      if (response.data.message) {
        toast.success("You are vacated from the hostel");
        localStorage.removeItem('StudentToken');
        navigate('/');
      } else {
        toast.error("An error occurred, please try again later");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
    setSubmitting(false);
  };

  return (
    <>
      <div>
        <h1 className="text-[#002D74] text-2xl font-bold pb-5">Vacating Letter</h1>
      </div>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-2xl overflow-hidden mt-10">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">Vacating Letter</h2>
        </div>
        <div className="px-4 py-4">
          <Formik
            initialValues={{
              date: '',
              reason: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="datepicker" className="block text-gray-700 text-sm font-bold mb-2">
                    Select Date:
                  </label>
                  <Field
                    id="datepicker"
                    type="date"
                    name="date"
                    className="rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 border border-black bg-white text-black focus:ring-blue-500"
                  />
                  <ErrorMessage name="date" component="p" className="text-red-500 text-xs mt-1" />
                </div>
                <div className="mb-4">
                  <label htmlFor="reason" className="block text-gray-700 text-sm font-bold mb-2">
                    Reason for Vacating:
                  </label>
                  <Field
                    id="reason"
                    as="textarea"
                    name="reason"
                    className="rounded-md px-3 py-2 w-full h-32 resize-none text-black focus:outline-none border border-black bg-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your reason here...."
                  />
                  <ErrorMessage name="reason" component="p" className="text-red-500 text-xs mt-1" />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-14 py-2 rounded-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default VacatingLetter;
