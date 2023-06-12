import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hostelReducer from './Features/hostel/hostelSlice'
import roomReducer from './Features/hostel/roomSlice'

const hostelPersistConfig = {
    key:"hostel",
    storage
};

const roomPersistConfig = {
    key:"room",
    storage
}

const persistedHostelReducer = persistReducer(hostelPersistConfig,hostelReducer)
const persistedRoomReducer = persistReducer(roomPersistConfig,roomReducer)





const rootReducer = {
    hostel:persistedHostelReducer,
    room:persistedRoomReducer
}

const store = configureStore({
    reducer:rootReducer
})

export default store



