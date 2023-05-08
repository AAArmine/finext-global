import DateInput from 'components/DateInput';
import Input from 'components/Input';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { ControlledInputProps } from './types';

const inputTypes = {
  default: Input,
  date: DateInput
};
const ControlledInput: FC<ControlledInputProps> = ({
  name,
  label = '',
  placeholder = '',
  inputType = 'default',
  ...rest
}) => {
  const Component = inputTypes[inputType];
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error }
      }) => {
        return (
          <Component
            label={label}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            error={error?.message}
            {...rest}
          />
        );
      }}
    />
  );
};

export default ControlledInput;
