import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { SelectValueType } from 'types/general';

export interface SelectTypes {
  options: SelectValueType[];
  label?: string;
  placeholder?: string;
  onChange?: (val: any) => void;
  onBlur?: (val: any) => void;
  isClearable?: boolean;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  isMulti?: boolean;
  value?: any;
  isSearchable?: boolean;
  formatOptionLabel?: (option: any) => JSX.Element;
  wrapperClass?: string;
  isValid?: boolean;
  withLabelMargin?: boolean;
  greenBorder?: boolean;
}
