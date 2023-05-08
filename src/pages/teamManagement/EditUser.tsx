import React from 'react';
import { useFormContext } from 'react-hook-form';
import ControlledSelect from 'components/ControlledSelect';

const EditUser = () => {
  const { control, setValue } = useFormContext();
  const userRoleOptions = [
    { label: 'User', value: 'user' },
    { label: 'Authoriser', value: 'Authoriser' }
  ];
  return (
    <ControlledSelect
      control={control}
      name="id"
      label="Role"
      placeholder="Choose user type"
      options={userRoleOptions}
      wrapperClass="w-2/3 m-auto"
      setValue={setValue}
    />
  );
};

export default EditUser;
