import { CONTENT } from 'constants/input';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export type OtpInputPropsType = {
  wrapperClass?: string;
  label: string;
  placeholder: string;
  defaultStatus?: keyof typeof CONTENT;
  onChange?: (arg?: any) => void;
  onButtonClick: () => void;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
};
