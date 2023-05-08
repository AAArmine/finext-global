import React from 'react';
import styles from './Checkbox.module.scss';
import { CheckboxPropsType } from './types';

const Checkbox: React.FC<CheckboxPropsType> = ({ id, value, onChange }) => {
  return (
    <>
      <input
        className={styles.checkbox}
        id={id}
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      <label htmlFor={id} />
    </>
  );
};

export default Checkbox;
