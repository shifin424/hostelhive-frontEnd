import React, { useEffect, useState } from 'react';
import { Modal, message } from 'antd';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { navigate, useNavigate } from 'react-router-dom';
import { hostelRoomApi ,hostelRoomData} from '../../Services/hostelAdmin';

function Rooms() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState([]);
    const [roomData,setRoomData] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchRoomData = async () => {
          try {
            const headers = {
              Authorization: localStorage.getItem("HostelAdminToken"),
              hostelId: "64823427c73f97a6e30d7b44" 
            };
            const response = await hostelRoomData(headers);
            if (response) {
              console.log(response.data);
              setRoomData(response.data);
            } else {
              console.log(response);
            }
          } catch (error) {
            message.error(error);
          }
        };
        fetchRoomData();
      }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const validationSchema = Yup.object({
        roomNo: Yup.string().trim().required('Room No is required').strict(true),
        roomType: Yup.string().required('Room Type is required'),
        capacity: Yup.number().required('Capacity is required'),
        status: Yup.string().required('Status is required'),
        roomPrice: Yup.string()
            .required('Room Price is required')
            .matches(/^[0-9]+$/, 'Room Price must contain only numbers'),
        image: Yup.mixed().required('Image is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('roomNo', values.roomNo);
        formData.append('roomType', values.roomType);
        formData.append('capacity', values.capacity);
        formData.append('status', values.status);
        formData.append('roomPrice', values.roomPrice);
        formData.append('image', values.image);

        const headers = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: localStorage.getItem('HostelAdminToken'),
            },
        };

        console.log(formData, headers);
        hostelRoomApi(formData, headers)
            .then((response) => {
                if (response.data.error) {
                    toast.error(response.data.error);
                    setError(response.data.error);
                } else {
                    message.success('Room added successfully');
                    // navigate('');
                    message.success('Navigated to this page');
                }
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.error || 'An error occurred');
                toast.error(err.response.data.error || 'An error occurred');
            });
    };


    const handleImageChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        setFieldValue('image', file);
        setPreviewImage(URL.createObjectURL(file));
    };

    return (
        <div>
            <div className="flex justify-end pt-16 pb-10">
                <button className="btn btn-info" onClick={showModal}>
                    Add Rooms
                </button>
            </div>

            <Modal
                title="Add Rooms"
                visible={isModalOpen}
                onCancel={handleCancel}
                className="w-96"
                footer={null}
            >
                <Formik
                    initialValues={{
                        roomNo: '',
                        roomType: '',
                        capacity: '',
                        status: '',
                        roomPrice: '',
                        image: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        handleSubmit(values, resetForm);
                        setIsModalOpen(false);
                    }}
                >
                    {({ isValid, dirty, setFieldValue }) => (
                        <Form className="p-6 space-y-6">
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="roomNo" className="block font-medium">
                                        Room No:
                                    </label>
                                    <Field
                                        type="text"
                                        id="roomNo"
                                        className="w-full h-8 rounded-md border-slate-800 bg-blue-200"
                                        name="roomNo"
                                    />
                                    <ErrorMessage name="roomNo" component="div" className="text-red-500" />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="roomType" className="block font-medium">
                                        Room Type:
                                    </label>
                                    <Field
                                        as="select"
                                        id="roomType"
                                        className="w-full h-8 rounded-md border-slate-800 bg-blue-200"
                                        name="roomType"
                                    >
                                        <option value="">Select Room Type</option>
                                        <option value="single">Single Share</option>
                                        <option value="double">Double Share</option>
                                        <option value="four">Four Share</option>
                                        <option value="six">Six Share</option>
                                    </Field>
                                    <ErrorMessage name="roomType" component="div" className="text-red-500" />
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="capacity" className="block font-medium">
                                        Capacity:
                                    </label>
                                    <Field
                                        as="select"
                                        id="capacity"
                                        className="w-full h-8 rounded-md border-slate-800 bg-blue-200"
                                        name="capacity"
                                    >
                                        <option value="">Select Capacity</option>
                                        <option value="1" className="bg-white">
                                            1
                                        </option>
                                        <option value="2" className="bg-white">
                                            2
                                        </option>
                                        <option value="4" className="bg-white">
                                            4
                                        </option>
                                        <option value="6" className="bg-white">
                                            6
                                        </option>
                                    </Field>
                                    <ErrorMessage name="capacity" component="div" className="text-red-500" />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="status" className="block font-medium">
                                        Status:
                                    </label>
                                    <Field
                                        as="select"
                                        id="status"
                                        className="w-full h-8 rounded-md border-slate-800 bg-blue-200"
                                        name="status"
                                    >
                                        <option value="">Select Status</option>
                                        <option value="occupied" className="bg-white">
                                            Occupied
                                        </option>
                                        <option value="vacant" className="bg-white">
                                            Vacant
                                        </option>
                                        <option value="reserved" className="bg-white">
                                            Reserved
                                        </option>
                                    </Field>
                                    <ErrorMessage name="status" component="div" className="text-red-500" />
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label htmlFor="roomPrice" className="block font-medium">
                                        Room Price:
                                    </label>
                                    <Field
                                        id="roomPrice"
                                        className="w-full h-8 rounded-md border-slate-800 bg-blue-200"
                                        name="roomPrice"
                                    />
                                    <ErrorMessage name="roomPrice" component="div" className="text-red-500" />
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="image" className="block font-medium">
                                        Image:
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        className="w-full h-8 rounded-md border-slate-800 bg-blue-200"
                                        name="image"
                                        onChange={(event) => handleImageChange(event, setFieldValue)}
                                    />
                                    <ErrorMessage name="image" component="div" className="text-red-500" />
                                </div>
                            </div>
                            {previewImage && (
                                <div>
                                    <h3>Room Image Preview:</h3>
                                    <img src={previewImage} alt="Preview" className='w-[28rem] h-52 rounded-md' />
                                </div>
                            )}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-5 py-1 rounded-md bg-[#002D7A] text-white hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
}

export default Rooms;
