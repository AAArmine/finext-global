import React, { useState } from 'react';
import { DatePicker } from 'antd';
import styles from './Date.module.scss';
import classNames from 'classnames';
import { Typography } from 'antd';
import { DateInputPropsTypes } from './types';

const { Text } = Typography;

const DateInput: React.FC<DateInputPropsTypes> = ({
  error,
  label = '',
  wrapperClass,
  placeholder = 'Choose date',
  isValid,
  withLabelMargin = false,
  onChange,
  value,
  onBlur
}) => {
  const [showIcon, setShowIcon] = useState(true);

  return (
    <div
      onMouseEnter={() => value && setShowIcon(false)}
      onMouseLeave={() => setShowIcon(true)}
      className={classNames(wrapperClass, styles.container)}
    >
      <label
        className={classNames(
          {
            'mt-[21px]': !label && withLabelMargin
          },
          'text-secondary'
        )}
      >
        {label}
      </label>
      <DatePicker
        className={classNames(styles.datePicker, {
          'border-error': error || isValid
        })}
        onChange={onChange}
        value={value}
        allowClear={true}
        placeholder={placeholder}
        getPopupContainer={(triggerNode) =>
          triggerNode.parentElement || document.body
        }
        onBlur={onBlur}
        suffixIcon={
          showIcon && (
            <span
              className={classNames(
                styles.suffixIcon,
                'icon-calendar',
                'text-green',
                'text-2xl'
              )}
            ></span>
          )
        }
      />
      {error && <Text className="text-error">{`${error}`}</Text>}
    </div>
  );
};

export default DateInput;
