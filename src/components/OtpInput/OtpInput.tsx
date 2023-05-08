import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Button from 'components/Button';
import { OtpInputPropsType } from './types';
import { CONTENT, PENDING, DISABLED, RESEND } from 'constants/input';
import styles from './OtpInput.module.scss';

const OtpInput: React.FC<OtpInputPropsType> = ({
  wrapperClass,
  label,
  placeholder,
  onChange,
  error,
  defaultStatus = PENDING,
  onButtonClick,
  ...rest
}) => {
  const [status, setStatus] = useState<keyof typeof CONTENT>(defaultStatus);
  const [timer, setTimer] = useState<number>(60);
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

  const handleClick = () => {
    if (status !== DISABLED) {
      setStatus(DISABLED);
    }
    onButtonClick();
  };
  return (
    <div className={styles.otpInputContainer}>
      <Input
        label={label}
        wrapperClass={wrapperClass}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
        error={error}
      />
      <div className={styles.verifyBtn}>
        <Button
          type="default"
          text={CONTENT[status]}
          color="light-green"
          size="xs"
          onClick={handleClick}
          disabled={status == DISABLED}
        />
      </div>
      {status == DISABLED && (
        <div className="text-[10px] relative right-[100px]">
          Resend OTP<span className="text-[#E76868]"> in 0:{timer}</span>
        </div>
      )}
    </div>
  );
};

export default OtpInput;
