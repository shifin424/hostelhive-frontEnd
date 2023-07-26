import React, { useEffect, useState ,useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import { editProfileApi, fetchProfileData,} from '../../../Services/studentsServices';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { ProfileData } from '../../../Redux/Features/student/ProfileSlice'


function EditProfile() {
  const [details, setDetails] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(isModalOpen);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const openModal = () => {
    setIsModalOpen(true);
  };

  const headers = useMemo(() => ({
    'Content-Type': 'multipart/form-data',
    Authorization: JSON?.parse(localStorage.getItem("StudentToken"))?.token
  }), []); 

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
       await dispatch(ProfileData({ headers, data }))
      if (details.studentImage) {
        toast.success("Successfully updated the Image")
        navigate('/student/profile')
      } else {
        toast.error("Something went wrong please try again later")
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload image');
    }
  };

  useEffect(() => {
    const ProfileData = async () => {
      try {
        const response = await fetchProfileData(headers);
        if (response) {
          setDetails(response?.data);

          setInitialValues({
            fullName: response?.data?.fullName || '',
            mobile: response?.data?.phone || '',
            gender: response?.data?.gender || '',
            dateOfBirth: response?.data?.dateOfBirth || '',
            bloodGroup: response?.data?.bloodGroup || '',
            hostelName: response?.data?.hostelName || '',
            parentName: response?.data?.parentName || '',
            parentMobile: response?.data?.parentMobileNumber || '',
            houseName: response?.data?.address?.houseName || '',
            landMark: response?.data?.address?.landMark || '',
            area: response?.data?.address?.area || '',
            city: response?.data?.address?.city || '',
            country: response?.data?.address?.country || '',
            pincode: response?.data?.address?.pincode || '',
          });

          setFormValues({
            fullName: response?.data?.fullName || '',
            mobile: response?.data?.phone || '',
            gender: response?.data?.gender || '',
            dateOfBirth: response?.data?.dateOfBirth || '',
            bloodGroup: response?.data?.bloodGroup || '',
            hostelName: response?.data?.hostelName || '',
            parentName: response?.data?.parentName || '',
            parentMobile: response?.data?.parentMobileNumber || '',
            houseName: response?.data?.address?.houseName || '',
            landMark: response?.data?.address?.landMark || '',
            area: response?.data?.address?.area || '',
            city: response?.data?.address?.city || '',
            country: response?.data?.address?.country || '',
            pincode: response?.data?.address?.pincode || '',
          });
        } else {
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    ProfileData();
  }, [headers]);

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    mobile: Yup.string().required('Mobile is required'),
    gender: Yup.string().required('Gender is required'),
    dateOfBirth: Yup.string().required('Date of Birth is required'),
    bloodGroup: Yup.string().notRequired(),
    hostelName: Yup.string().notRequired(),
    parentName: Yup.string().required('Parent Name is required'),
    parentMobile: Yup.string().required('Parent Mobile Number is required'),
    houseName: Yup.string().required('House Name is required'),
    landMark: Yup.string().required('Landmark is required'),
    area: Yup.string().required('Area is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    pincode: Yup.string().required('Pincode is required'),
  });



  const handleSubmit = async (values) => {
    if (JSON.stringify(formValues) === JSON.stringify(values)) {
      toast.error("No changes were made.");
      return;
    }
    try {
      const response = await editProfileApi({headers, values})
      if (response.data.message) {
        toast.success("Profile updated successfully")
        navigate('/student/profile')
      } else {
        toast.error("Something went wrong")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error)
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
                              multiple
                              name='image'
                              onChange={handleImageChange}
                              value={selectedImage}
                            />
                          </div>
                        </>
                      )}
                    </label>

                  </div>
                  <h1 className="text-xl font-bold">{details?.fullName}</h1>
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
                <h2 className="text-xl font-bold mb-4">About Me</h2>
                {initialValues && (
                  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ errors, touched }) => (
                      <Form>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div className="mb-4">
                              <label className="text-gray-600">Full Name</label>
                              <Field
                                type="text"
                                name="fullName"
                                className={`border ${errors.fullName && touched.fullName ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 bg-gray-100 px-3 py-2 rounded w-full`}
                              />
                              <ErrorMessage
                                name="fullName"
                                component={() => <div className="text-red-500">{touched.fullName && errors.fullName}</div>}
                              />
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Mobile</label>
                              <Field
                                type="text"
                                name="mobile"
                                className={`border ${errors.mobile && touched.mobile ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 px-3 py-2 bg-gray-100 rounded w-full`}
                              />
                              <ErrorMessage
                                name="mobile"
                                component={() => <div className="text-red-500">{touched.mobile && errors.mobile}</div>}
                              />
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Gender</label>
                              <Field
                                as="select"
                                name="gender"
                                className={`border ${errors.gender && touched.gender ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 px-3 py-2 bg-gray-100 rounded w-full`}
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </Field>
                              <ErrorMessage
                                name="gender"
                                component={() => <div className="text-red-500">{touched.gender && errors.gender}</div>}
                              />
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Date of Birth</label>
                              <Field
                                type="text"
                                name="dateOfBirth"
                                className={`border ${errors.dateOfBirth && touched.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 bg-gray-100 px-3 py-2 rounded w-full`}
                              />
                              <ErrorMessage
                                name="dateOfBirth"
                                component={() => <div className="text-red-500">{touched.dateOfBirth && errors.dateOfBirth}</div>}
                              />
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Blood Group</label>
                              <Field
                                type="text"
                                name="bloodGroup"
                                className={`border ${errors.bloodGroup && touched.bloodGroup ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 bg-gray-100 px-3 py-2 rounded w-full`}
                              />
                              <ErrorMessage
                                name="bloodGroup"
                                component={() => <div className="text-red-500">{touched.bloodGroup && errors.bloodGroup}</div>}
                              />
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Hostel Name</label>
                              <Field
                                type="text"
                                name="hostelName"
                                className={`border ${errors.hostelName && touched.hostelName ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 bg-gray-100 px-3 py-2 rounded w-full`}
                              />
                              <ErrorMessage
                                name="hostelName"
                                component={() => <div className="text-red-500">{touched.hostelName && errors.hostelName}</div>}
                              />
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Parent Name</label>
                              <Field
                                type="text"
                                name="parentName"
                                className={`border ${errors.parentName && touched.parentName ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 px-3 py-2 rounded w-full bg-gray-100`}
                              />
                              <ErrorMessage name="parentName">
                                {(errorMsg) => <div className="text-red-500">{touched.parentName && errorMsg}</div>}
                              </ErrorMessage>
                            </div>
                          </div>
                          <div>

                            <div className="mb-4">
                              <label className="text-gray-600">Parent Mobile Number</label>
                              <Field
                                type="text"
                                name="parentMobile"
                                className={`border ${errors.parentMobileNumber && touched.parentMobileNumber ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 px-3 py-2 rounded w-full bg-gray-100`}
                              />
                              <ErrorMessage name="parentMobile">
                                {(errorMsg) => <div className="text-red-500">{touched.parentMobile && errorMsg}</div>}
                              </ErrorMessage>
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">House Name</label>
                              <Field
                                type="text"
                                name="houseName"
                                className={`border ${errors.houseName && touched.houseName ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 px-3 py-2 rounded w-full bg-gray-100`}
                              />
                              <ErrorMessage name="houseName">
                                {(errorMsg) => <div className="text-red-500">{touched.houseName && errorMsg}</div>}
                              </ErrorMessage>
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Landmark</label>
                              <Field
                                type="text"
                                name="landMark"
                                className={`border ${errors.landMark && touched.landMark ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 px-3 py-2 rounded w-full bg-gray-100`}
                              />
                              <ErrorMessage name="landmark">
                                {(errorMsg) => <div className="text-red-500">{touched.landMark && errorMsg}</div>}
                              </ErrorMessage>
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Area</label>
                              <Field
                                type="text"
                                name="area"
                                className={`border ${errors.area && touched.area ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 px-3 py-2 rounded w-full bg-gray-100`}
                              />
                              <ErrorMessage name="area">
                                {(errorMsg) => <div className="text-red-500">{touched.area && errorMsg}</div>}
                              </ErrorMessage>
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">City</label>
                              <Field
                                type="text"
                                name="city"
                                className={`border ${errors.city && touched.city ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 px-3 py-2 rounded w-full bg-gray-100`}
                              />
                              <ErrorMessage name="city">
                                {(errorMsg) => <div className="text-red-500">{touched.city && errorMsg}</div>}
                              </ErrorMessage>
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Country</label>
                              <Field
                                type="text"
                                name="country"
                                className={`border ${errors.country && touched.country ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 px-3 py-2 rounded w-full bg-gray-100`}
                              />
                              <ErrorMessage name="country">
                                {(errorMsg) => <div className="text-red-500">{touched.country && errorMsg}</div>}
                              </ErrorMessage>
                            </div>
                            <div className="mb-4">
                              <label className="text-gray-600">Pincode</label>
                              <Field
                                type="text"
                                name="pincode"
                                className={`border ${errors.pincode && touched.pincode ? 'border-red-500' : 'border-gray-300'
                                  } text-gray-500 px-3 py-2 rounded w-full bg-gray-100`}
                              />
                              <ErrorMessage name="pincode">
                                {(errorMsg) => <div className="text-red-500">{touched.pincode && errorMsg}</div>}
                              </ErrorMessage>
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


      <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={openModal}
      >
        Open Modal
      </button>
      {/* <Modal isOpen={isModalOpen} onClose={closeModal} /> */}
    </div>
      
    </>
  );
}

export default EditProfile;
