import { PhoneValueType } from 'types/general';

export type PhoneTypeProps = {
  value: PhoneValueType;
  onChange: (value: PhoneValueType) => void;
  error?: any;
  label?: string;
  wrapperClass?: string;
};
