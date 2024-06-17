import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUser } from '../services';

const initialState = {
  status: 'idle',
  data: null,
  error: null
};

export const getAllUserThunk = createAsyncThunk(
  'user/getAllUser',
  async () => {
    try {
      const response = await getAllUser();
      return response.data;
    } catch (error) {
      throw error
    }
  },
);

export const userSlice = createSlice({
  name: 'user___',
  initialState,
  reducers: {
    // increment: state => {
    //   state.value += 1;
    // },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllUserThunk.pending, state => {
        state.status = 'loading';
        console.log('Get User loading')
      })
      .addCase(getAllUserThunk.fulfilled, (state, action) => {
        console.log('Get User Success', action.payload)
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getAllUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
        console.log('Get User failed', state.error)
      });
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;