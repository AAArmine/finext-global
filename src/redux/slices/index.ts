import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import notificationsReducer from './notificationsSlice';
import authUserInfoReducer from './authUserInfoSlice';
import loadingReducer from './loadingSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
  authUserInfo: authUserInfoReducer,
  loading: loadingReducer
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
