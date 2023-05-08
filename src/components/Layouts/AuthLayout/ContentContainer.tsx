import React from 'react';
import styles from './AuthLayout.module.scss';
import classNames from 'classnames';

type contentContainerPropsType = {
  children?: JSX.Element[] | JSX.Element;
};

const ContentContainer: React.FC<contentContainerPropsType> = ({
  children
}) => {
  return (
    <div
      className={classNames(
        styles.contentContainer,
        'flex w-[902px] m-auto rounded-2xl relative'
      )}
    >
      <div className="text-center w-full">{children}</div>
    </div>
  );
};

export default ContentContainer;
