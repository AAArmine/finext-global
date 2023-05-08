import React from 'react';
import { InputTypeProps } from './types';
import styles from './InputDisabled.module.scss';
import classNames from 'classnames';

const InputDisabled: React.FC<InputTypeProps> = ({
  label,
  wrapperClass,
  labelClassName,
  placeholder,
  value,
  name
}) => {
  return (
    <div className={classNames(wrapperClass, styles.container)}>
      {label && <label className={labelClassName}>{label}</label>}
      <input name={name} placeholder={placeholder} disabled value={value} />
    </div>
  );
};
export default InputDisabled;
