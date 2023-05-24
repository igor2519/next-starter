import { createSlice } from '@reduxjs/toolkit';

import { sendForgotPassword } from './thunks';

import type IAuthState from './types';

const initialState: IAuthState = {
  isResetPasswordSent: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState(state) {
      state.isResetPasswordSent = false;
    },
    setPasswordSent(state) {
      state.isResetPasswordSent = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendForgotPassword.fulfilled, (state) => {
      state.isResetPasswordSent = true;
    });
  },
});

export const { resetState, setPasswordSent } = authSlice.actions;

export default authSlice.reducer;
