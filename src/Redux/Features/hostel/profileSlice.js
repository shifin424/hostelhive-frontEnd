import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { imageUploadApi } from '../../../Services/hostelAdmin'

const initialState = {
    adminProfile: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
  }

  export const adminProfileData = createAsyncThunk(
    'adminProfile/adminProfileData',
    async ({ headers, data,hostelId }) => {
      console.log(headers,data,hostelId,"inside the reducer");
      try {
        const response = await imageUploadApi(headers,data,hostelId);
        if (response) {
          console.log(response.data);
        }
        return response.data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  );

  export const adminProfileSlice = createSlice({
    name: "adminProfileData",
    initialState,
    reducers: {
      AdminProfileReset: (state) => {
        state = initialState
      }
    },

    extraReducers: (builder) => {
        builder
          .addCase(adminProfileData.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(adminProfileData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.adminProfile = action.payload;
          })
          .addCase(adminProfileData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
    
          })
      }
    })
    
export const { AdminProfileReset } = adminProfileSlice.actions
export default adminProfileSlice.reducer