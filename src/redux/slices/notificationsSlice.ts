import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ERROR, SUCCESS } from 'constants/notifications';

interface EmailVerifyState {
  visibility: boolean;
  text: string;
  type: typeof SUCCESS | typeof ERROR | '';
}

const initialState = {
  visibility: false,
  text: '',
  type: ''
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    toastMsg: (state, action: PayloadAction<EmailVerifyState>) => {
      (state.visibility = action.payload.visibility),
        (state.text = action.payload.text),
        (state.type = action.payload.type);
    }
  }
});

export const { toastMsg } = notificationsSlice.actions;

export default notificationsSlice.reducer;
