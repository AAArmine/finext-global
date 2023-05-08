import { useState, useEffect } from 'react';
import SentEmail from 'assets/images/SentEmail';
import Button from 'components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendEmail } from 'services/auth';
import { LocationState } from 'types/general';
import { CONTENT, DISABLED, RESEND } from 'constants/input';

const EmailSent = () => {
  const [timer, setTimer] = useState<number>(60);
  const [status, setStatus] = useState<keyof typeof CONTENT>(RESEND);
  const navigate = useNavigate();
  const location = useLocation();
  const emailSubmitted = (location.state as LocationState).email;

  const handleResendUrl = async () => {
    try {
      await sendEmail({
        email: emailSubmitted
      });
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
  return (
    <>
      <h2 className="text-[23px] font-black pb-6">Reset Password</h2>
      <p className="text-sm font-bold m-auto w-2/5">{`We've sent the reset URL to your ${emailSubmitted} email address.
    If you haven't received it click on "Resend URL"`}</p>
      <div className="mt-10 mb-12 flex justify-center">
        <SentEmail />
      </div>
      <Button
        type="default"
        color="light-green"
        text="Resend URL"
        className="m-auto mt-4"
        size="sm"
        onClick={handleResendUrl}
        disabled={status === DISABLED}
      />
      {status === DISABLED && (
        <div className="text-[10px] mt-2">
          Resend OTP<span className="text-[#E76868]"> in 0:{timer}</span>
        </div>
      )}
      <div
        className="text-green underline text-xs font-bold leading-5 mt-7 cursor-pointer m-auto"
        onClick={() => navigate('/auth/login')}
      >
        Back to login
      </div>
    </>
  );
};

export default EmailSent;
