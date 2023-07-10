import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { fetchLeaveLetter, leaveLetterApi } from '../../Services/studentsServices';
import { toast } from 'react-toastify';

function LeaveLetter() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [details, setDetails] = useState([])
    const bookingStatus = useSelector(state => state?.roomBookingData?.bookingDetails?.bookingStatus[0]);
    const hostelId = bookingStatus?.hostelId


    useEffect(() => {
        const headers = {
            Authorization: JSON?.parse(localStorage.getItem("StudentToken"))?.token
        };
        const leaveData = async () => {
            try {
                console.log(headers, hostelId);
                const response = await fetchLeaveLetter(headers, hostelId);

                if (response) {
                    console.log(response.data);
                    setDetails(response?.data?.LeaveDatas);
                } else {
                    console.log(response?.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        leaveData();
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (values) => {
        const headers = {
            Authorization: JSON.parse(localStorage.getItem("StudentToken"))?.token
        };
        const response = await leaveLetterApi(headers, values, hostelId)
        if (response) {
            toast.success("Successfully added leaveLetter")
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const validationSchema = Yup.object().shape({
        startDate: Yup.date()
            .min(new Date(), 'Starting Date cannot be a previous day')
            .required('Starting Date is required'),
        endDate: Yup.date()
            .min(Yup.ref('startDate'), 'Ending Date cannot be before Starting Date')
            .required('Ending Date is required'),
        description: Yup.string().required('Description is required'),
    });



    return (
        <>
            <div className="flex justify-between p-3 mt-5">
                <h1 className="flex text-2xl text-[#002D74] font-bold text-center">Leave Letters</h1>
                <button className="btn btn-info" onClick={showModal}>
                    Add Leave Letter
                </button>
            </div>

            <div className="overflow-auto rounded-lg shadow">
                <table role="table" className="w-full table-auto">
                    {details?.length > 0 && (
                        <thead className="bg-[#4874BF] text-white">
                            <tr role="row">
                                <th
                                    colSpan="1"
                                    role="columnheader"
                                    className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                                >
                                    No
                                </th>
                                <th
                                    colSpan="1"
                                    role="columnheader"
                                    className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                                >
                                    Leave Start Date
                                </th>
                                <th
                                    colSpan="1"
                                    role="columnheader"
                                    className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                                >
                                    Leave End Date
                                </th>
                                <th
                                    colSpan="1"
                                    role="columnheader"
                                    className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
                                >
                                    Description
                                </th>
                            </tr>
                        </thead>
                    )}
                    <tbody role="rowgroup" className="bg-white">
                        {details?.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-3 text-gray-500 text-2xl font-bold text-center">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            details.map((LeaveDatas, index) => (
                                <tr
                                    role="row"
                                    className="odd:bg-white even:bg-gray-200"
                                    key={LeaveDatas._id}
                                >
                                    <td
                                        role="cell"
                                        className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                                    >
                                        {index + 1}
                                    </td>
                                    <td
                                        role="cell"
                                        className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                                    >
                                        {LeaveDatas?.startDate}
                                    </td>
                                    <td
                                        role="cell"
                                        className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                                    >
                                        {LeaveDatas?.endDate}
                                    </td>
                                    <td
                                        role="cell"
                                        className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
                                    >
                                        {LeaveDatas?.description}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-900">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md mx-4">
                        <h2 className="text-xl font-bold mb-4 text-gray-500">Add Leave Letter</h2>
                        <Formik
                            initialValues={{
                                startDate: '',
                                endDate: '',
                                description: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleOk}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="startDate">
                                            Starting Date
                                        </label>
                                        <Field
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none bg-blue-200 focus:border-blue-500"
                                        />
                                        <ErrorMessage name="startDate" component="div" className="text-red-500" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="endDate">
                                            Ending Date
                                        </label>
                                        <Field
                                            type="date"
                                            id="endDate"
                                            name="endDate"
                                            className="w-full p-2 border border-gray-300 rounded-md text-black focus:outline-none bg-blue-200 focus:border-blue-500"
                                        />
                                        <ErrorMessage name="endDate" component="div" className="text-red-500" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">
                                            Description
                                        </label>
                                        <Field
                                            as="textarea"
                                            id="description"
                                            name="description"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none text-black bg-blue-200 focus:border-blue-500"
                                            rows={4}
                                        />
                                        <ErrorMessage name="description" component="div" className="text-red-500" />
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded mr-2"
                                        >
                                            OK
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-gray-500 hover:bg-red-500 text-white rounded"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </>
    );
}

export default LeaveLetter;
