import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import { sendTwoStepCode, verifyTwoStepCode } from 'services/auth';
import classNames from 'classnames';
import styles from './VerifyLogin.module.scss';
import OtpInput from 'components/OtpInput';
import { useDispatch } from 'react-redux';
import { verifyUser } from 'redux/slices/authSlice';
import { DISABLED } from 'constants/input';

const LoginVerifySchema = yup.object().shape({
  otp: yup.string().required()
});

const VerifyLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid }
  } = useForm<{ otp: string }>({
    resolver: yupResolver(LoginVerifySchema),
    mode: 'onChange'
  });
  const handleSubmitOtp = async (data: any) => {
    if (data.otp) {
      const res = await verifyTwoStepCode(data.otp);
      if (res.data.return.status == 'verified') {
        dispatch(verifyUser(res.data.return.status == 'verified'));
        navigate('/dashboard');
      } else {
        setError('otp', { message: 'The OTP is incorrect' });
      }
    }
  };
  const resendCode = async () => {
    try {
      await sendTwoStepCode();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="text-[23px] font-black pb-8">Log In</h2>
      <p
        className={classNames(
          'text-secondary font-bold text-center',
          styles.verifyText
        )}
      >
        Please check your email for the OTP and enter it below to continue
      </p>
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(handleSubmitOtp)}
      >
        <Controller
          control={control}
          name="otp"
          render={({ field: { onChange }, fieldState }) => {
            return (
              <OtpInput
                wrapperClass="m-auto mt-15"
                label="Enter OTP"
                placeholder="123456"
                onChange={onChange}
                error={fieldState.error?.message}
                onButtonClick={resendCode}
                defaultStatus={DISABLED}
              />
            );
          }}
        />
        <Button
          type="default"
          text="Next"
          color="light-green"
          size="sm"
          className="mt-40"
          submit
          disabled={!isValid}
        />
        <span className="text-secondary text-xs font-bold mt-5">
          {`Don't have an account yet?`}
        </span>
        <span
          className="text-green underline text-xs font-bold mt-1 cursor-pointer"
          onClick={() => navigate('/auth/login')}
        >
          Click here to sign up!
        </span>
      </form>
    </div>
  );
};

export default VerifyLogin;
