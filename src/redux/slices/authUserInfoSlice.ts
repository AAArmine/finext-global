import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type initialStateValue = any;
const initialState: initialStateValue = {};

export const authUserInfoSlice = createSlice({
  name: 'authUserInfo',
  initialState,
  reducers: {
    authUserInfo: (state, action: PayloadAction<any>) => {
      update(state, action.payload);
      function update(targetObject: any, obj: any) {
        Object.keys(obj).forEach((key) => {
          // delete property if set to undefined or null
          if (undefined === obj[key] || null === obj[key]) {
            delete targetObject[key];
          }
          // property value is object, so recurse
          else if ('object' === typeof obj[key] && !Array.isArray(obj[key])) {
            // target property not object, overwrite with empty object
            if (
              !(
                'object' === typeof targetObject[key] &&
                !Array.isArray(targetObject[key])
              )
            ) {
              targetObject[key] = {};
            }
            // recurse
            update(targetObject[key], obj[key]);
          }
          // set target property to update property
          else {
            targetObject[key] = obj[key];
          }
        });
      }
    }
  }
});

export const { authUserInfo } = authUserInfoSlice.actions;

export default authUserInfoSlice.reducer;
