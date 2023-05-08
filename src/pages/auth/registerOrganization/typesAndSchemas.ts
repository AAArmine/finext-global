import { SelectValueType } from 'types/general';
import { PhoneValueType } from 'types/general';
import { REQUIRED_TEXT, VALID_EMAIL_TEXT } from 'constants/global';
import * as yup from 'yup';
import { Moment } from 'moment';
import { DateSchema } from 'yup';

export type DeleteOfficer = {
  id: string;
  'teamMember[role]': '' | 'user' | 'auth';
};

export type OrganizationTableItem = {
  key: string;
  name: string;
  position: string;
};

export interface AddOrEditOfficerForm {
  fullName: string;
  id_info: {
    position: SelectValueType<string>;
    type: SelectValueType<string>;
    issuer: string;
    issueDate: string | Moment;
    expDate: string | Moment;
  };
  shareholderOf?: string;
  votingRights?: string;
  nationalCountry: SelectValueType<string>;
  city: string;
  state: string;
  street: string;
  nationalID: string;
  nationality: string;
  mobile: PhoneValueType;
  email: string;
}
export const SetOfficerSchema = yup.object().shape({
  fullName: yup.string().required(REQUIRED_TEXT),
  id_info: yup.object().shape({
    position: yup.object().required(REQUIRED_TEXT),
    type: yup.object().required(REQUIRED_TEXT),
    issuer: yup
      .string()
      .matches(/^[A-Za-z0-9 -]*$/, 'Must be only numbers and letters')
      .required(REQUIRED_TEXT),
    issueDate: yup.date().required(REQUIRED_TEXT).nullable(),
    expDate: yup
      .date()
      .when(
        'issueDate',
        (
          issueDate: { getTime: () => number },
          schema: DateSchema<Date | undefined>
        ) => {
          if (issueDate) {
            const dayAfter = new Date(issueDate.getTime() + 86400000);
            return schema.min(
              dayAfter,
              'Expiration Date must be grater than Date Of Issue'
            );
          }
          return schema;
        }
      )
      .required(REQUIRED_TEXT)
      .nullable()
  }),
  shareholderOf: yup
    .string()
    .matches(/^(?:100|\d{1,2})(?:\.\d{1,2})?$/)
    .when('id_info[position]', {
      is: (val: SelectValueType<string>) => val?.value == 'shareholder',
      then: yup.string().required(),
      otherwise: yup.string().notRequired()
    }),
  votingRights: yup
    .string()
    .matches(/^(?:100|\d{1,2})(?:\.\d{1,2})?$/)
    .min(0, 'Value must be between 0-100')
    .max(100, 'Value must be between 0-100')
    .when('id_info[position]', {
      is: (val: SelectValueType<string>) => val?.value == 'shareholder',
      then: yup.string().required(REQUIRED_TEXT),
      otherwise: yup.string().notRequired()
    }),
  nationalCountry: yup.object().required(REQUIRED_TEXT),
  city: yup
    .string()
    .matches(/^[A-Za-z -]*$/, 'Must be only letters')
    .required(REQUIRED_TEXT),
  state: yup
    .string()
    .matches(/^[A-Za-z -]*$/, 'Must be only letters')
    .required(REQUIRED_TEXT),
  street: yup.string().required(REQUIRED_TEXT),
  nationalID: yup
    .string()
    .matches(/^[A-Za-z0-9 -]*$/, 'Must be only numbers and letters')
    .required(REQUIRED_TEXT),
  nationality: yup
    .string()
    .matches(/^[A-Za-z0-9 -]*$/, 'Must be only numbers and letters')
    .required(REQUIRED_TEXT),
  mobile: yup
    .object()
    .shape({
      code: yup.string().required(REQUIRED_TEXT),
      number: yup.string().required(REQUIRED_TEXT)
    })
    .nullable()
    .required(REQUIRED_TEXT),
  email: yup.string().email(VALID_EMAIL_TEXT).required(REQUIRED_TEXT)
});

export type RegOrgSecondStep = {
  id?: string;
  fullName: string;
  'id_info[position]': string;
  'id_info[type]': string;
  'id_info[issuer]': string;
  'id_info[issueDate]': string | Moment;
  'id_info[expDate]': string | Moment;
  shareholderOf?: string;
  votingRights?: string;
  nationalCountry: string;
  city: string;
  state: string;
  street: string;
  nationalID: string;
  mobile: string;
  email: string;
};
