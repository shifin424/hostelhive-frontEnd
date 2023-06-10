import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hostelReducer from './Features/hostel/hostelSlice'

const hostelPersistConfig = {
    key:"hostel",
    storage
};

const persistedHostelReducer = persistReducer(hostelPersistConfig,hostelReducer)

const rootReducer = {
    hostel:persistedHostelReducer
}

const store = configureStore({
    reducer:rootReducer
})

export default store



