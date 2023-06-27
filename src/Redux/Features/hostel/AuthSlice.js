import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { hostelAdminApi } from '../../../Services/hostelAdmin'


const initialState = {
    adminAuthData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
    error: ""
}


export const AuthData = createAsyncThunk(
    "adminAuthData/AuthData",
    async (values) => {
        try {
            const response = await hostelAdminApi(values);
            return response.data;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
   
);


export const AuthSlice = createSlice({
    name: "adminAuthData",
    initialState,
    reducers: {
        adminAuthDataReset: (state) => {
            state = initialState
        }
      },
    extraReducers: (builder) => {
        builder
            .addCase(AuthData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AuthData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.adminAuthData = action.payload;
            })
            .addCase(AuthData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { adminAuthDataReset } = AuthSlice.actions
export default AuthSlice.reducer