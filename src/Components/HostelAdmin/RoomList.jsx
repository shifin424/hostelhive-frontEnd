import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';

function RoomList() {
  const rooms = useSelector(state => state.room.rooms);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleModalOpen = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div className="flex justify-center">
      <div className="w-4/5">
        
        <h1 className="text-3xl font-bold text-[#002D7A] mb-4 "  >Room Listing</h1>
        <div className="overflow-x-auto">
          {rooms.length < 1 ? (
            <div className=' flex justify-center'><p  className='text-4xl text-black font-semibold'>No rooms added yet.</p></div>
            
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
                {rooms.map((room, index) => (
                  <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} key={room._id}>
                    <td className="p-3 text-gray-500 font-semibold">{index + 1}</td>
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
                      <Button className="outline-2 border-black" onClick={() => handleModalOpen(room.roomImage.url)}>
                        View
                      </Button>
                    </td>
                    <td>
                      <button className="btn btn-success">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Modal visible={modalVisible} onCancel={handleModalClose} footer={null}>
        <img src={selectedImage} alt="Room" style={{ maxWidth: '100%' }} />
      </Modal>
    </div>
  );
}

export default RoomList;
