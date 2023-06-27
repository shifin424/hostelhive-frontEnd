import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { hostelSingleViewApi } from '../../../Services/LandingService'





const initialState = {
    hostelData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}

export const hostelView = createAsyncThunk(

    "hostelData/hostelView",
    async (id) => {
        try {
            const response = await hostelSingleViewApi(id)
            console.log(response.data, "hello");
            if (response) {
                console.log(response.data);
            }
            return response.data
        } catch (err) {
            console.log(err);
        }
    }
)


export const HostelSlice = createSlice({
    name: "HostelView",
    initialState,
    reducers: {
        StudentHostelReset: (state) => {
            state = initialState
        },
      },
    extraReducers: (builder) => {
        builder
            .addCase(hostelView.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(hostelView.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.hostelData = action.payload;
            })
            .addCase(hostelView.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;

            })
    }
})

export const { StudentHostelReset } = HostelSlice.actions
export default HostelSlice.reducer


