import { InputHTMLAttributes } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  wrapperClass?: string;
  inputClass?: string;
  className?: string;
  placeholder?: string;
  isValid?: boolean;
  disabled?: boolean;
  showErrorText?: boolean;
  withLabelMargin?: boolean;
  value?: string;
  autoComplete?: string;
}
