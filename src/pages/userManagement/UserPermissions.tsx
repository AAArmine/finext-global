import React, { useState } from 'react';
import Title from 'components/Title';
import { adminPermissionDefaultData } from 'components/Permissions/constants';
import { authorizerPermissionDefaultData } from 'components/Permissions/constants';
import { userPermissionDefaultData } from 'components/Permissions/constants';
import PermissionRole from 'components/Permissions';
import Button from 'components/Button';
import { PermissionItemType, PermissionType } from 'types/general';
import { useNavigate } from 'react-router-dom';

const UserPermissions: React.FC = () => {
  const [initialAdminPermissions, setInitialAdminPermissions] =
    useState<PermissionType>(adminPermissionDefaultData);
  const [initialAuthorizerPermissions, setInitialAuthorizerPermissions] =
    useState<PermissionType>(authorizerPermissionDefaultData);
  const [initialUserPermissions, setInitialUserPermissions] =
    useState<PermissionType>(userPermissionDefaultData);

  const navigate = useNavigate();

  const adminPermissionChange = (adminPermission: PermissionItemType) => {
    setInitialAdminPermissions((current) =>
      current.map((obj) => {
        if (obj.name === adminPermission.name) {
          return {
            ...obj,
            name: adminPermission.name,
            value: !adminPermission.value
          };
        }
        return obj;
      })
    );
  };
  const authorizerPermissionChange = (authPermission: PermissionItemType) => {
    setInitialAuthorizerPermissions((current) =>
      current.map((obj) => {
        if (obj.name === authPermission.name) {
          return {
            ...obj,
            name: authPermission.name,
            value: !authPermission.value
          };
        }
        return obj;
      })
    );
  };
  const userPermissionChange = (userPermission: PermissionItemType) => {
    setInitialUserPermissions((current) =>
      current.map((obj) => {
        if (obj.name === userPermission.name) {
          return {
            ...obj,
            name: userPermission.name,
            value: !userPermission.value
          };
        }
        return obj;
      })
    );
  };
  return (
    <>
      <Title text="User Permissions" color="green" />
      <div className="flex justify-between flex-wrap">
        <PermissionRole
          onChange={adminPermissionChange}
          initialPermissionType={initialAdminPermissions}
          title="Admin permission"
          active
        />
        <PermissionRole
          onChange={authorizerPermissionChange}
          initialPermissionType={initialAuthorizerPermissions}
          title="Authorizer"
        />
        <PermissionRole
          onChange={userPermissionChange}
          initialPermissionType={initialUserPermissions}
          title=" User"
        />
      </div>
      <div className="flex justify-between mt-10">
        <Button
          type="default"
          text="Back"
          color="orange"
          onClick={() => navigate(-1)}
          textSize="text-sm"
        />
        <Button type="default" text="Save" color="green" textSize="text-sm" />
      </div>
    </>
  );
};
export default UserPermissions;
