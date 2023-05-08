import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  visibility: false
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<boolean>) => {
      state.visibility = action.payload;
    }
  }
});

export const { loading } = loadingSlice.actions;

export default loadingSlice.reducer;
