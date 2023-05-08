import { useState, useEffect } from 'react';
import UserRegVerify from 'assets/images/UserRegVerify';
import Button from 'components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocationState } from 'types/general';
import { CONTENT, DISABLED, RESEND } from 'constants/input';
import { sendEmailVerify } from 'services/auth';

const VerifyRegisterUser = () => {
  const [timer, setTimer] = useState<number>(60);
  const [status, setStatus] = useState<keyof typeof CONTENT>(RESEND);
  const navigate = useNavigate();
  const location = useLocation();
  const emailSubmitted = (location.state as LocationState).email;

  const handleResendUrl = async () => {
    try {
      await sendEmailVerify({ email: emailSubmitted });
    } catch (err) {
      console.log(err);
    }
    setStatus(DISABLED);
  };
  useEffect(() => {
    if (!location.state) {
      navigate('/auth/login');
    }
  }, []);
  useEffect(() => {
    if (status == DISABLED) {
      setTimer(60);
      const dateUpdate = setInterval(
        () =>
          setTimer((prev) => {
            if (prev == 1) {
              clearInterval(dateUpdate);
              setStatus(RESEND);
            }
            return prev - 1;
          }),
        1000
      );
      return () => clearInterval(dateUpdate);
    }
  }, [status]);
  const statusDisabled = status === DISABLED;
  return (
    <>
      <h2 className="text-[23px] font-black pb-6">Please verify your email</h2>
      <p className="text-sm font-bold m-auto w-3/5">{`You're almost there. We've sent a verification email to ${emailSubmitted}.
Click on the link in the email to activate your account.`}</p>
      <p className="pt-8 text-sm m-auto w-3/5">{` If you have not received the verification email, please check your "Spam" folder. You can also click the Resend button below to have another email sent to you.`}</p>
      <div className="mt-10 mb-12 flex justify-center">
        <UserRegVerify />
      </div>
      <Button
        type="default"
        color="light-green"
        text="Resend URL"
        className="m-auto mt-4"
        size="sm"
        onClick={handleResendUrl}
        disabled={statusDisabled}
      />
      {statusDisabled && (
        <div className="text-[10px] mt-2">
          Resend OTP<span className="text-[#E76868]"> in 0:{timer}</span>
        </div>
      )}
      <p className="text-xs font-bold  mt-6">
        {`Don't hesitate to contact us for any further assistance`}
        <span
          className="block text-green cursor-pointer"
          onClick={() => (window.location.href = 'mailto:support@finext.com')}
        >
          support@finext.com
        </span>
      </p>
    </>
  );
};

export default VerifyRegisterUser;
