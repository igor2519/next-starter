import axios from 'axios';

import type { ISuccessResponse } from '@/shared/data-transfer/responses';

const sendForgotPassword = async (email: string) => {
  const response = await axios
    .post<ISuccessResponse>('/auth/password/forgot', { email })
    .then((res) => res.data);

  return response;
};

const authorizationService = {
  sendForgotPassword,
};
export default authorizationService;
