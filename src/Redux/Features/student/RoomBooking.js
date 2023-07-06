import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RoomBookingApi } from '../../../Services/studentsServices'

const initialState = {
    bookingDetails: {},
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}

export const BookingData = createAsyncThunk(
    'bookingDetails/BookingData',
    async ({headers}) => {
      try {
        const response = await RoomBookingApi(headers);
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

  export const RoomBookingSlice = createSlice({
    name: "BookingData",
    initialState,
    reducers: {
      RoomDetialsReset: (state) => {
        state = initialState
      }
    },
    extraReducers: (builder) => {
        builder
            .addCase(BookingData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(BookingData.fulfilled, (state,action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.bookingDetails = action.payload;
            })
            .addCase(BookingData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;

            })
    }
})

export const { RoomDetialsReset } = RoomBookingSlice.actions
export default RoomBookingSlice.reducer