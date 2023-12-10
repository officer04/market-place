import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../../utils/constants';

export const getApis = createAsyncThunk('apis/getApis', async ({id}, thunkAPI) => {
  try {
    const res = await axios(`${BASE_URL}/products/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

const apisSlice = createSlice({
  name: 'apis',
  initialState: {
    list: [],
    isLoading: false,
  },
  
  extraReducers: (builder) => {
    builder.addCase(getApis.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getApis.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getApis.rejected, (state) => {
      state.isLoading = false;
    });
  },
});


export default apisSlice.reducer;