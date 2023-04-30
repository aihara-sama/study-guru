export interface SignUpRequest {
  email: string;
  password: string;
}
export interface SignInRequest {
  email: string;
  password: string;
}
export interface ResetPasswordRequest {
  password: string;
}
export interface ForgetPasswordRequest {
  email: string;
}
