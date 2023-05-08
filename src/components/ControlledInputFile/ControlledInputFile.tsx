import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputFile from 'components/InputFile';
import { ControlledInputFilePropsType } from './types';

const ControlledInputFile: FC<ControlledInputFilePropsType> = ({
  name,
  label = '',
  onUploadChange,
  ...rest
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ fieldState: { error } }) => {
        return (
          <InputFile
            label={label}
            error={error?.message}
            onUploadChange={onUploadChange}
            {...rest}
          />
        );
      }}
    />
  );
};

export default ControlledInputFile;
