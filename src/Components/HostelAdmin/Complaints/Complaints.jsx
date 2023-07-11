import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { complaintsListingApi, editComplaintApi } from '../../../Services/hostelAdmin';
import { FaEdit } from 'react-icons/fa';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

function Complaints() {
  const hostelId = useSelector(state => state?.adminHostelData?.hostelId);
  const [details, setDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleModalOpen = (complaint) => {
    setSelectedComplaint(complaint);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedComplaint(null);
    setIsModalOpen(false);
  };

  const handleModalSubmit = async (values, complaintId, { setSubmitting }) => {
    console.log(values,"<<",complaintId);

    const headers = {
      Authorization: JSON?.parse(localStorage.getItem('HostelAdminToken'))?.token
    };

   const response = await editComplaintApi(headers,values,complaintId)
   if(response.data.message){
    toast.success('Updated status successfully')
   }else{
    toast.error("Error occured")
   }
    handleModalClose();
    setSubmitting(false);
  };

  const validationSchema = Yup.object().shape({
    adminResponse: Yup.string().required('Please Enter your Response.'),
    status: Yup.string().required('Please Select a Status.'),
  });

  useEffect(() => {
    const headers = {
      Authorization: JSON?.parse(localStorage.getItem('HostelAdminToken'))?.token
    };

    const fetchComplaints = async () => {
      try {
        const response = await complaintsListingApi(headers, hostelId);

        if (response.data) {
          console.log(response?.data);
          setDetails(response?.data?.formattedComplaints);
        } else {
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-[#002D74] text-2xl font-bold pb-5">Complaints</h1>
      </div>

      {details.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-[#4874BF]">
              <tr>
                <th className="p-3 text-white text-sm font-bold tracking-wide text-left">NO</th>
                <th className="p-3 text-white text-sm font-bold tracking-wide text-left">User</th>
                <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Complaint Type</th>
                <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Description</th>
                <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Status</th>
                <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Created Date</th>
                <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Admin Response</th>
                <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {details.map((complaint, index) => (
                <tr
                  className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'}
                  key={complaint?.id}
                >
                  <td className="p-3 text-gray-500 font-semibold">{index + 1}</td>
                  <td className="p-3 text-gray-500 font-semibold">{complaint?.user?.fullName}</td>
                  <td className="p-3 text-gray-500 font-semibold">{complaint?.complaintType}</td>
                  <td className="p-3 text-gray-500 font-semibold">{complaint?.complaintDescription}</td>
                  <td className={`p-3 font-semibold ${complaint?.status === 'New' ? 'text-red-600' : complaint?.status === 'Resolved' ? 'text-green-600' : 'text-orange-400'}`}>{complaint?.status}</td>
                  <td className="p-3 text-gray-500 font-semibold">{complaint?.createdAt}</td>
                  <td className="p-3 text-gray-500 font-semibold">{complaint?.adminResponse}</td>
                  <td>
                    <button
                      className="text-gray-500 ml-3  hover:text-green-500"
                      href="#"
                      onClick={() => handleModalOpen(complaint)}
                    >
                      <FaEdit className="w-10 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data available.</p>
      )}

      {selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-900">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[500px]">
            <h2 className="text-xl font-bold mb-4 text-[#002D74]">Update Status</h2>
            <Formik
              initialValues={{
                adminResponse: selectedComplaint?.adminResponse || '',
                status: selectedComplaint?.status || ''
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => handleModalSubmit( values, selectedComplaint._id, { setSubmitting })}
            >
              {({ errors, touched }) => (
                <Form className="grid gap-5">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="status">
                      Status
                    </label>
                    <Field
                      as="select"
                      id="status"
                      name="status"
                      className={`w-full p-2 border bg-white border-gray-600 rounded-md focus:outline-none focus:border-blue-500 ${
                        errors.status && touched.status ? 'border-red-500' : ''
                      }`}
                    >
                      <option className="text-gray-500 font-semibold" value="">
                        Select Status
                      </option>
                      <option className="text-gray-500 font-semibold" value="New">
                        New
                      </option>
                      <option className="text-gray-500 font-semibold" value="In Progress">
                        In Progress
                      </option>
                      <option className="text-gray-500 font-semibold" value="Resolved">
                        Resolved
                      </option>
                    </Field>
                    <div className="text-red-500">
                      <ErrorMessage name="status" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="response">
                      Admin Response
                    </label>
                    <Field
                      as="textarea"
                      id="response"
                      name="adminResponse"
                      className={`w-full p-2 border bg-white text-gray-600 border-gray-600 rounded-md focus:outline-none focus:border-blue-500 ${
                        errors.adminResponse && touched.adminResponse ? 'border-red-500' : ''
                      }`}
                      rows={4}
                      placeholder="text here....."
                    />
                    <div className="text-red-500">
                      <ErrorMessage name="adminResponse" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded mr-2"
                      type="submit"
                    >
                      OK
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-500 hover:bg-red-500 text-white rounded"
                      onClick={handleModalClose}
                    >
                      Cancel
                    </button>
                  </div>
                  {errors._form && touched.adminResponse && touched.status && (
                    <div className="text-red-500">
                      <ErrorMessage name="_form" />
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}

export default Complaints;
