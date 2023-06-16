import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import defaultImage from '../../assets/images/hostel-img-1.jpg';
import { addHostelApi } from '../../Services/hostelAdmin';
import { message } from 'antd';
import { BiCurrentLocation } from 'react-icons/bi';
import { Modal, Button } from 'antd';
import LocationNew from './LocationNew';

const AddHostel = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lat, setLat] = useState(10.45);
  const [lng, setLng] = useState(76.6);
  const [selectedPlace, setSelectedPlace] = useState('');

  const navigate = useNavigate();

  const initialValues = {
    file: null,
    title: '',
    location: '',
    description: '',
    hostelType: '',
    admissionFees: '',
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Hostel Name is required'),
    location: Yup.string().test('location', 'Location is required', function(value) {
      const { selectedPlace } = this.parent;
      if (selectedPlace && selectedPlace.length > 0) {
        return !!value;
      }
      return true;
    }),
    description: Yup.string()
    .trim()
    .required('Description is required')
    .test('minWords', 'Description must have at least 50 words', (value) => {
      if (!value) return false;
      const words = value.split(' ');
      return words.length >= 50;
    }).test('maxWords', 'Description must have at most 90 words', (value) => {
      if (!value) return true;
      const words = value.split(' ');
      return words.length <= 90;
    }),
    file: Yup.mixed()
      .required('Image is required')
      .test('fileFormat', 'Invalid image format', (value) => {
        if (!value) return false;
        const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png'];
        return supportedFormats.includes(value.type);
      }),
    hostelType: Yup.string().required('Hostel Type is required'),
    admissionFees: Yup.number().required('Admission Fees is required'),
  });
  

  const handleSubmit = (values) => {
    const data = new FormData();
    data.append('title', values.title);
    data.append(
      'location',
      selectedPlace !== '' ? selectedPlace : values.location
    );
    data.append('description', values.description);
    data.append('image', values.file);
    data.append('latitude', lat);
    data.append('longitude', lng);
    data.append('hostelType', values.hostelType)
    data.append('admissionFees', values.admissionFees);

    const headers = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: JSON.parse(localStorage.getItem('HostelAdminToken'))
          .token,
      },
    };

    addHostelApi(data, headers)
      .then((response) => {
        if (response) {
          navigate('/hostel/hostel-listing');
          message.success('The hostel request has been successfully sent');
        }
      })
      .catch((error) => {
        message.error('An error occurred while adding the hostel');
      });
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const updatePlaceName = (name) => {
    setSelectedPlace(name);
  };

  return (
    <div className="bg-[#ffff] py-4 pb-16">
      <div className="max-w-3xl mx-auto p-4 bg-[#93b8f9] rounded-lg shadow-2xl mt-14  pb-10 px-10 py-10">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="flex">
              <div className="w-1/2 pr-4">
                <div className="mb-4 aspect-w-1 aspect-h-1">
                  <Field name="file" >
                    {({ form, field }) => (
                      <>
                        {field.value ? (
                          <img
                            src={URL.createObjectURL(field.value)}
                            alt="Preview"
                            className="object-cover rounded-lg "
                            style={{ width: '1425px', height: '300px' }}
                          />
                        ) : (
                          <div className="mb-4 aspect-w-1 aspect-h-1 mt-4 rounded-sm ">
                            <img src={defaultImage} alt="" />
                          </div>
                        )}
                        <br />
                        <input
                          type="file"
                          id="image"
                          accept="image/*"
                          onChange={(event) => {
                            form.setFieldValue(
                              field.name,
                              event.currentTarget.files[0]
                            );
                          }}
                          className="py-2 px-4 border border-gray-700 rounded bg-white w-full"
                        />
                      </>
                    )}
                  </Field>
                  <ErrorMessage
                    name="file"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                <label
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Hostel Fee
                </label>
                <Field
                  type="text"
                  id="hosteadmissionFeeslFee"
                  name="admissionFees"
                  placeholder="Enter Admission fee"
                  className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white"
                />
                <ErrorMessage
                  name="admissionFees"
                  component="div"
                  className="text-red-500"
                />
              </div>
              </div>

              

              <div className="w-1/2">
                <div className="mb-4">
                  <label
                    htmlFor="input1"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Hostel Name
                  </label>

                  <Field
                    type="text"
                    id="input1"
                    name="title"
                    placeholder="Enter your hostel name"
                    className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="input2"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Location
                    <button
                      type="button"
                      className="bg-[#002D7A] hover:bg-[#4873d8] px-2  ml-2 rounded-md text-white  active:bg-[#D0DFFF] focus:outline-none focus:ring focus:ring-[#10244e]"
                      onClick={handleModalOpen}
                    >
                      Get Location
                    </button>
                  </label>

                  {selectedPlace !== '' ? (
                  <div className="border border-gray-800 text-[#002D7A] rounded-sm flex  py-2 px-4  bg-white">
                    <span className="mt-1">
                      <BiCurrentLocation />
                    </span>
                    {selectedPlace}
                  </div>
                ) : (
                  <Field
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Your selected location displays here"
                  component="input"
                  className="py-2 px-4 border border-gray-600 text-gray-700 rounded w-full bg-white mt-2"
                  disabled
                />
                )}
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="hostelType"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Hostel Type
                  </label>
                  <Field
                    as="select"
                    id="hostelType"
                    name="hostelType"
                    className="py-2 px-4 border border-gray-700 rounded text-gray-700 w-full bg-white"
                  >
                    <option value="">Select Hostel Type</option>
                    <option value="boys">Boys</option>
                    <option value="girls">Girls</option>
                    <option value="all">Other</option>
                  </Field>
                  <ErrorMessage
                    name="hostelType"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Description
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Enter your details about hostel"
                    className="py-2 px-4 border border-gray-700 rounded text-gray-700 w-full h-48 bg-white"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="bg-[#002D7A] hover:bg-[#4873d8] py-4 px-11 rounded-full text-white font-bold active:bg-[#D0DFFF] focus:outline-none focus:ring focus:ring-[#10244e]"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>

      <Modal
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button
            key="cancel"
            className="bg-red-400 text-white"
            onClick={handleModalClose}
          >
            Cancel
          </Button>,
          <Button key="ok" onClick={handleModalOk}>
            Submit
          </Button>,
        ]}
        bodyStyle={{ height: '420px'}}
        width={800}
      >
        <h1>Choose your location</h1>
        <LocationNew
          lat={lat}
          setLat={setLat}
          lng={lng}
          setLng={setLng}
          updatePlaceName={updatePlaceName}
        />
      </Modal>
    </div>
  );
};

export default AddHostel;
