import * as yup from 'yup';
import { REQUIRED_TEXT } from 'constants/global';

export type MoneySourceType = {
  label: string;
  value: string;
};
export type FormBankValues = {
  accountName: string;
  bankName: string;
  accountNumber: string;
  swift: string;
  iban: string;
  amount: string;
  currency: string;
};
export type FormWalletValues = {
  companyWallet: string;
  numberWallet: string;
  amountWallet: string;
  currencyWallet: string;
};
export const depositBankSchema = yup.object().shape({
  accountName: yup
    .string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required(REQUIRED_TEXT),
  bankName: yup
    .string()
    .min(2, 'Bank Name is too short')
    .max(50, 'Bank Name is too long')
    .required(REQUIRED_TEXT),
  accountNumber: yup
    .string()
    .min(8, 'Enter a valid Account Number')
    .max(17, 'Enter a valid Account Number')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required(REQUIRED_TEXT),
  swift: yup
    .string()
    .min(8, 'Enter a valid Swift code')
    .max(13, 'Enter a valid Swift code')
    .matches(/^[a-zA-Z0-9-\s]*$/, 'Enter a valid Swift code')
    .required(REQUIRED_TEXT),
  iban: yup
    .string()
    .min(8, 'Enter a valid Iban')
    .max(40, 'Enter a valid Iban')
    .matches(/^[a-zA-Z0-9-\s]*$/, 'Enter a valid Iban')
    .required(REQUIRED_TEXT),
  amount: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required(REQUIRED_TEXT),
  currency: yup.object().nullable().required(REQUIRED_TEXT)
});

export const depositWalletSchema = yup.object().shape({
  amountWallet: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required(REQUIRED_TEXT),
  currencyWallet: yup.object().nullable().required(REQUIRED_TEXT),
  companyWallet: yup.string().required(REQUIRED_TEXT),
  numberWallet: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required(REQUIRED_TEXT)
});
