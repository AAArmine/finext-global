import { SelectValueType } from 'types/general';

export interface ControlledSelectTypes {
  label?: string;
  placeholder?: string;
  name: string;
  options: SelectValueType[];
  [key: string]: any;
}
