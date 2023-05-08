import React from 'react';
import styles from './Permissions.module.scss';
import { PermissionRoleTypeProps } from './types';
import Checkbox from 'components/CheckBox';
import classNames from 'classnames';

const PermissionRole: React.FC<PermissionRoleTypeProps> = ({
  initialPermissionType,
  onChange,
  title,
  active = false
}) => {
  return (
    <div
      className={classNames(styles.permissionCont, {
        [styles.inActive]: !active
      })}
    >
      <h2 className="text-center border-b-2 py-2 mb-2 text-orange font-black text-base">
        {title}
      </h2>
      {initialPermissionType.map((permission) => (
        <div className="flex justify-between py-3" key={permission.name}>
          <div className="text-sm">{permission.name}</div>
          <Checkbox
            id={permission.id}
            value={permission.value}
            onChange={() => onChange(permission)}
          />
        </div>
      ))}
    </div>
  );
};
export default PermissionRole;
