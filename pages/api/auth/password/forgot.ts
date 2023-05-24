import nextConnect from 'next-connect';

import { apiConfig } from '@/server/config';
import { successMessages } from '@/server/constants';
import { authorizationService } from '@/server/services';
import { emailSchema } from '@/shared/validation-schemas';

import type { IApiRequest } from '@/server/types';
import type { IForgotPasswordRequest } from '@/shared/data-transfer/requests';
import type { ISuccessResponse } from '@/shared/data-transfer/responses';
import type { NextApiResponse } from 'next';

const apiRoute = nextConnect(apiConfig.options).post(
  async (req: IApiRequest<IForgotPasswordRequest>, res: NextApiResponse<ISuccessResponse>) => {
    const data = await emailSchema.validate(req.body);
    await authorizationService.sendForgotEmail(data.email);
    res.status(200).json({ message: successMessages.emailSent });
  },
);

export default apiRoute;
