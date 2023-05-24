import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { useCallback, useState } from 'react';

import type { IPasswordInputProps } from './types';

function PasswordInput<
  V = string,
  FormValues extends Record<string, unknown> = Record<string, unknown>,
>({ field, form: { touched, errors }, ...props }: IPasswordInputProps<V, FormValues>) {
  const [isPasswordShown, setPasswordShown] = useState(false);

  const onToggleShowPassword = useCallback(() => {
    setPasswordShown((val) => !val);
  }, []);

  const hasError = Boolean(touched[field.name] && errors[field.name]);

  return (
    <TextField
      {...field}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="Toggle password visibility" onClick={onToggleShowPassword}>
              {isPasswordShown ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
        ...props.InputProps,
      }}
      type={isPasswordShown ? 'text' : 'password'}
      error={hasError}
      helperText={hasError ? errors[field.name] : ' '}
    />
  );
}

export default PasswordInput;
