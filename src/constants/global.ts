/* GENERAL VALIDATIONS */
const REQUIRED_TEXT = 'This field is required';
const URL_TEXT = 'This field is not a valid URL';
const VALID_EMAIL_TEXT = 'Enter a valid email';

const BOOL_SELECT_DATA = [
  {
    value: 1,
    label: 'Yes'
  },
  {
    value: 0,
    label: 'No'
  }
];

const SUPPORTED_FORMAT = [
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png',
  'application/pdf'
];

const SUPPORTED_SIZE = 500000;

export {
  REQUIRED_TEXT,
  URL_TEXT,
  VALID_EMAIL_TEXT,
  BOOL_SELECT_DATA,
  SUPPORTED_FORMAT,
  SUPPORTED_SIZE
};

export const idTypes = [
  { value: 'identity_card', label: 'ID' },
  { value: 'passport', label: 'Passport' }
];

export const userRoles = [
  {
    value: 'User',
    label: 'User'
  },
  {
    value: 'Authorizer',
    label: 'Authorizer'
  }
];
