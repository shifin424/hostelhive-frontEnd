import {  Modal } from 'antd';
import { useEffect, useState ,useMemo} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { complaintApi, fetchComplaintData } from '../../../Services/studentsServices';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './Complaints.css'

function Complaints() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState([]);
  console.log(details);
  const bookingStatus = useSelector(state => state?.roomBookingData?.bookingDetails?.bookingStatus);
  const hostelId = bookingStatus?.hostelId;
  
  const headers = useMemo(() => ({
    Authorization: JSON?.parse(localStorage.getItem("HostelAdminToken"))?.token
  }), []); 

  useEffect(() => {
   

    const fetchComplaints = async () => {
      try {
        console.log(headers, hostelId);
        const response = await fetchComplaintData(headers, hostelId);

        if (response?.data) {
          console.log(response?.data);
          setDetails(response?.data?.data);
        } else {
          console.log(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchComplaints();
  }, [headers,hostelId]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (values) => {
 
    const response = await complaintApi(headers, values, hostelId);
    if (response) {
      toast.success("Complaint Registered successfully");
    } else {
      toast.error("Something went wrong");
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const validationSchema = Yup.object().shape({
    complaintType: Yup.string().required('Please select a complaint type.'),
    complaintDescription: Yup.string().required('Please enter a complaint description.'),
  });

  return (
    <>

      <div className="flex justify-between p-3 mt-5">
        <h1 className="flex text-2xl text-[#002D74] font-bold text-center">Complaints</h1>
        <button className="btn btn-info" onClick={showModal}>
          Add Complaints
        </button>
      </div>



      {details.length > 0 ? (
  <div className="overflow-x-auto rounded-lg shadow">
    <table role="table" className="w-full">
      <thead className="bg-[#4874BF] text-white">
        <tr role="row">
          <th
            role="columnheader"
            className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
          >
            No
          </th>
          <th
            role="columnheader"
            className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
          >
            Complaint Type
          </th>
          <th
            role="columnheader"
            className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
          >
            Description
          </th>
          <th
            role="columnheader"
            className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
          >
            Status
          </th>
          <th
            role="columnheader"
            className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
          >
            Created date
          </th>
          <th
            role="columnheader"
            className="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300"
          >
            Admin Response
          </th>
        </tr>
      </thead>
      <tbody role="row" className="bg-white">
        {details.map((complaint, index) => (
          <tr
            role="row"
            className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
            key={complaint?.id}
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
              {complaint?.complaintType}
            </td>
            <td
              role="cell"
              className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
            >
              {complaint?.complaintDescription}
            </td>
            <td
              role="cell"
              className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
            >
              {complaint?.status}
            </td>
            <td
              role="cell"
              className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
            >
              {complaint?.createdAt}
            </td>
            <td
              role="cell"
              className="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words"
            >
              {complaint?.adminResponse}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <p>No data available.</p>
)}


      {/* <div class="overflow-auto rounded-lg shadow">
        <table role="table" class="w-full table-auto">
          <thead class="bg-[#4874BF] text-white">
            <tr role="row">
              <th colspan="1" role="columnheader" class="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">User</th>
              <th colspan="1" role="columnheader" class="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">Complaint Type</th>
              <th colspan="1" role="columnheader" class="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">Complaint Description</th>
              <th colspan="1" role="columnheader" class="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">Status</th>
              <th colspan="1" role="columnheader" class="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">Created At</th>
              <th colspan="1" role="columnheader" class="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">Admin Response</th>
              <th colspan="1" role="columnheader" class="p-3 text-base font-semibold text-center tracking-wide border-b border-gray-300">Action</th></tr></thead>
          <tbody role="rowgroup" class="bg-white"><tr role="row" class="odd:bg-white even:bg-gray-50 hover:bg-gray-200">
            <td role="cell" class="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">MK Sankeerth Shaji</td>
            <td role="cell" class="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">Maintenance</td>
            <td role="cell" class="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">Here fan and wifi is not working for 2 days solve as soon as possible</td>
            <td role="cell" class="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">
              <p class="text-yellow-400">In Progress</p></td><td role="cell" class="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">05/07/2023</td>
            <td role="cell" class="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">Working on it..</td>
            <td role="cell" class="p-3 text-sm font-medium text-gray-700 text-center border-b border-gray-300 break-words">
              <div class="flex justify-center">
                <button class="p-2 rounded bg-green-500 text-white  hover:bg-green-600">Update</button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div> */}




      <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="grid gap-4">
          <div className="text-2xl font-bold">Complaint Register</div>
          <Formik
            initialValues={{ complaintType: '', complaintDescription: '' }}
            validationSchema={validationSchema}
            onSubmit={handleOk}
          >
            <Form className="grid gap-5">
              <div>
                <label htmlFor="complaintType" className="text-sm font-medium text-gray-700">
                  Complaint Type
                </label>
                <div className="mt-1">
                  <Field
                    as="select"
                    name="complaintType"
                    className="w-full bg-white border-gray-400 rounded-lg shadow-sm h-10 border-2"
                  >
                    <option value="">Select a Complaint Type</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Security">Security</option>
                    <option value="Cleanliness">Cleanliness</option>
                    <option value="Others">Others</option>
                  </Field>
                  <ErrorMessage
                    name="complaintType"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="complaintDescription" className="text-sm font-medium text-gray-700">
                  Complaint Description
                </label>
                <div className="mt-1">
                  <Field
                    as="textarea"
                    name="complaintDescription"
                    id="complaintDescription"
                    cols="30"
                    rows="2"
                    className="w-full bg-white border-2 border-gray-400 resize-none rounded-lg shadow-sm"
                  />
                  <ErrorMessage
                    name="complaintDescription"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="bg-[#002D74] w-32 h-12 text-white font-semibold p-2 rounded-full transform hover:scale-105 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>

    </>
  );
}

export default Complaints;
