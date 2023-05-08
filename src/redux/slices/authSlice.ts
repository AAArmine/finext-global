import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface AuthState {
  token: string;
  verified: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  token: '',
  verified: false
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    verifyUser: (state, action: PayloadAction<boolean>) => {
      state.verified = action.payload;
    }
  }
});

export const { login, verifyUser } = authSlice.actions;

export default authSlice.reducer;
