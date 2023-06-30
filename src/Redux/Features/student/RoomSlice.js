import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { hostelRoomDetails } from '../../../Services/LandingService'


const initialState = {
    roomDetails: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}
export const RoomData = createAsyncThunk(
    'roomDetails/fetchRoomData',
    async ({ hostelId, roomType }) => {
      try {
        const response = await hostelRoomDetails(hostelId, { room_type: roomType });
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

export const RoomSlice = createSlice({
    name: "RoomDatas",
    initialState,
    reducers: {
      StudentRoomReset: (state) => {
        state = initialState
    }
    },
    extraReducers: (builder) => {
        builder
            .addCase(RoomData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(RoomData.fulfilled, (state,action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.roomDetails = action.payload;
            })
            .addCase(RoomData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;

            })
    }
})

export const { StudentRoomReset } = RoomSlice.actions
export default RoomSlice.reducer
