import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { StudentSignupApi } from '../../../Services/LandingService'



const initialState = {
    AuthData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    confimObj: "",
    error: ""
}

export const StudentAuth = createAsyncThunk(

    "AuthData/StudentAuth",
    async (values) => {
        try {
            const response = await StudentSignupApi(values)
            console.log(response.data, "here the signup responce data");
            if (response) {
                console.log(response.data);
            }
            return response.data
        } catch (err) {
            console.log(err);
        }
    }
)

export const AuthSlice = createSlice({
    name: "AuthData",
    initialState,
    reducers: {

        StudentAuthReset: (state) => {
            state = initialState
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(StudentAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(StudentAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.AuthData = action.payload;
            })
            .addCase(StudentAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;

            })
    }
})

export const { StudentAuthReset } = AuthSlice.actions
export default AuthSlice.reducer