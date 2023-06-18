import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hostelReducer from './Features/hostel/hostelSlice'
import roomReducer from './Features/hostel/roomSlice'
import hostelViewReducer from './Features/student/hostelSlice'
import authReducer from './Features/hostel/AuthSlice'
import roomDatareducer  from './Features/student/RoomSlice'
import studentAuthReducer from './Features/student/AuthSlice'

const hostelPersistConfig = {
    key:"hostel",
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
    key:"Auth",
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




const persistedHostelReducer = persistReducer(hostelPersistConfig,hostelReducer)
const persistedRoomReducer = persistReducer(roomPersistConfig,roomReducer)
const persistedHostelViewReducer = persistReducer(hostelViewPersistConfig,hostelViewReducer)
const persistedAuthReducer = persistReducer(AuthPersistConfig,authReducer)
const persistedRoomDataReducer = persistReducer(roomDataPersistConfig,roomDatareducer)
const persistedStudentAuthReducer = persistReducer(studentAuthPersistConfig,studentAuthReducer)




const rootReducer = {
    hostel:persistedHostelReducer,
    room:persistedRoomReducer,
    hostelView:persistedHostelViewReducer,
    auth:persistedAuthReducer,
    roomsDetils:persistedRoomDataReducer,
    studentAuth:persistedStudentAuthReducer

}

export const store = configureStore({
    reducer:rootReducer
})

export  const persistor = persistStore(store)



