import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { ControlledTextareaProps } from './types';
import Textarea from 'components/Textarea';

const ControlledTextarea: FC<ControlledTextareaProps> = ({
  control,
  name,
  options,
  setValue,
  label = '',
  placeholder = '',
  ...rest
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error }
      }) => {
        return (
          <Textarea
            label={label}
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

export default ControlledTextarea;
