import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { roomRatingApi } from '../../../Services/studentsServices';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';



function Review() {
  const roomData = useSelector(state => state?.roomsDetils?.roomDetails?.roomData[0]);
  console.log(roomData,"<<<<")

  const roomId = roomData._id
  const initialValues = {
    rating: null,
    reviewText: '',
  };

  const validationSchema = Yup.object().shape({
    rating: Yup.number().required('Rating is required'),
    reviewText: Yup.string().required('Review text is required'),
  });

  const onSubmit = async (values) => {
    try {
      const headers = {
        Authorization: JSON.parse(localStorage.getItem("StudentToken")).token
      };
      const response = await roomRatingApi(headers, values, roomId)
      console.log(response);
      if (response.data.error) {
       toast.error("Somthing went wrong please try agin later")
      } else {
        toast.success("Successfully Submitted a Review")
      }
    }catch(error){
      toast.error(error.response.data.error)
    }

  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleRatingChange = (currentRating) => {
    formik.setFieldValue('rating', currentRating);
  };

  const handleTextChange = (event) => {
    formik.setFieldValue('reviewText', event.target.value);
  };

  return (
    <>
      <div className="flex justify-between p-3 mt-5">
        <h1 className="flex text-2xl text-[#002D74] font-bold text-center">Add a Review</h1>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden mt-5">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-full w-full object-cover md:w-96" src={roomData?.url} alt="Review" />
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold">{roomData?.title}</h2>
              <p className="mt-2 text-gray-600">{roomData?.description}</p>
            </div>
            <div className="flex items-center mt-4">
              <div className="ml-2">
                {[...Array(5)].map((_, index) => {
                  const currentRating = index + 1;
                  return (
                    <label key={currentRating} className="text-yellow-400">
                      <input
                        type="radio"
                        name="rating"
                        className="hidden"
                        value={currentRating}
                        onChange={() => handleRatingChange(currentRating)}
                      />
                      <FaStar
                        className="inline-block w-6 h-6 fill-current"
                        color={currentRating <= (formik.values.rating || formik.values.hover) ? '#ffc107' : '#e4e5e9'}
                        onMouseEnter={() => formik.setFieldValue('hover', currentRating)}
                        onMouseLeave={() => formik.setFieldValue('hover', null)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            {formik.errors.rating && formik.touched.rating && (
              <div className="text-red-500 mt-2">{formik.errors.rating}</div>
            )}
            <div>
              <label htmlFor="reviewTextArea" className="block text-sm font-medium text-gray-700 mt-4">
                Review Text
              </label>
              <textarea
                id="reviewTextArea"
                name="reviewText"
                className="mt-1 block none w-full md:w-[27rem] border h-[10rem] bg-white  border-gray-950 rounded-md py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Write your review here..."
                value={formik.values.reviewText}
                onChange={handleTextChange}
              ></textarea>
              {formik.errors.reviewText && formik.touched.reviewText && (
                <div className="text-red-500 mt-2">{formik.errors.reviewText}</div>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-20 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
                onClick={formik.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
