import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hostelReducer from './Features/hostel/hostelSlice'
import roomReducer from './Features/hostel/roomSlice'
import hostelViewReducer from './Features/student/hostelSlice'
import authReducer from './Features/hostel/AuthSlice'
import roomDatareducer  from './Features/student/RoomSlice'
import studentAuthReducer from './Features/student/AuthSlice'
//import { reset as bookingDataReset } from './Features/student/RoomBooking'
import RoomBookingReducer from './Features/student/RoomBooking'
import StudentProfileReducer from './Features/student/ProfileSlice'
import adminProfileReducer from './Features/hostel/profileSlice'


const hostelPersistConfig = {
    key:"adminHostelData",
    storage
};

const roomPersistConfig = {
    key:"room",
    storage
}

const hostelViewPersistConfig = {
    key:"hostelView",
    storage
}

const AuthPersistConfig = {
    key:"adminAuth",
    storage
}

const roomDataPersistConfig = {
    key:"RoomsData",
    storage
}

const studentAuthPersistConfig = {
    key:"AuthData",
    storage
}

const bookingDataPersistConfig = {
    key:"bookingDetails",
    storage
}

const profileDataPersistConfig = {
    key:"studentprofile",
    storage
}

const adminProfileDataPersistConfig = {
    key:"adminProfile",
    storage
}


const persistedHostelReducer = persistReducer(hostelPersistConfig,hostelReducer)
const persistedRoomReducer = persistReducer(roomPersistConfig,roomReducer)
const persistedHostelViewReducer = persistReducer(hostelViewPersistConfig,hostelViewReducer)
const persistedAuthReducer = persistReducer(AuthPersistConfig,authReducer)
const persistedRoomDataReducer = persistReducer(roomDataPersistConfig,roomDatareducer)
const persistedStudentAuthReducer = persistReducer(studentAuthPersistConfig,studentAuthReducer)
const persistedRoomBookingReducer = persistReducer(bookingDataPersistConfig,RoomBookingReducer)
const persistedProfileDataReducer = persistReducer(profileDataPersistConfig,StudentProfileReducer)
const persistedAdminProfileReducer = persistReducer(adminProfileDataPersistConfig,adminProfileReducer)



const rootReducer = {
    adminHostelData: persistedHostelReducer,
    room: persistedRoomReducer,
    hostelView: persistedHostelViewReducer,
    adminAuth: persistedAuthReducer,
    roomsDetils: persistedRoomDataReducer,
    studentAuth: persistedStudentAuthReducer,
    roomBookingData: persistedRoomBookingReducer,
    studentProfile:persistedProfileDataReducer,
    adminProfile:persistedAdminProfileReducer
  };

 // rootReducer.roomBookingData.reset = bookingDataReset;

export const store = configureStore({
    reducer:rootReducer
})

export  const persistor = persistStore(store)



