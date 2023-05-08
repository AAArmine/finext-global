import { Typography } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuCardPropsType } from './types';
import styles from './Dashboard.module.scss';

const MenuCard: React.FC<MenuCardPropsType> = ({
  title,
  Icon,
  ActiveIcon = Icon,
  notification,
  hasSubMenu,
  showSubMenu,
  index,
  isActive,
  link
}) => {
  const { Text } = Typography;
  const navigate = useNavigate();
  const openSubMenu = () => {
    showSubMenu && showSubMenu(index);
  };
  return (
    <div
      className={classNames({
        [styles.cardContainer]: true,
        'px-10 text-center relative cursor-pointer': true,
        [styles.activeCardContainer]: isActive
      })}
      onClick={() => (hasSubMenu ? openSubMenu() : navigate(link))}
    >
      {notification && (
        <span
          className={classNames({
            'w-5 h-5 absolute rounded-full right-2.5 top-3.5 px-px	text-[10px] leading-5':
              true,
            'bg-orange text-white': !isActive,
            'bg-white text-orange': isActive
          })}
        >
          {notification}
        </span>
      )}
      {isActive ? ActiveIcon : Icon}
      <Text
        className={classNames({
          'font-bold text-base mt-3 leading-5': true,
          'text-secondary': !isActive,
          'text-white': isActive
        })}
      >
        {title}
      </Text>
      {hasSubMenu && (
        <span
          className={classNames({
            'icon-arrow-down mt-2': true,
            'text-green': !isActive,
            'text-white': isActive
          })}
        />
      )}
    </div>
  );
};

export default MenuCard;
