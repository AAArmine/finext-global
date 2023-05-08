import { useState } from 'react';
import Title from 'components/Title';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { FormValues, regUserSchema } from './typesAndSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/Button';
import PhoneNumber from 'components/PhoneNumber';
import AuthFooter from 'components/AuthFooter';
import { PhoneValueType } from 'types/general';
import PasswordMatch from 'components/PasswordMatch';
import PasswordValidCheck from 'components/PasswordValidCheck';
import { registerUser } from 'services/auth';
import { useNavigate } from 'react-router-dom';
import ControlledInput from 'components/ControlledInput';
import ControlledRadioGroup from 'components/ControlledRadioGroup';
import { PHONE_CODES } from 'constants/phoneCodes';

const RegisterUser = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const onSubmitRegUser = async (data: FormValues) => {
    const phoneCode = PHONE_CODES.filter((obj) => {
      if (data.phoneNumber.code === obj.value) return obj;
    })[0].label;

    const phoneNumber = data.phoneNumber.number ?? '';
    const request = {
      username: data.userName,
      password: data.pass,
      cstType: data.type,
      mobile: phoneCode.concat(phoneNumber)
    };
    try {
      const response = await registerUser(request);
      if (response.data.success) {
        navigate('/auth/register-user-verify', {
          state: { email: request.username }
        });
      } else {
        if (response.data.msg) {
          setErrorMsg(response.data.msg.replace(/(?:\(.*?\))/g, ''));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formMethods = useForm<FormValues>({
    resolver: yupResolver(regUserSchema),
    mode: 'onChange'
  });
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { isValid }
  } = formMethods;
  const inputValues = watch();
  const password = !inputValues.pass ? '' : inputValues.pass;
  const radioBtnOptions = [
    { value: 'cstClass', label: 'Personal' },
    { value: 'orgClass', label: 'Business' }
  ];
  return (
    <>
      <Title sizeClass="text-2xl" text="Registration" className="mb-10" />
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmitRegUser)} autoComplete="off">
          <ControlledRadioGroup
            name="type"
            defaultValue="orgClass"
            options={radioBtnOptions}
          />
          <ControlledInput
            name="userName"
            label="Email Address"
            placeholder="Enter email here"
            wrapperClass="m-auto pt-6"
            autoComplete="new-password"
          />
          <div className="flex justify-center mt-5">
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { value }, fieldState: { error } }) => (
                <PhoneNumber
                  value={value}
                  onChange={(val: PhoneValueType) =>
                    setValue('phoneNumber', val, { shouldValidate: true })
                  }
                  error={error}
                />
              )}
            />
          </div>
          <PasswordMatch />
          <PasswordValidCheck password={password} />
          <span className="text-error mt-3">{errorMsg}</span>
          <div className="flex justify-center pt-6">
            <Button
              type="default"
              text="Next"
              color="light-green"
              size="sm"
              submit
              disabled={!isValid}
            />
          </div>
          <span className="text-secondary text-xs font-bold mt-6 block">
            Already have an account?
          </span>
          <span
            className="text-green underline text-xs font-bold mt-1 cursor-pointer"
            onClick={() => navigate('/auth/login')}
          >
            Click here to log in!
          </span>
        </form>
      </FormProvider>
      <AuthFooter />
    </>
  );
};

export default RegisterUser;
