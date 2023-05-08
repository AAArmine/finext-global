import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { ButtonPropsType } from './types';
import styles from './Button.module.scss';

const Button: React.FC<ButtonPropsType> = ({
  size = 'md',
  type,
  text,
  color = 'white',
  iconObj,
  onClick,
  goTo,
  loading,
  children,
  className,
  textSize = 'text-base',
  submit = false,
  textColor,
  disabled,
  ...rest
}) => {
  const navigate = useNavigate();
  const doActionOrRedirect = () => {
    if (goTo) {
      navigate(goTo);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={classNames([
        styles.btnCustom,
        styles[size],
        styles[type],
        disabled && styles.disabled,
        color && styles[color],
        iconObj ? 'justify-between' : 'justify-center',
        loading && styles.loading,
        className
      ])}
      type={submit ? 'submit' : 'button'}
      style={rest.customStyles}
      onClick={doActionOrRedirect}
    >
      {(iconObj?.position === 'left' || loading) && (
        <i
          className={classNames(
            loading
              ? `${styles.spiner} fas fa-spinner fa-pulse text-base`
              : iconObj?.icon,
            'mr-[6px]'
          )}
        />
      )}
      {text ? (
        <span className={classNames(textSize, textColor)}>{text}</span>
      ) : (
        children
      )}
      {iconObj?.position === 'right' && (
        <i className={classNames(iconObj.icon, 'ml-[6px] text-base')} />
      )}
    </button>
  );
};

export default Button;
