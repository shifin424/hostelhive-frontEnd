import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Pagination } from 'antd';

function RoomList() {
  const rooms = useSelector((state) => state?.room?.rooms);
  console.log(rooms);


  const [selectedImage, setSelectedImage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  console.log(setItemsPerPage);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  console.log(selectedRoom)

  const handleModalOpen = (room) => {
    setSelectedRoom(room);
    setSelectedImage(room.roomImage.url); 
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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

  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = Math.min(firstIndex + itemsPerPage, filteredRooms.length);
  const currentRooms = filteredRooms.slice(firstIndex, lastIndex);

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
                    <Link to={'/hostel/hostel-listing/edit-rooms'}>  <button className="btn btn-success">Edit</button></Link>
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
      <Modal visible={isModalOpen} onCancel={handleModalClose} footer={null}>
        <img src={selectedImage} alt="Room" style={{ maxWidth: '100%' }} />
      </Modal>
    </div>
  );
}

export default RoomList;
