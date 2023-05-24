import * as Sentry from '@sentry/nextjs';
import axios from 'axios';
import { yupToFormErrors } from 'formik';
import { ValidationError } from 'yup';

import { errorMessages } from '@/server/constants';
import { ClientError } from '@/server/models';
import { envUtil } from '@/shared/utils';

import type { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Options } from 'next-connect';

const getClientError = (error: ClientError) => {
  if (error.payload) {
    return { message: error.message, errors: error.payload };
  }

  return { message: error.message };
};

const getAxiosError = (error: AxiosError) => {
  if (envUtil.isDevEnv()) {
    return {
      message: errorMessages.externalServiceUnavailable,
      stack: error.stack,
      response: {
        data: error.response?.data,
        message: error.message,
      },
    };
  }

  return { message: errorMessages.externalServiceUnavailable };
};

const getServerError = (error: Error) => {
  if (envUtil.isDevEnv()) {
    return { message: error.message, stack: error.stack };
  }

  return { message: errorMessages.internalServerError };
};

export const options: Options<NextApiRequest, NextApiResponse> = {
  onError(err: Error, req: NextApiRequest, res: NextApiResponse) {
    // Handle client errors
    if (err instanceof ClientError) {
      res.status(err.status).json(getClientError(err));
      return;
    }

    // Handle validation errors
    if (err instanceof ValidationError) {
      res.status(400).json(yupToFormErrors(err));
      return;
    }

    // Capture only production exceptions
    Sentry.captureException(err);

    // Handle server errors
    res.status(500).json(axios.isAxiosError(err) ? getAxiosError(err) : getServerError(err));
  },

  onNoMatch(req: NextApiRequest, res: NextApiResponse<{ message: string }>) {
    res.status(405).json({ message: `Method '${req.method}' Not Allowed` });
  },
};
