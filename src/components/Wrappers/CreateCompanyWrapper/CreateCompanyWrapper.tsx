import { FC } from 'react';
import classNames from 'classnames';
import styles from './CreateCompanyWrapper.module.scss';
import Title from 'components/Title';
import { Typography } from 'antd';
import { CreateCompanyWrapperPropsType } from './types';

const { Text } = Typography;

const CreateCompanyWrapper: FC<CreateCompanyWrapperPropsType> = ({
  children,
  className,
  title,
  requiredFields = false,
  savedFields = true,
  step,
  description,
  left
}) => {
  return (
    <div className={classNames([styles.registerContainer, className])}>
      <div className="text-left py-6 px-7 absolute top-[-70px] left-0 text-sm">
        {step}
        {requiredFields && (
          <Text className="text-green text-xs font-bold ml-6 my-2.5 inline">
            * All fields are required
          </Text>
        )}
      </div>
      {title && <Title sizeClass="text-2xl" text={title} className="mb-2.5" />}
      {description && (
        <Text
          className={classNames(
            { 'text-left': left },
            'pt-1 text-secondary text-sm font-bold whitespace-pre-line'
          )}
        >
          {description}
        </Text>
      )}
      {savedFields && (
        <Text className="text-green text-sm font-bold my-2.5">
          All the filled data will be automatically saved
        </Text>
      )}
      {children}
    </div>
  );
};

export default CreateCompanyWrapper;
