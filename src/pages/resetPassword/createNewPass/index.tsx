import { useEffect } from 'react';
import Button from 'components/Button';
import PasswordValidCheck from 'components/PasswordValidCheck';
import { FormValues } from '../types';
import { useForm, FieldValues, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { REQUIRED_TEXT } from 'constants/global';
import { useNavigate, useLocation } from 'react-router-dom';
import { createNewPassword } from 'services/auth';
import PasswordMatch from 'components/PasswordMatch';

const passMatchSchema = yup.object().shape({
  pass: yup
    .string()
    .required(REQUIRED_TEXT)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      'Invalid password'
    ),
  confirmPass: yup
    .string()
    .required(REQUIRED_TEXT)
    .oneOf([yup.ref('pass')], 'Password does not match')
});
const ResetPasswordSubmit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const fp = params.get('fp');

  const handlePasswordSubmit = async (data: FieldValues) => {
    const request = { fp, newpw: data.pass };
    try {
      const response = await createNewPassword(request);
      if (response.data.success) {
        navigate('/auth/success');
      } else {
        navigate('/auth/email-submit', {
          state: { expiredUrl: true }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const formMethods = useForm<FormValues>({
    resolver: yupResolver(passMatchSchema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const {
    handleSubmit,
    watch,
    formState: { isValid }
  } = formMethods;
  const inputValues = watch();
  const password = !inputValues.pass ? '' : inputValues.pass;
  useEffect(() => {
    if (!fp) {
      navigate('/auth/login');
    }
  }, []);
  return (
    <>
      <h2 className="text-[23px] font-black pb-24">Reset Password</h2>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(handlePasswordSubmit)}>
          <PasswordMatch />
          <PasswordValidCheck password={password} />
          <div className="flex justify-center py-[96px]">
            <Button
              type="default"
              text="Save"
              color="light-green"
              size="sm"
              disabled={!isValid}
              submit
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default ResetPasswordSubmit;
