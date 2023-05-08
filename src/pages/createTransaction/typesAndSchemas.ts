import { REQUIRED_TEXT } from 'constants/global';
import {
  ONE_TIME_TRANSACTION,
  SCHEDULED_TRANSACTION,
  SPLITTED_TRANSACTION
} from 'pages/createTransaction/constants';
import { SelectValueType } from 'types/general';
import * as yup from 'yup';

export type AvailableBalanceItemProps = {
  currency: string;
  value: string;
};
export type ModalTransactionDetailsPropsType = {
  title: string;
  onCancel: () => void;
  onOk: () => void;
  visible: boolean;
};
export const CreateTransactionSchema = yup.object().shape({
  beneficiary: yup.object().nullable().required(REQUIRED_TEXT),
  paymentType: yup.object().nullable().required(REQUIRED_TEXT),
  transactionRecurrence: yup.object().nullable().required(REQUIRED_TEXT),
  amount: yup.string().required(REQUIRED_TEXT),
  currency: yup.object().nullable().required(REQUIRED_TEXT),
  transactionSource: yup.object().nullable().required(REQUIRED_TEXT),
  fee: yup.object().nullable().required(REQUIRED_TEXT),
  transactionPurpose: yup.object().nullable().required(REQUIRED_TEXT),
  transactionFrequency: yup
    .object()
    .when(['transactionRecurrence', 'recurringTransaction'], {
      is: (
        transactionRecurrence: SelectValueType,
        recurringTransaction: boolean
      ) =>
        transactionRecurrence?.value === ONE_TIME_TRANSACTION &&
        recurringTransaction,
      then: yup.object().nullable().required(REQUIRED_TEXT),
      otherwise: yup.object().notRequired()
    }),
  comment: yup.string().required(REQUIRED_TEXT),
  recurringTransaction: yup.boolean(),
  transactionDate: yup.date().when('transactionRecurrence', {
    is: (val: SelectValueType) => val?.value === SCHEDULED_TRANSACTION,
    then: yup.date().required(REQUIRED_TEXT).nullable(),
    otherwise: yup.date().notRequired()
  }),
  splittedAmounts: yup.array().of(
    yup.object().shape({
      amountPercent: yup
        .mixed()
        .test('nestedPercentTest', REQUIRED_TEXT, (value, context: any) => {
          const parentSchemeValues = context.from[1].value;
          return (
            parentSchemeValues.transactionRecurrence?.value !==
              SPLITTED_TRANSACTION || value
          );
        }),
      amount: yup
        .mixed()
        .test('nestedAmountTest', REQUIRED_TEXT, (value, context: any): any => {
          const parentSchemeValues = context.from[1].value;
          return (
            parentSchemeValues.transactionRecurrence?.value !==
              SPLITTED_TRANSACTION || value
          );
        }),
      date: yup
        .mixed()
        .test('nestedDateTest', REQUIRED_TEXT, (value, context: any) => {
          const parentSchemeValues = context.from[1].value;
          return (
            parentSchemeValues.transactionRecurrence?.value !==
              SPLITTED_TRANSACTION || value
          );
        })
    })
  )
});
export interface IForm {
  beneficiary: SelectValueType;
  paymentType: SelectValueType;
  transactionRecurrence: SelectValueType;
  amount: string;
  currency: SelectValueType;
  transactionSource: SelectValueType;
  fee: SelectValueType;
  transactionPurpose: SelectValueType;
  comment: string;
  recurringTransaction: boolean;
  transactionFrequency: SelectValueType;
  transactionDate: any;
  splittedAmounts: any;
}
