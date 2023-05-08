import Button from 'components/Button';
import { VALID_EMAIL_TEXT, REQUIRED_TEXT } from '../../../constants/global';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { EmailValue } from '../types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { sendEmail } from 'services/auth';
import { LocationExpiredState } from '../types';
import ControlledInput from 'components/ControlledInput';
import classNames from 'classnames';

const EmailSubmit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ifUrlExpired = !location.state
    ? false
    : (location.state as LocationExpiredState).expiredUrl;

  const emailSchema = yup.object().shape({
    email: yup.string().email(VALID_EMAIL_TEXT).required(REQUIRED_TEXT)
  });

  const onSubmitEmail = async (request: EmailValue) => {
    try {
      const { data } = await sendEmail(request);
      if (data.debug?.debug_data) {
        navigate('/auth/email-sent', {
          state: { email: request.email }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const formMethods = useForm<EmailValue>({
    resolver: yupResolver(emailSchema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const {
    handleSubmit,
    formState: { isValid }
  } = formMethods;

  return (
    <>
      <h2
        className={classNames(
          { 'pb-10': ifUrlExpired },
          'pb-24 text-[23px] font-black'
        )}
      >
        Reset Password
      </h2>
      {ifUrlExpired && (
        <p className="text-sm font-bold m-auto w-1/2 pb-4">
          The password reset URL has been expired. To request a new URL, please
          enter your email address below
        </p>
      )}
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmitEmail)}>
          <ControlledInput
            name="email"
            label="Business Email"
            placeholder="Enter your business email"
            wrapperClass="m-auto pt-6"
          />
          <div
            className="text-green underline text-xs font-bold leading-5 mt-7 cursor-pointer m-auto"
            onClick={() => navigate('/auth/login')}
          >
            Back to login
          </div>
          <div className="flex justify-center pt-24 pb-8">
            <Button
              type="default"
              text="Next"
              color="light-green"
              size="sm"
              submit
              disabled={!isValid}
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default EmailSubmit;
