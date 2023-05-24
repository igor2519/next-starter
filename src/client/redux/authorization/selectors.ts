import { createSelector } from 'reselect';

import type { RootState } from '@/client/redux/store';

export const authorizationsStateSelector = ({ auth }: RootState) => auth;

export const resetPasswordSent = createSelector(
  authorizationsStateSelector,
  (state) => state.isResetPasswordSent,
);
