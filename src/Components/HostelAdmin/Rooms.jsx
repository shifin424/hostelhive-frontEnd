import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'antd'


function Rooms() {

    const [isModalOpen, setIsModalOpen] = useState(false);



    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div >
            <div className='flex justify-end pt-16 pb-10'>
                <button className='btn btn-info' onClick={showModal}>Add Rooms</button>
            </div>


            <Modal
                title="Add Rooms"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                className="w-96"
            >
                <div className="p-6 space-y-6">
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="roomNo" className="block font-medium">Room No:</label>
                            <input type="text" id="roomNo" className="w-full h-8 rounded-md border-gray-300" />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="roomType" className="block font-medium">Room Type:</label>
                            <input type="text" id="roomType" className="w-full h-8 rounded-md border-gray-300" />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="capacity" className="block font-medium">Capacity:</label>
                            <input type="number" id="capacity" className="w-full h-8 rounded-md border-gray-300" />
                        </div>

                        <div className="w-1/2">
                            <label htmlFor="status" className="block font-medium">Status:</label>
                            <input type="text" id="status" className="w-full h-8 rounded-md border-gray-300" />
                        </div>
                        
                    </div>
                </div>
            </Modal>




        </div>
    )
}

export default Rooms
