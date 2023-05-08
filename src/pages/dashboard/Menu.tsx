import classNames from 'classnames';
import React, { useState } from 'react';
import Button from '../../components/Button';
import { menu } from './constants';
import MenuCard from './MenuCard';

const Menu: React.FC = () => {
  const [openedMenuIndex, setOpenedMenuIndex] = useState<number>();
  return (
    <>
      <div className="flex justify-between ">
        {menu.map((item, index) => (
          <MenuCard
            key={index}
            index={index}
            Icon={item.Icon}
            ActiveIcon={item?.ActiveIcon}
            title={item.title}
            notification={item?.notification}
            hasSubMenu={!!item?.subMenus.length}
            showSubMenu={setOpenedMenuIndex}
            isActive={openedMenuIndex == index}
            link={item?.link}
          />
        ))}
      </div>
      <div>
        {openedMenuIndex && (
          <div
            className={classNames(
              'flex mt-8 space-x-[50px]',
              menu[openedMenuIndex].subMenuPosition == 'end'
                ? 'justify-end'
                : 'justify-center'
            )}
          >
            {menu[openedMenuIndex]?.subMenus.map((item, index) => (
              <Button
                type="default"
                color="orange"
                size="lg"
                key={index}
                goTo={item.link}
              >
                {item.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
