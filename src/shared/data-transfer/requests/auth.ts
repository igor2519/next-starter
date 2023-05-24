export interface ISignInRequest {
  email: string;
  password: string;
}

export interface IForgotPasswordRequest {
  email: string;
  token: string;
  password: string;
}
