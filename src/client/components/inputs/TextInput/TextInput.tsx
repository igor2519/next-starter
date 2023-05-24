import { TextField } from '@mui/material';

import type { ITextInputProps } from './types';

function TextInput<
  V = string,
  FormValues extends Record<string, unknown> = Record<string, unknown>,
>({ field, form: { touched, errors }, ...props }: ITextInputProps<V, FormValues>) {
  const hasError = Boolean(touched[field.name] && errors[field.name]);

  return (
    <TextField
      {...field}
      {...props}
      error={hasError}
      helperText={hasError ? errors[field.name] : ' '}
    />
  );
}

export default TextInput;
