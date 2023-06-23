import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {hostelRoomData } from '../../../Services/hostelAdmin'


const initialState = {
    rooms: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}

export const roomData = createAsyncThunk(
    "Rooms/roomData",
    async ({headers, hostelId}) => {
        try {
            const response = await hostelRoomData(headers, hostelId)
            return response.data
        } catch (err) {
            console.log(err);
        }
    }
)

export const RoomSlice = createSlice({
    name: "Rooms",
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(roomData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(roomData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.rooms = action.payload;
            })
            .addCase(roomData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;

            })
    }
})

export const { reset } = RoomSlice.actions
export default RoomSlice.reducer
