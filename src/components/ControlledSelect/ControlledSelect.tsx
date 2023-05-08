import Select from 'components/Select';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { ControlledSelectTypes } from './types';
import { SelectValueType } from 'types/general';

const ControlledSelect: FC<ControlledSelectTypes> = ({
  control,
  name,
  options,
  setValue,
  label = '',
  placeholder = '',
  ...rest
}) => {
  const setValueAndTrigger = (
    key: string,
    newValue: SelectValueType,
    defaultValue: SelectValueType | undefined
  ) => {
    setValue(key, defaultValue === newValue ? null : newValue, {
      shouldValidate: true
    });
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value }, fieldState: { error } }) => {
        return (
          <Select
            options={options}
            label={label}
            placeholder={placeholder}
            error={error?.message}
            value={value}
            onChange={(newValue) => setValueAndTrigger(name, newValue, value)}
            {...rest}
          />
        );
      }}
    />
  );
};

export default ControlledSelect;
