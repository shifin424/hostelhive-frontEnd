import React, { useEffect, useMemo, useState } from 'react';
import { editRoomApi, editRoomData, editRoomImage } from '../../../Services/hostelAdmin';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { message } from 'antd';

function EditRooms() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  console.log(selectedImage)
  const [details, setDetails] = useState();
  const navigate = useNavigate()
  const { id } = useParams();
  console.log(id, "roomId");


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
    console.log("Selected image file:", file); 
  };


  const headers = useMemo(() => ({
    Authorization: JSON?.parse(localStorage.getItem("HostelAdminToken"))?.token
  }), []);


  const submitImage = async () => {
    if (!selectedImageFile) {
      message.error('Please select an image.');
      return;
    }
  
    console.log("uploading image", selectedImageFile); 
  
    const data = new FormData();
    data.append('image', selectedImageFile);
    try {
    const response =    await editRoomImage({headers, id, data});
    if (response) {
      console.log(response);
      if (response.data.error) {
        message.error(response.data.error);
      } else if (response.data.message) {
        message.success(response.data.message)
        navigate('/hostel/hostel-listing/rooms');
      } else {
        message.warning('Something went wrong please try agin later')
      }
    }
  } catch (error) {
      message.error('Failed to upload image');
    }
  };
  

  useEffect(() => {
    const ProfileData = async () => {
      try {
        const response = await editRoomApi(headers, id);
        if (response) {
          console.log(response.data, "roomData");

          const roomData = response?.data?.roomData;
          const mappedDetails = {
            roomNo: roomData.room_no,
            roomType: roomData.room_type,
            capacity: roomData.capacity,
            status: roomData.status,
            roomPrice: roomData.room_rent,
            roomTitle: roomData.title,
            description: roomData.description,
          };

          setDetails(mappedDetails);
        } else {
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    ProfileData();
  }, [headers, id]);



  const handleSubmit = async (values) => {
    try {
      const response = await editRoomData(headers, values, id);
      if (response) {
        if (response.data.error) {
          message.error(response.data.error);
        } else if (response.data.message) {
          message.success(response.data.message)
          navigate('/hostel/hostel-listing/rooms');
        } else {
          message.warning('Something went wrong please try agin later')
        }
      }
    } catch (error) {
      message.error('Internal server error');
    }
  };

  const validationSchema = Yup.object().shape({
    roomNo: Yup.string().trim().required('Room No is required').strict(true),
    roomType: Yup.string().required('Room Type is required'),
    capacity: Yup.number().required('capacity is empy')
      .positive('Capacity must be a positive number')
      .integer('Capacity must be an integer'),
    status: Yup.string().required('Status is required'),
    roomPrice: Yup.number().required('Room Price must be a positive number'),
    roomTitle: Yup.string()
      .trim()
      .required('Title is required')
      .test('minWords', 'Title must have at least 2 words', (value) => {
        if (!value) return false;
        const words = value.split(' ');
        return words.length >= 2;
      }),
    description: Yup.string()
      .trim()
      .required('Description is required')
      .test('minWords', 'Description must have at least 15 words', (value) => {
        if (!value) return false;
        const words = value.split(' ');
        return words.length >= 15;
      }).test('maxWords', 'Description must have at most 25 words', (value) => {
        if (!value) return true;
        const words = value.split(' ');
        return words.length <= 25;
      }),
  });

  const initialValues = details || {
    roomNo: '',
    roomType: '',
    capacity: '',
    status: '',
    roomPrice: '',
    roomTitle: '',
    description: '',
  };



  return (
    <>
      <div className="flex justify-between p-3">
        <h1 className="flex text-2xl text-[#002D74] font-bold text-center">Edit Rooms</h1>
      </div>
      <div className="bg-[#9bbbf4] rounded-lg shadow-lg p-6 md:p-8 max-w-3xl mx-auto">

        <div className="mb-6 flex flex-col items-center">
          <label
            htmlFor="dropzone-file"
            className="w-[25rem] h-56 flex items-center justify-center border-4 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200"
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Uploaded"
                name='image'
                value={selectedImage}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <svg
                  className="w-8 h-8 mb-2 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                </svg>
                <p className="text-sm text-gray-500">Click to change image or drag and drop</p>
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              name='image'
              onChange={handleImageChange}
            />
          </label>
          {selectedImage && (
            <button
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={submitImage}
            >
              upload image
            </button>
          )}
        </div>
        {!details ? (
          <p>Loading...</p>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>
                    <label htmlFor="roomNo" className="block text-sm font-medium text-gray-700">
                      Room No
                    </label>
                    <Field
                      type="text"
                      name="roomNo"
                      disabled
                      className="mt-1 h-10 border text-gray-700 bg-white border-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
                    />
                    <ErrorMessage name="roomNo" component="p" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
                      Room Type
                    </label>
                    <Field
                      type="text"
                      name="roomType"
                      id="roomType"
                      className="mt-1 h-10 border text-gray-700 bg-white border-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
                    />
                    <ErrorMessage
                      name="roomType"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                      Capacity
                    </label>
                    <Field
                      type="text"
                      name="capacity"
                      id="capacity"
                      className="mt-1 h-10 border text-gray-700 bg-white border-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
                    />
                    <ErrorMessage name="capacity" component="p" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <Field
                      as="select"
                      id="status"
                      name="status"
                      className="mt-1 block w-full text-gray-700 bg-white pl-3 pr-10 py-2 text-base border border-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="occupied">Occupied</option>
                      <option value="vacant">Vacant</option>
                      <option value="reserved">Reserved</option>
                    </Field>
                    <ErrorMessage name="capacity" component="p" className="text-red-500 text-sm mt-1" />
                  </div>
                  {/*  */}
                  <div>
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                      Room Price
                    </label>
                    <Field
                      type="text"
                      name="roomPrice"
                      id="roomPrice"
                      className="mt-1 h-10 border text-gray-700 bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-800 rounded-md"
                    />
                    <ErrorMessage
                      name="roomPrice"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                      Room Title
                    </label>
                    <Field
                      type="text"
                      name="roomTitle"
                      id="roomTitle"
                      className="mt-1 h-10 border text-gray-700 bg-white border-gray-800 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md"
                    />
                    <ErrorMessage
                      name="roomTitle"
                      component="p"
                      className="text-red-500  text-sm mt-1"
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      rows="3"
                      className="mt-1 bg-white text-gray-700 border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-800 rounded-md"
                    />
                    <ErrorMessage
                      name="description"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
                <button
                  type='Submit'
                  className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
}

export default EditRooms;
