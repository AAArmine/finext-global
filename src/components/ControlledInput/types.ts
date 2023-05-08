export interface ControlledInputProps {
  label?: string;
  placeholder?: string;
  name: string;
  inputType?: 'default' | 'date';
  [key: string]: any;
  autoComplete?: string;
}
