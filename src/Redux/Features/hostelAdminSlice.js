import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { hostelAdminApi } from "../../Services/hostelAdmin";

export const registerHostelAdmin = createAsyncThunk(
    'hostelAdmin/register',
    async (formData) => {
      try {
        const response = await hostelAdminApi(formData);
        return response.data;
      } catch (error) {
        throw Error(error.response.data.error || 'An error occurred');
      }
    }
  );

  const initialState = {
    user:{
        fullName: '',
        email: '',
        password: '',
        gender: '',
        qualificaion:'',
    },
    
    loading: false,
    errors: null,
  };

  const hostelAdminSlice = createSlice({
    name: 'hostelAdmin',
    initialState,
    reducers: {
      resetState: (state) => {
        state.loading = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerHostelAdmin.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerHostelAdmin.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload
          
        })
        .addCase(registerHostelAdmin.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export const { resetState } = hostelAdminSlice.actions;
  export default hostelAdminSlice.reducer;