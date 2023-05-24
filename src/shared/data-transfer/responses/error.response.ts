import type { FormikErrors } from 'formik';

export interface IErrorResponse {
  message: string;
}

export interface IFormErrorResponse<FormValues> {
  message?: string;
  errors: FormikErrors<FormValues>;
}
