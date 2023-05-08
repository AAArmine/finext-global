import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { ControlledRadioGroupPropsType } from './types';
import { Radio } from 'antd';
import './ControlledRadioGroup.module.scss';

const ControlledRadioGroup: FC<ControlledRadioGroupPropsType> = ({
  name,
  defaultValue,
  options,
  ...rest
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <Radio.Group
          onChange={onChange}
          value={value}
          className="h-6 relative left-[-50px] font-bold text-xs top-2"
          buttonStyle="solid"
          {...rest}
        >
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      )}
    />
  );
};

export default ControlledRadioGroup;
