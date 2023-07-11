import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Pagination } from 'antd';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { editRoomApi } from '../../../Services/hostelAdmin';

function RoomList() {
  const rooms = useSelector((state) => state?.room?.rooms);
  const hostelId = useSelector(state => state?.adminHostelData?.hostelId)

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomData, setRoomData] = useState([])
  
  const showModal = async () => {
    const headers = {
      Authorization: JSON.parse(localStorage.getItem("HostelAdminToken")).token
    };

    console.log(headers, hostelId, "<<<< checking here");
    const response = await editRoomApi(headers, hostelId)
    if (response.data) {
      setRoomData(response.data.data)
    }

    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredRooms = rooms.filter((room) => {
    if (filter === 'all') {
      return room.roomNo.includes(searchTerm);
    } else {
      return room.status === filter && room.roomNo.includes(searchTerm);
    }
  });

  const pageNumbers = Math.ceil(filteredRooms.length / itemsPerPage);

  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = Math.min(firstIndex + itemsPerPage, filteredRooms.length);
  const currentRooms = filteredRooms.slice(firstIndex, lastIndex);

  const validationSchema = Yup.object().shape({
    roomNo: Yup.string().required('Room No is required'),
    roomType: Yup.string().required('Room Type is required'),
    capacity: Yup.string().required('Capacity is required'),
    status: Yup.string().required('Status is required'),
    roomPrice: Yup.number().required('Room Price is required'),
    title: Yup.string().required('Title is required'),
    image: Yup.mixed().required('Image is required'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <div className="flex justify-center">
      <div className="w-4/5">
        <h1 className="text-3xl font-bold text-[#002D7A] mb-4">Room Listing</h1>
        <div>
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <select
                value={filter}
                onChange={handleFilterChange}
                className="border  px-4 py-2 border-black bg-white text-black rounded-md"
              >
                <option value="all">All</option>
                <option value="vacant">Vacant</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border px-4 py-2 border-black bg-white text-black rounded-md"
              placeholder="Search Room No"
            />
          </div>
          {currentRooms.length < 1 ? (
            <div className="flex justify-center">
              <p className="text-4xl mt-10 text-black font-semibold">No Matched Result Found</p>
            </div>
          ) : (
            <table className="w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-[#4874BF]">
                <tr>
                  <th className="p-3 text-white text-sm font-bold tracking-wide text-left">NO</th>
                  <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Room No</th>
                  <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Room Type</th>
                  <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Capacity</th>
                  <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Occupants</th>
                  <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Status</th>
                  <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Image</th>
                  <th className="p-3 text-white text-sm font-bold tracking-wide text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room, index) => (
                  <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} key={room._id}>
                    <td className="p-3 text-gray-500 font-semibold">{firstIndex + index + 1}</td>
                    <td className="p-3 text-gray-500 font-semibold">{room.roomNo}</td>
                    <td className="p-3 text-gray-500 font-semibold">{room.roomType}</td>
                    <td className="p-3 text-gray-500 font-semibold">{room.capacity}</td>
                    <td className="p-3 text-gray-500 font-semibold">0</td>
                    <td
                      className={`p-3 font-semibold ${room.status === 'vacant'
                        ? 'text-red-600'
                        : room.status === 'occupied'
                          ? 'text-green-600'
                          : 'text-orange-600'
                        }`}
                    >
                      {room.status}
                    </td>
                    <td className="p-3 font-semibold ">
                      <Button
                        className="outline-2 border-black"
                        onClick={() => handleModalOpen(room)}
                      >
                        View
                      </Button>
                    </td>
                    <td>
                      <button className="btn btn-success" onClick={showModal}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              total={filteredRooms.length}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
      <Modal visible={modalVisible} onCancel={handleModalClose} footer={null}>
        <img src={selectedImage} alt="Room" style={{ maxWidth: '100%' }} />
      </Modal>

      <Modal
        title={
          <div className="flex items-center">
            <span>Edit Rooms</span>
          </div>
        }
        visible={isModalOpen}
        onCancel={handleCancel}
        className="w-full max-w-lg"
        footer={null}
      >
        <Formik
          initialValues={{
            roomNo: roomData?.roomNo || '',
            roomType: roomData?.roomType || '',
            capacity: roomData?.capacity || '',
            status: roomData?.status || '',
            roomPrice: roomData?.roomPrice || '',
            image: roomData?.image || '',
            title: roomData?.title || '',
            description: roomData?.description || '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            // handleSubmit(values, resetForm);
            setIsModalOpen(false);
          }}
        >
          {({ setFieldValue }) => (
            <Form className="p-6 space-y-6">
              <div className="flex space-x-4 flex-col sm:flex-row sm:space-x-4">
                <div className="w-full sm:w-1/2">
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
                <div className="w-full sm:w-1/2">
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
                    <option value="Single" className="bg-white">
                      Single Share
                    </option>
                    <option value="Double-Share" className="bg-white">
                      Double Share
                    </option>
                    <option value="Four-Share" className="bg-white">
                      Four Share
                    </option>
                    <option value="Six-Share" className="bg-white">
                      Six Share
                    </option>
                  </Field>
                  <ErrorMessage name="roomType" component="div" className="text-red-500" />
                </div>
              </div>
              <div className="flex space-x-4 flex-col sm:flex-row sm:space-x-4">
                <div className="w-full sm:w-1/2">
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
                <div className="w-full sm:w-1/2">
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
              <div className="flex space-x-4 flex-col sm:flex-row sm:space-x-4">
                <div className="w-full sm:w-1/2">
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
                <div className="w-full sm:w-1/2">
                  <label htmlFor="title" className="block font-medium">
                    Title:
                  </label>
                  <Field
                    type="text"
                    id="title"
                    className="w-full h-8 rounded-md border-slate-800 bg-blue-200"
                    name="title"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500" />
                </div>
              </div>
              <div className="flex space-x-4 flex-col sm:flex-row sm:space-x-4">
                <div className="w-full sm:w-1/2">
                  <label htmlFor="image" className="block font-medium">
                    Image:
                  </label>
                  <input
                    type="file"
                    id="image"
                    className="w-full h-8 rounded-md border-slate-800 bg-blue-200"
                    name="image"
                  // onChange={(event) => handleImageChange(event, setFieldValue)}
                  />
                  <ErrorMessage name="image" component="div" className="text-red-500" />
                </div>
                <div className="w-full sm:w-1/2">
                  <label htmlFor="description" className="block font-medium">
                    Description:
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    className="w-full rounded-md border-slate-800 bg-blue-200"
                    name="description"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500" />
                </div>
              </div>
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

export default RoomList;
