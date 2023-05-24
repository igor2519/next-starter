import { createAsyncThunk } from '@reduxjs/toolkit';

import { authorizationService } from '@/client/services';
import { handleThunkApiError } from '@/client/utils';

export const sendForgotPassword = createAsyncThunk(
  'auth/sendForgotPassword',
  handleThunkApiError(authorizationService.sendForgotPassword),
);
