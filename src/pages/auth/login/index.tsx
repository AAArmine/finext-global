import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from 'components/Button';
import {
  loginUser,
  sendTwoStepCode,
  setupTwoStep,
  getCompanyInfo
} from 'services/auth';
import {
  LoginForm,
  LoginSchema,
  LocationAuthErrorState
} from './typesAndSchemas';
import { useDispatch } from 'react-redux';
import { login, verifyUser } from 'redux/slices/authSlice';
import { authUserInfo } from 'redux/slices/authUserInfoSlice';
import connectionGif from 'assets/images/connection.gif';
import { checkEmailVerify } from 'services/auth';
import ControlledInput from 'components/ControlledInput';
import { NOTIFICATIONS } from 'constants/notifications';
import { toastMsg } from 'redux/slices/notificationsSlice';
import { ERROR, SUCCESS } from 'constants/notifications';
import styles from './Login.module.scss';

const Login = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ev = params.get('ev');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formError, setFormError] = useState('');
  const authError = (location.state as LocationAuthErrorState)?.authError;

  const formMethods = useForm<LoginForm>({
    resolver: yupResolver(LoginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const {
    handleSubmit,
    watch,
    formState: { isValid }
  } = formMethods;

  const checkEmailVerifyMsg = async () => {
    try {
      const response = await checkEmailVerify({ ev });
      dispatch(
        toastMsg({
          visibility: true,
          type: response.data.return ? SUCCESS : ERROR,
          text: response.data.return
            ? NOTIFICATIONS.EMAIL_VERIFICATION.SUCCESS
            : NOTIFICATIONS.EMAIL_VERIFICATION.ERROR
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    ev && checkEmailVerifyMsg();
  }, []);

  useEffect(() => {
    const subscription = watch(() => setFormError(''));
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (authError) {
      dispatch(
        toastMsg({
          visibility: true,
          type: ERROR,
          text: authError
        })
      );
    }
    return () => {
      dispatch(
        toastMsg({
          visibility: false,
          text: '',
          type: ''
        })
      );
    };
  }, []);

  const onSubmit = async (request: LoginForm) => {
    try {
      const { data } = await loginUser(request);
      if (data.success) {
        if (data.return.token) {
          dispatch(login(data.return.token));
          try {
            const companyData = await getCompanyInfo();
            if (companyData.data.return.msg) {
              dispatch(login(''));
              dispatch(verifyUser(false));
              return setFormError(companyData.data.return.msg);
            }
            if (!companyData.data.return[0]?.bdocs.length) {
              return navigate('/auth/register-company', {
                state: { email: request.username }
              });
            }
            const companyInfo = companyData.data?.return[0];
            if (companyData.data.return[0]?.officers.length < 2) {
              dispatch(
                authUserInfo({ ...companyInfo, userEmail: request.username })
              );
              return navigate('/auth/register-organization', {
                state: { email: request.username }
              });
            }
            if (!companyData.data.return[0]?.docs.length) {
              dispatch(
                authUserInfo({ ...companyInfo, userEmail: request.username })
              );
              return navigate('/auth/register-documents', {
                state: { email: request.username }
              });
            }
          } catch (err) {
            console.log(err);
          }
        }
        if (!data?.return?.twoStep?.enabled) {
          await setupTwoStep();
        }
        await sendTwoStepCode();
        navigate('/auth/verify');
      } else {
        if (data.return.msg) {
          setFormError(data.return.msg);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h2 className="text-[23px] font-black pb-8">Log In</h2>
      <img src={connectionGif} className={styles.gif} />
      <FormProvider {...formMethods}>
        <form
          className="flex flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <ControlledInput
            name="username"
            label="Email"
            placeholder="Enter email here"
            wrapperClass="m-auto pt-6"
            autoComplete="new-password"
          />
          <ControlledInput
            name="password"
            label="Password"
            placeholder="*************"
            wrapperClass="m-auto pt-6"
            type="password"
            autoComplete="new-password"
          />
          <span className="text-error mt-3">{formError}</span>
          <span
            className="text-green underline text-xs font-bold mt-[17px] cursor-pointer"
            onClick={() => navigate('/auth/email-submit')}
          >
            Forget password?
          </span>
          <Button
            type="default"
            text="Next"
            color="light-green"
            size="sm"
            className="mt-8"
            submit
            disabled={!isValid}
          />
          <span className="text-secondary text-xs font-bold mt-5">
            {`Don't have an account yet?`}
          </span>
          <span
            className="text-green underline text-xs font-bold mt-1 cursor-pointer"
            onClick={() => navigate('/auth/register-user')}
          >
            Click here to sign up!
          </span>
        </form>
      </FormProvider>
    </>
  );
};

export default Login;
