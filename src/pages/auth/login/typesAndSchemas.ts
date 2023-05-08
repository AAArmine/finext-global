import { REQUIRED_TEXT, VALID_EMAIL_TEXT } from 'constants/global';
import * as yup from 'yup';

export interface LoginForm {
  username: string;
  password: string;
}

export type LoginRequest = {
  username: string;
  password: string;
};

export const LoginSchema = yup.object().shape({
  username: yup.string().required(REQUIRED_TEXT).email(VALID_EMAIL_TEXT),
  password: yup.string().required('Password is required')
});

export type LocationAuthErrorState = {
  authError: string;
};
