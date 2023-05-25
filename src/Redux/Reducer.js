import { combineReducers } from "@reduxjs/toolkit";
import hostelAdminReducer from "./Features/hostelAdminSlice";

const reducer = combineReducers({
  hostelAdmin: hostelAdminReducer,
});

export default reducer;
