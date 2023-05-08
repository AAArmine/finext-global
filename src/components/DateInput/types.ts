import { Moment } from 'moment';
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

export interface DateInputPropsTypes {
  label?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  wrapperClass?: string;
  className?: string;
  placeholder?: string;
  isValid?: boolean /* for changing border color */;
  withLabelMargin?: boolean;
  onChange: () => void;
  value: Moment | null;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
