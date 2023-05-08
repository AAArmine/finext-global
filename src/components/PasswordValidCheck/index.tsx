import { useState } from 'react';
import classNames from 'classnames';
import { PasswordValidCheckPropsType, StepType } from './types';
import { passValidCheck } from 'helpers/passwordValidCheck';
import useDidMountEffect from 'hooks/useDidMount';

const PasswordValidCheck: React.FC<PasswordValidCheckPropsType> = ({
  password
}) => {
  const [step, setStep] = useState<StepType>({
    lowercase: false,
    uppercase: false,
    specialCharacter: false,
    number: false,
    moreThanSix: false
  });

  const checkParameters = (step: StepType) => {
    return [
      { name: '6+ characters', valid: step.moreThanSix },
      { name: 'lowercase', valid: step.lowercase },
      { name: 'uppercase', valid: step.uppercase },
      { name: 'special character', valid: step.specialCharacter },
      { name: 'number', valid: step.number }
    ];
  };
  useDidMountEffect(() => {
    setStep(passValidCheck(password));
  }, [password]);

  return (
    <div className="flex justify-center mt-8 flex-wrap w-[310px] m-auto text-secondary">
      {checkParameters(step).map((parameter) => (
        <div
          className={classNames(
            { 'text-green': parameter.valid },
            'p-2',
            'text-[10px]'
          )}
          key={parameter.name}
        >
          <span className="icon-Fill-2 font-extrabold mr-1"></span>
          {parameter.name}
        </div>
      ))}
    </div>
  );
};

export default PasswordValidCheck;
