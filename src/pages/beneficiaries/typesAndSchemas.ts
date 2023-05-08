import {
  PhoneValueType,
  SelectValueType,
  UserType,
  PaymentMethod
} from 'types/general';
import { REQUIRED_TEXT, VALID_EMAIL_TEXT } from 'constants/global';
import * as yup from 'yup';

export type TransactionRowType = {
  order: string;
  amount: string;
  approved_by: string;
  date: Date;
  status: string;
};
export type BeneHistoryPropsType = {
  setActiveRow: (active?: number) => void;
  setActive: (active?: number) => void;
  data: {
    id: number;
  };
};
type PaymentType = {
  currencyType: { label: string; value: string } | undefined;
  transactionType: { label: string; value: string } | undefined;
  bankName: { label: string; value: string } | undefined;
  branchAddress: string;
  accountNumber: string;
  accountType: { label: string; value: string } | undefined;
  cryptoWalletId: string;
};
export type FormType = {
  companyName: string;
  companyNumber: PhoneValueType;
  countryDestination: string;
  city: string;
  street: string;
  postcode: string;
  businessType: string;
  contactPersonName: string;
  contactPersonSurname: string;
  email: string;
  phoneNumber: PhoneValueType;
  contactPersonsPhoneNumber: PhoneValueType;
  payments: PaymentType[];
};
export type AddOrEditBeneficiaryPropsType = {
  edit?: boolean;
};

export const BeneficiaryFormSchema = yup.object().shape({
  companyName: yup.string().required(REQUIRED_TEXT),
  companyNumber: yup
    .object()
    .shape({
      code: yup.string().required(REQUIRED_TEXT),
      number: yup.string().required(REQUIRED_TEXT)
    })
    .nullable()
    .required(REQUIRED_TEXT),
  countryDestination: yup.string().required(REQUIRED_TEXT),
  city: yup.string().required(REQUIRED_TEXT),
  street: yup.string().required(REQUIRED_TEXT),
  postcode: yup
    .string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .required(REQUIRED_TEXT),
  businessType: yup.object().nullable().required(REQUIRED_TEXT),
  contactPersonName: yup.string().required(REQUIRED_TEXT),
  contactPersonSurname: yup.string().required(REQUIRED_TEXT),
  email: yup.string().email(VALID_EMAIL_TEXT).required(REQUIRED_TEXT),
  phoneNumber: yup
    .object()
    .shape({
      code: yup.string().required(REQUIRED_TEXT),
      number: yup.string().required(REQUIRED_TEXT)
    })
    .nullable()
    .required(REQUIRED_TEXT),
  contactPersonsPhoneNumber: yup
    .object()
    .shape({
      code: yup.string().required(REQUIRED_TEXT),
      number: yup.string().required(REQUIRED_TEXT)
    })
    .nullable()
    .required(REQUIRED_TEXT),
  payments: yup.array().of(
    yup.object().shape({
      currencyType: yup.object().nullable().required(REQUIRED_TEXT),
      transactionType: yup.object().nullable().required(REQUIRED_TEXT),
      bankName: yup
        .object()
        .nullable()
        .when('transactionType', {
          is: (val: SelectValueType) => val?.value === '2',
          then: yup.object().required(REQUIRED_TEXT),
          otherwise: yup.object().notRequired()
        }),
      branchAddress: yup.string().when('transactionType', {
        is: (val: SelectValueType) => val?.value === '2',
        then: yup.string().required(REQUIRED_TEXT),
        otherwise: yup.string().notRequired()
      }),
      accountNumber: yup.string().when('transactionType', {
        is: (val: SelectValueType) => val?.value === '2',
        then: yup.string().required(REQUIRED_TEXT),
        otherwise: yup.string().notRequired()
      }),
      accountType: yup
        .object()
        .nullable()
        .when('transactionType', {
          is: (val: SelectValueType) => val?.value === '2',
          then: yup.object().required(REQUIRED_TEXT),
          otherwise: yup.object().notRequired()
        }),
      cryptoWalletId: yup.string().when('transactionType', {
        is: (val: SelectValueType) => val?.value === '1',
        then: yup.string().required(REQUIRED_TEXT),
        otherwise: yup.string().notRequired()
      })
    })
  )
});

export type BeneficiaryStatus = 'Pending' | 'Active' | 'Declined';

export type BeneficiaryActionType =
  | 'Delete'
  | 'Approve'
  | 'Reject'
  | 'Delete Payment Method'
  | undefined;

export type RejectFormType = {
  rejectReason: SelectValueType<number>;
  other?: string;
};

export const RejectSchema = yup.object().shape({
  rejectReason: yup.object().required(REQUIRED_TEXT),
  other: yup.string()
});

export type RejectFormPropsType = {
  setRejectReason: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type BeneficiaryCompanyRowType = {
  key: string;
  status: BeneficiaryStatus;
  declineReason?: string;
  segment: 'Company' | 'Individual';
  fullName: string;
  idNumber: string;
  country: string;
  city: string;
  street: string;
  postcode: string;
  businessType?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
};

export type FormValues = {
  search?: string | undefined;
  country?: SelectValueType<string>;
  payment?: string | undefined;
};

export const FilterSchema = yup.object().shape({
  search: yup.string(),
  country: yup.object(),
  payment: yup.object()
});

export type BeneTablePropsType = {
  beneficiaryStatus: BeneficiaryStatus;
};

export type LocationStateBeneType = {
  beneficiaryData: BeneficiaryCompanyRowType;
};

export type LocationStateUserType = {
  userType: UserType;
};

export type LocationStateBeneStatus = {
  beneficiaryStatus: BeneficiaryStatus;
};

export type paymentWalletType = {
  id: string;
  paymentType: PaymentMethod;
  cryptoWalletID: string;
  currency: string;
};

export type paymentBankType = {
  id: string;
  paymentType: PaymentMethod;
  bankName: string;
  branchAddress: string;
  accountNo: string;
  accountType: 'Checking' | 'Savings';
  currency: string;
};

export type PaymentTypeItem = paymentBankType | paymentWalletType;

export type PaymentMethodCardPropsType = {
  userType: UserType;
  declined?: boolean;
  payment: PaymentTypeItem;
};

export type ModalActionPropsType = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  beneficiaryAction: BeneficiaryActionType;
  beneficiaryData: BeneficiaryCompanyRowType | undefined;
  deletePaymentId?: string;
};

export type ModalRejectReasonPropsType = {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  rejectModalVisible: boolean;
  setRejectModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
