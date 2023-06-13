import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hostelReducer from './Features/hostel/hostelSlice'
import roomReducer from './Features/hostel/roomSlice'
import hostelViewReducer from './Features/student/hostelSlice'

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


const persistedHostelReducer = persistReducer(hostelPersistConfig,hostelReducer)
const persistedRoomReducer = persistReducer(roomPersistConfig,roomReducer)
const persistedHostelViewReducer = persistReducer(hostelViewPersistConfig,hostelViewReducer)





const rootReducer = {
    hostel:persistedHostelReducer,
    room:persistedRoomReducer,
    hostelView:persistedHostelViewReducer
}

export const store = configureStore({
    reducer:rootReducer
})

export  const persistor = persistStore(store)



