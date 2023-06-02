import React from 'react';
import mailImage from '../../assets/images/Mail.png';

function Notify() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-2xl bg-[#93b8f9] rounded-lg shadow-2xl p-8">
        <div className="flex justify-center">
          <img src={mailImage} alt="Notification" className="w-72 h-52 ml-4" />
        </div>
        <h2 className="text-3xl font-bold text-center text-green-600 mt-8">Successful Request!</h2>
        <p className="text-center text-blue-950 mt-4">
          Your hostel request has been sent successfully. We will review it and send a response to your email.
          Please allow up to 1 hour to receive our response. You can return to our site to check for updates.
        </p>
      </div>
    </div>
  );
}

export default Notify;
