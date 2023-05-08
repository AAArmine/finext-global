import {
  DeleteOfficer,
  RegOrgSecondStep
} from 'pages/auth/registerOrganization/typesAndSchemas';
import {
  RegCompanyFirstStep,
  OrgId
} from 'pages/auth/registerCompany/typesAndSchemas';
import { RegThirdStep } from 'pages/auth/registerDocuments/typesAndSchemas';
import api from './api';
import { LoginRequest } from 'pages/auth/login/typesAndSchemas';
import { EmailValue, EvToken, NewPassword } from 'pages/resetPassword/types';
import { UserDataRequest } from 'pages/auth/registerUser/typesAndSchemas';

export const loginUser = (request: LoginRequest) => {
  return api.post('/login', request, {
    headers: {
      realm: 'phone',
      udid: 12412412412412
    }
  });
};

export const setupTwoStep = () => {
  const body = { flow: 'register', method: 'email' };
  return api.post('/twostep/setup', body);
};

export const sendTwoStepCode = () => {
  const body = { flow: 'register' };
  return api.post('/twostep/send', body);
};

export const verifyTwoStepCode = (code: string) => {
  const request = { code, flow: 'register', state: 'email' };
  return api.post('/twostep/verify', request);
};

export const sendEmail = (request: EmailValue) => {
  return api.post('/forgotpw', request);
};

export const createNewPassword = (request: NewPassword) => {
  return api.post('/forgotpw', request);
};

export const registerUser = (request: UserDataRequest) => {
  return api.post('/register', request);
};

export const sendEmailVerify = (request: EmailValue) => {
  return api.post('/emailverification', request);
};

export const checkEmailVerify = (request: EvToken) => {
  return api.post('/emailverification', request);
};

export const userInfo = () => {
  return api.get('/getinfo/userinfo');
};

export const getCompanyInfo = async () => {
  return await api.get(
    '/cst/org/list?modules=officers,orgStockInfo,bdocs,docs'
  );
};

export const createCompany = (request: RegCompanyFirstStep) => {
  return api.post('/cst/org/set/?modules=officers,bdocs,docs', request);
};

export const uploadDocuments = (request: RegThirdStep) => {
  return api.post('/cst/org/set/?modules=officers,bdocs,docs', request, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getSingleOfficer = (idOrg: number, id: string) => {
  return api.get(`/cst/officer/get/${idOrg}/${id}`);
};

export const getOfficerList = (request: OrgId) => {
  return api.post(`/cst/officer/list/?modules=teamMember`, request);
};

export const setOfficer = (
  userId: number | undefined,
  request: RegOrgSecondStep
) => {
  return api.post(`cst/officer/set/${userId}?modules=teamMember`, request);
};

export const deleteOfficer = (userId: number, request: DeleteOfficer) => {
  return api.post(`cst/officer/set/${userId}?modules=teamMember`, request);
};
