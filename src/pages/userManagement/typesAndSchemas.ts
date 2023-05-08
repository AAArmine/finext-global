import { REQUIRED_TEXT, VALID_EMAIL_TEXT } from 'constants/global';
import * as yup from 'yup';
import { PhoneValueType } from 'types/general';

export type UserRow = {
  full_name: string;
  email: string;
  phone: string;
  role: string;
  user_type: string;
  date: Date;
  status: string;
};

export const AddUserSchema = yup.object().shape({
  usertype: yup.object().nullable().required(REQUIRED_TEXT),
  name: yup.string().required(REQUIRED_TEXT),
  surname: yup.string().required(REQUIRED_TEXT),
  position: yup.object().nullable().required(REQUIRED_TEXT),
  phoneNumber: yup
    .object()
    .shape({
      code: yup.string().required(REQUIRED_TEXT),
      number: yup.string().required(REQUIRED_TEXT)
    })
    .nullable()
    .required(REQUIRED_TEXT),
  email: yup.string().email(VALID_EMAIL_TEXT).required(REQUIRED_TEXT)
});

export interface IForm {
  usertype: string | undefined;
  name: string;
  surname: string;
  position: string | undefined;
  phoneNumber: PhoneValueType;
  email: string;
}
