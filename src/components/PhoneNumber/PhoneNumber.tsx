import { Typography } from 'antd';
import classNames from 'classnames';
import Input from 'components/Input';
import Select from 'components/Select';
import { FC } from 'react';
import { PhoneTypeProps } from './types';
import { SelectValueType } from 'types/general';
import { isInteger } from 'utils';
import { PHONE_CODES } from 'constants/phoneCodes';

const { Text } = Typography;

const PhoneNumber: FC<PhoneTypeProps> = ({
  value = { code: 'us', number: '' },
  onChange,
  error,
  label = 'Phone Number',
  wrapperClass
}) => {
  const formatOptionLabel = ({ value, label }: SelectValueType<string>) => (
    <div className="flex">
      <img
        src={`https://flagcdn.com/w20/${value}.png`}
        alt=""
        className="max-w-[20px] max-h-[20px] rounded-full"
      />
      <div className="ml-1">{label}</div>
    </div>
  );

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isInteger(e.target.value) &&
      onChange({
        code: value?.code,
        number: e.target.value
      });
  };

  const handleCodeChange = ({ value: code }: { value: string }) => {
    onChange({
      code: code,
      number: value?.number
    });
  };

  return (
    <>
      <div
        className={classNames(
          wrapperClass,
          'flex justify-between w-[296px] flex-col'
        )}
      >
        <label className="font-bold text-sm leading-[22px] text-left">
          {label}
        </label>
        <div className="flex justify-between">
          <Select
            wrapperClass="w-[110px] text-sm"
            options={PHONE_CODES}
            placeholder="Code"
            formatOptionLabel={formatOptionLabel}
            value={PHONE_CODES.find((x) => x.value === value?.code)}
            onChange={handleCodeChange}
            isValid={error?.code?.message || error?.message}
          />
          <Input
            placeholder="Enter phone number"
            value={value?.number}
            onChange={handleNumberChange}
            wrapperClass="w-[176px]"
            isValid={error?.number?.message || error?.message}
            autoComplete="new-password"
          />
        </div>
        {error && (
          <Text
            className={classNames('text-error text-start', {
              'ml-[121px]': error && !error?.code?.message
            })}
          >
            {error?.message || error?.code?.message || error?.number?.message}
          </Text>
        )}
      </div>
    </>
  );
};

export default PhoneNumber;
