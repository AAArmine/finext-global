import { PhoneValueType } from 'types/general';
import * as yup from 'yup';
import { VALID_EMAIL_TEXT, REQUIRED_TEXT } from 'constants/global';

export type FormValues = {
  userName: string;
  type: string;
  phoneNumber: PhoneValueType;
  pass: string;
  confirmPass: string;
};
export type UserDataRequest = {
  username: string;
  password: string;
  cstType: string;
  mobile: string;
};

export type RegistrationByInvitationForm = {
  full_name: string;
  position: string;
  pass: string;
  confirmPass: string;
};

export const regUserSchema = yup.object().shape({
  userName: yup.string().email(VALID_EMAIL_TEXT).required(REQUIRED_TEXT),
  type: yup.string(),
  phoneNumber: yup
    .object()
    .shape({
      code: yup.string().required(REQUIRED_TEXT),
      number: yup.string().required(REQUIRED_TEXT)
    })
    .nullable()
    .required(REQUIRED_TEXT),
  pass: yup
    .string()
    .required(REQUIRED_TEXT)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      'Invalid password'
    ),
  confirmPass: yup
    .string()
    .required(REQUIRED_TEXT)
    .oneOf([yup.ref('pass')], 'Password does not match')
});

export const regByInvitationSchema = yup.object().shape({
  full_name: yup.string().required(REQUIRED_TEXT),
  position: yup.string().required(REQUIRED_TEXT),
  pass: yup
    .string()
    .required(REQUIRED_TEXT)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      'Invalid password'
    ),
  confirmPass: yup
    .string()
    .required(REQUIRED_TEXT)
    .oneOf([yup.ref('pass')], 'Password does not match')
});
