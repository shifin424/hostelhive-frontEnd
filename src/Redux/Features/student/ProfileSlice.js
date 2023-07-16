import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { imageUploadApi } from '../../../Services/studentsServices'

const initialState = {
    studentprofile: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}

export const ProfileData = createAsyncThunk(
    'studentprofile/ProfileData',
    async ({headers,data}) => {
      try {
        const response = await imageUploadApi(headers,data);
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

  export const ProfileSlice = createSlice({
    name: "ProfileData",
    initialState,
    reducers: {
      ProfileReset: (state) => {
        state = initialState
      }
    },
    extraReducers: (builder) => {
        builder
            .addCase(ProfileData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(ProfileData.fulfilled, (state,action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bookingDetails = action.payload;
            })
            .addCase(ProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;

            })
    }
})

export const { ProfileReset } = ProfileSlice.actions
export default ProfileSlice.reducer