export const NOTIFICATIONS = {
  EMAIL_VERIFICATION: <EMAILVERIFICATION>{
    ERROR: 'Email verification failed.',
    SUCCESS: 'Your email address has been successfully verified.'
  },
  AUTH_ERROR: 'The authorization session is expired. Please Log In again.'
};
type EMAILVERIFICATION = {
  ERROR: string;
  SUCCESS: string;
};

export const ERROR = 'error';
export const SUCCESS = 'success';
