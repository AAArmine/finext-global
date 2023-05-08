import React, { useState } from 'react';
import { Dropdown, Typography } from 'antd';
import logo from 'assets/images/logo.svg';
import Button from '../../Button';
import styles from './UserLayout.module.scss';
import { burgerMenu } from './constants';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { Text } = Typography;
  const [isOpen, setIsOpen] = useState(false);
  const renderBurgerMenu = () => {
    return (
      <div className={classNames(styles.burgerMenu, 'mt-4', 'ml-6')}>
        {burgerMenu.map((item) => (
          <Link key={item.key} className="mx-5 my-2.5" to={item.link}>
            {item.label}
          </Link>
        ))}
      </div>
    );
  };
  return (
    <>
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center justify-start">
          <img src={logo} />
          <div className="flex flex-col ml-[52px]">
            <p className="text-green mb-0 text-lg font-black">Company name</p>
            <Text className="text-secondary font-bold leading-5">
              User full name <span className="mx-[5px]">|</span> Admin
            </Text>
            <Text className="text-secondary font-normal leading-5">
              12.03.2022
            </Text>
          </div>
        </div>
        <div className="flex space-x-6 items-center">
          <Text className="text-secondary font-bold leading-5 text-base cursor-pointer mr-4">
            Log Out
          </Text>
          {/* <Dropdown
            overlay={renderBurgerMenu()}
            trigger={['click']}
            visible={isOpen}
            onVisibleChange={() => setIsOpen((prev) => !prev)}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button type="circle">
                <span
                  className={`icon-${
                    isOpen ? 'close' : 'notification'
                  } text-green text-xl`}
                ></span>
              </Button>
            </a>
          </Dropdown> */}
          <Dropdown
            overlay={renderBurgerMenu()}
            trigger={['click']}
            visible={isOpen}
            onVisibleChange={() => setIsOpen((prev) => !prev)}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button type="circle" size="lg" color="white">
                <span
                  className={`icon-${
                    isOpen ? 'close' : 'burger'
                  } text-green text-xl`}
                ></span>
              </Button>
            </a>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default Header;
