import { SelectValueType } from 'types/general';
import { REQUIRED_TEXT } from 'constants/global';
import * as yup from 'yup';

export const RegisterFirstStepSchema = yup.object().shape({
  personalInfo: yup.object().shape({
    fullName: yup
      .string()
      .matches(/^[A-Za-z -]*$/, 'Must be only letters')
      .required(REQUIRED_TEXT),
    position: yup
      .string()
      .matches(/^[A-Za-z -]*$/, 'Must be only letters')
      .required(REQUIRED_TEXT)
  }),
  companyInfo: yup.object().shape({
    fullName: yup
      .string()
      .matches(/^[A-Za-z -]*$/, 'Must be only letters')
      .required(REQUIRED_TEXT),
    nationalID: yup
      .string()
      .matches(/^[A-Za-z0-9 -]*$/, 'Must be only numbers and letters')
      .required(REQUIRED_TEXT),
    nationalCountry: yup.object().required(REQUIRED_TEXT),
    webSite: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
      )
      .required(REQUIRED_TEXT),
    country: yup.object().required(REQUIRED_TEXT),
    city: yup
      .string()
      .matches(/^[A-Za-z -]*$/, 'Must be only letters')
      .required(REQUIRED_TEXT),
    street: yup.string().required(REQUIRED_TEXT),
    zip: yup
      .string()
      .matches(/^[A-Za-z0-9 -]*$/, 'Must be only numbers and letters')
      .required(REQUIRED_TEXT),
    orgStockInfo: yup.object().shape({
      isStockListed: yup.object().required(REQUIRED_TEXT),
      acceptCards: yup.object().required(REQUIRED_TEXT),
      stockName: yup.string().when('isStockListed', {
        is: (val: SelectValueType) => val?.value,
        then: yup.string().required(REQUIRED_TEXT),
        otherwise: yup.string().notRequired()
      }),
      parentOrgName: yup.string().when('isStockListed', {
        is: (val: SelectValueType) => val?.value,
        then: yup.string().required(REQUIRED_TEXT),
        otherwise: yup.string().notRequired()
      }),
      parentOrgID: yup.string().when('isStockListed', {
        is: (val: SelectValueType) => val?.value,
        then: yup.string().required(REQUIRED_TEXT),
        otherwise: yup.string().notRequired()
      }),
      mcc: yup.string().when('acceptCards', {
        is: (val: SelectValueType) => val?.value,
        then: yup
          .string()
          .matches(/^[0-9]+$/, 'Must be only digits')
          .required(REQUIRED_TEXT),
        otherwise: yup.string().notRequired()
      })
    })
  })
});
export interface RegisterFirstStepForm {
  personalInfo: {
    fullName: string;
    position: string;
  };
  companyInfo: CreateCompanyRequest;
}
export type CreateCompanyRequest = {
  fullName: string;
  nationalID: string;
  nationalCountry: SelectValueType;
  webSite: string;
  country: SelectValueType;
  city: string;
  street: string;
  zip: string;
  orgStockInfo: {
    isStockListed: SelectValueType;
    acceptCards: SelectValueType;
    stockName?: string;
    parentOrgName?: string;
    parentOrgID?: string;
    mcc?: number;
  };
};
export type RegCompanyFirstStep = {
  id?: string;
  fullName: string;
  nationalID: string;
  nationalCountry: string;
  webSite: string;
  country: string;
  city: string;
  street: string;
  zip: string;
  'orgStockInfo[isStockListed]': 1 | 0;
  'orgStockInfo[acceptCards]': 1 | 0;
  'orgStockInfo[stockName]'?: string;
  'orgStockInfo[parentOrgName]'?: string;
  'orgStockInfo[parentOrgID]'?: string;
  'orgStockInfo[mcc]'?: number;
};

export type OrgId = {
  cstID: number | undefined;
};
