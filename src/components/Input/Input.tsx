import { forwardRef } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';
import { Typography } from 'antd';
import { InputProps } from './types';

const { Text } = Typography;

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      label = '',
      wrapperClass,
      inputClass,
      showErrorText = true,
      placeholder,
      isValid,
      withLabelMargin = false,
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={classNames(wrapperClass, styles.container)}>
        <label
          className={classNames(
            {
              'mt-[21px]': !label && withLabelMargin
            },
            'text-secondary',
            'text-left'
          )}
        >
          {label}
        </label>
        <input
          placeholder={placeholder}
          {...rest}
          className={classNames(
            {
              'border-error': error || isValid
            },
            inputClass
          )}
          ref={ref}
          disabled={disabled}
          {...(disabled && {
            onChange: () => {
              console.log('disabled');
            },
            value: rest.value
          })}
        />
        {error && showErrorText && (
          <Text className="text-error text-left">{`${error}`}</Text>
        )}
      </div>
    );
  }
);

export default Input;
