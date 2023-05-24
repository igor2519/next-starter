import { object, string } from 'yup';

export const userIdSchema = object().noUnknown().shape({
  userId: string().uuid().required().trim(),
});

export const emailSchema = object()
  .noUnknown()
  .shape({
    email: string().required().email().trim().max(255),
  });

export const resetPasswordSchema = object()
  .noUnknown()
  .shape({
    email: string().required().email().trim().max(255),
    verificationToken: string().required().trim(),
    password: string().required().trim(),
  });
