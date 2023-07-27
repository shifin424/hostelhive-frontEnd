import React, { useEffect, useMemo, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { editProfileDataApi, profileDataApi } from '../../../Services/hostelAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { adminProfileData } from '../../../Redux/Features/hostel/profileSlice';

function EditProfile() {
  const [details, setDetails] = useState([])
  const [initialValues, setInitialValues] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage)
  
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  console.log(selectedImageFile);
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const headers = useMemo(() => ({
    Authorization: JSON?.parse(localStorage.getItem("HostelAdminToken"))?.token
  }), []);
  const hostelId = useSelector((state) => state?.adminHostelData?.hostelId);


  useEffect(() => {
    const ProfileData = async () => {
      try {
        const response = await profileDataApi(headers, hostelId);
        if (response) {
          console.log(response.data);
          setDetails(response?.data);

          setInitialValues({
            adminName: response?.data?.adminName || '',
            email: response?.data?.email || '',
            hostelFee: response?.data?.hostelFee || '',
            hostelName: response?.data?.hostelName || '',
            hostelType: response?.data?.hostelType || '',
            adminMobile: response?.data?.adminMobile || '',
            location: response?.data?.location || '',
            description: response?.data?.description || ''
          });

          setFormValues({
            adminName: response?.data?.adminName || '',
            email: response?.data?.email || '',
            hostelFee: response?.data?.hostelFee || '',
            hostelName: response?.data?.hostelName || '',
            hostelType: response?.data?.hostelType || '',
            adminMobile: response?.data?.adminMobile || '',
            location: response?.data?.location || '',
            description: response?.data?.description || ''
          });
        } else {
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    ProfileData();
  }, [headers, hostelId]);



  const validationSchema = Yup.object().shape({
    adminName: Yup.string().required('Owner Name is required'),
    adminMobile: Yup.number()
    .required('Mobile Number is required')
    .typeError('Mobile Number must be a number')
    .integer('Mobile Number must be an integer')
    .positive('Mobile Number must be a positive number')
    .test('len', 'Mobile Number must be exactly 10 digits', (val) => {
      if (val) {
        const numberString = String(val);
        return numberString.length === 10;
      }
      return false;
    }),
    hostelName: Yup.string().required('Hostel Name required'),
    email: Yup.string().email('Invalid email address').required('Owner Email is required'),
    hostelFee: Yup.number().typeError('Admission Fee must be a number').required('Admission Fee is required'),
    hostelType: Yup.string().required('Hostel Type is required'),
    location: Yup.string().required('Location is required'),
    description:Yup.string()
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
  });

  const handleSubmit = async (values) => {
    try {
      if (JSON.stringify(formValues) === JSON.stringify(values)) {
        toast.error("No changes were made.");
        return;
      }
      const response = await editProfileDataApi(headers, values, hostelId)
      if (response.data.message) {
        toast.success("Profile updated successfully")
        navigate('/hostel/hostel-listing/profile')
      } else {
        toast.error("Something went wrong")
      }
      console.log('Profile data submitted:', values);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
     setImageError(null);
  };

  const submitImage = async () => {
    if (!selectedImageFile) {
      setImageError('Please select an image.');
      return;
    }
  
    const data = new FormData();
    data.append('image', selectedImageFile);
  
    try {
      await dispatch(adminProfileData({ headers, data, hostelId }));
      toast.success('Successfully updated the Image');
      navigate('/hostel/hostel-listing/profile');
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload image');
    }
  };
  
  return (
    <>
      <div className="flex justify-between p-3">
        <h1 className="flex text-2xl text-[#002D74] font-bold text-center">Edit Profile</h1>
      </div>

      <div className="bg-[#4B76C2] rounded-md">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-40 h-40 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      {selectedImage ? (
                        <img src={selectedImage} alt="Selected" name='image' className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <>
                          <div className="flex flex-col  items-center justify-center b  pt-5 ">
                            <AiOutlineCloudUpload className='w-16 h-12 animate-bounce' />
                            <p className="mb-2 text-sm text-gray-500  dark:text-gray-400">
                              <span className="font-semibold ">Click to upload</span>
                            </p>
                            <input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                              name='image'
                              onChange={handleImageChange}
                              value={selectedImage}
                            />
                          </div>
                        </>
                      )}
                    </label>

                  </div>
                  <h1 className="text-xl font-bold">{details?.hostelName}</h1>
                  <p className="text-gray-600">{details?.email}</p>
                  {imageError && (
                    <div className="text-red-500 mb-2">{imageError}</div>
                  )}

                  <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={submitImage}>
                    Upload Image
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">About Hostel</h2>
                {initialValues && (
                  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                    {({ errors, touched }) => (
                      <Form>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div className="mb-4">
                              <label className="text-gray-600">Owner Name</label>
                              <Field
                                type="text"
                                name="adminName"
                                className={`border ${errors.adminName && touched.adminName ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 bg-gray-100 px-3 py-2 rounded w-full`}
                              />
                              <ErrorMessage name="adminName" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Owner Mobile</label>
                              <Field
                                type="text"
                                name="adminMobile"
                                className={`border ${errors.adminMobile && touched.adminMobile ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 bg-gray-100 px-3 py-2 rounded w-full`}
                              />
                              <ErrorMessage name="adminMobile" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Owner Email</label>
                              <Field
                                name="email"
                                disable
                                className={`border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 bg-gray-100 px-3 py-2 rounded w-full`}
                              />
                              <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Hostel Admission Fee</label>
                              <Field
                                type="text"
                                name="hostelFee"
                                className={`border ${errors.hostelFee && touched.hostelFee ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 bg-gray-100 px-3 py-2 rounded w-full`}
                              />
                              <ErrorMessage name="hostelFee" component="div" className="text-red-500" />
                            </div>
                          </div>
                          <div>

                            <div className="mb-4">
                              <label className="text-gray-600">Hostel Type</label>
                              <Field
                                type="text"
                                name="hostelType"
                                className={`border ${errors.hostelType && touched.hostelType ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 bg-gray-100 px-3 py-2 rounded w-full`}
                              />
                              <ErrorMessage name="hostelType" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Location</label>
                              <Field
                                type="text"
                                name="location"
                                className={`border ${errors.location && touched.location ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 bg-gray-100 px-3 py-2 rounded w-full`}
                              />
                              <ErrorMessage name="location" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Description</label>
                              <Field
                                type="text"
                                component="textarea"
                                name="description"
                                className={`border ${errors.description && touched.description ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 bg-gray-100 h-80 px-3 py-2 rounded w-full`}
                              />
                              <ErrorMessage name="Description" component="div" className="text-red-500" />
                            </div>
                          </div>
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                          Save
                        </button>
                      </Form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfile
