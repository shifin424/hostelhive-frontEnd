import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { hostelDataApi } from '../../../Services/hostelAdmin'


const initialState = {
    hostels: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    hostelId:"",
    message: "",
    error: ""
}

export const allHostel = createAsyncThunk(
    "hostelAdmin/hostels",
    async (headers, thunkAPI) => {
        try {
            console.log(headers);
            const response = await hostelDataApi(headers)
            return response.data
        } catch (err) {
            console.log(err);
        }
    }
)


export const hostelSlice = createSlice({
    name: "hostel",
    initialState,
    reducers: {
        reset: (state) => {
            state = initialState
        },
        addHostelId :(state,action)=>{
            state.hostelId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(allHostel.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(allHostel.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hostels = action.payload;
            })
            .addCase(allHostel.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;

            })
    }
})

export const { reset ,addHostelId} = hostelSlice.actions
export default hostelSlice.reducer