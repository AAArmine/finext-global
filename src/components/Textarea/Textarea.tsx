import { Input, Typography } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { TextareaPropsType } from './types';
import styles from './Textarea.module.scss';

const { TextArea: AntTextArea } = Input;
const { Text } = Typography;

const Textarea: FC<TextareaPropsType> = ({
  label,
  onChange,
  onBlur,
  error,
  placeholder,
  defaultValue,
  wrapperClass
}) => {
  return (
    <div className={classNames(wrapperClass, styles.container)}>
      <label
        className={classNames(
          {
            'text-secondary': true
          },
          'font-bold text-sm'
        )}
      >
        {label}
      </label>
      <AntTextArea
        placeholder={placeholder}
        className={classNames({ 'border-error': !!error }, 'h-24 w-')}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
      />
      {error && <Text className="text-error inline-block">{`${error}`}</Text>}
    </div>
  );
};

export default Textarea;
