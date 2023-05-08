import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './UserLayout.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { menu } from './constants';
import { MenuItem } from './types';

const Sidebar: React.FC = () => {
  const [openedMenu, setOpenedMenu] = useState<React.Key | undefined>();
  const location = useLocation();
  const navigate = useNavigate();
  const openSubMenu = (item: MenuItem) => {
    if (item.children) {
      setOpenedMenu(openedMenu == item.key ? undefined : item.key);
    } else {
      setOpenedMenu(undefined);
      item?.link && navigate(item.link);
    }
  };

  const isActiveItem = (item: MenuItem): boolean => {
    if (item.link) {
      return location.pathname == item.link;
    }
    if (item.children) {
      return item.children.some(
        (child: MenuItem) => location.pathname == child.link
      );
    }
    return false;
  };

  return (
    <div className="overflow-y-scroll h-full">
      {menu.map((item) => (
        <div key={item?.key} className="relative">
          {location.pathname == item.link && (
            <div
              className={classNames('bg-red-100 absolute', styles.activeTik)}
            />
          )}
          <div
            className="mx-8 cursor-pointer"
            onClick={() => openSubMenu(item)}
          >
            <div
              className={classNames({
                [styles.sidebarMenuItem]: true,
                [styles.activeMenuItem]: isActiveItem(item)
              })}
            >
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center">
                  {item?.icon && item?.icon(isActiveItem(item))}
                  <span
                    className={classNames({
                      'ml-2.5': true,
                      'text-white': isActiveItem(item)
                    })}
                  >
                    {item?.label}
                  </span>
                </div>
                {!!item.children?.length && (
                  <span
                    className={classNames({
                      'cursor-pointer': true,
                      'icon-arrow-down': openedMenu !== item.key,
                      'icon-arrow-up': openedMenu == item.key,
                      'text-secondary': !isActiveItem(item),
                      'text-white': isActiveItem(item)
                    })}
                  ></span>
                )}
              </div>
            </div>
            {openedMenu == item.key && (
              <div>
                {item.children?.map((child: MenuItem) => {
                  return (
                    <div
                      className={classNames({
                        [styles.sidebarMenuSubitem]: true,
                        [styles.sidebarActiveSubitem]:
                          location.pathname == child.link,
                        'text-green': location.pathname == child.link,
                        'text-sm': true
                      })}
                      onClick={(e) => {
                        e.stopPropagation();
                        child.link && navigate(child.link);
                      }}
                      key={child.key}
                    >
                      {child.label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
