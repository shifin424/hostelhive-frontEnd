import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { complaintApi, fetchComplaintData } from '../../Services/studentsServices';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Complaints() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState([]);
  console.log(details,"<<<<<<checking");
  const hostelId = useSelector(state => state?.adminHostelData?.hostelId);

  useEffect(() => {
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("StudentToken")).token
    };

    const fetchComplaints = async () => {
      try {
        console.log(headers, hostelId);
        const response = await fetchComplaintData(headers, hostelId);

        if (response.data) {
          console.log(response.data);
          setDetails(response.data.data);
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchComplaints();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (values) => {
    console.log(values);

    const headers = {
      Authorization: JSON.parse(localStorage.getItem("StudentToken"))?.token
    };

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
      <div className="flex justify-end pb-2">
        <button className="btn btn-info" onClick={showModal}>
          Add Complaints
        </button>
      </div>
      <div>
        <h1 className="text-[#002D74] text-2xl font-bold">Complaints</h1>
      </div>
      

      {details.length > 0 ? (
  <div className="overflow-x-auto">
    <table className="w-full bg-white rounded-lg overflow-hidden">
      <thead className="bg-[#4874BF]">
        <tr>
          <th className="p-3 text-white text-sm font-bold tracking-wide text-left">NO</th>
          <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Complaint Type</th>
          <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Description</th>
          <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Status</th>
          <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Created Date</th>
          <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Admin Response</th>
        </tr>
      </thead>
      <tbody>
        {details.map((complaint, index) => (
          <tr className="bg-gray-200" key={complaint.id}>
            <td className="p-3 text-gray-500 font-semibold">{index + 1}</td>
            <td className="p-3 text-gray-500 font-semibold">{complaint.complaintType}</td>
            <td className="p-3 text-gray-500 font-semibold">{complaint.complaintDescription}</td>
            <td className="p-3 font-semibold text-red-600">{complaint.status}</td>
            <td className="p-3 font-semibold border-black">{complaint.createdAt}</td>
            <td className="p-3 font-semibold border-black">{complaint.adminResponse}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <p>No data available.</p>
)}

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
