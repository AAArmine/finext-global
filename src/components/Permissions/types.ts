import { PermissionType, PermissionItemType } from 'types/general';

export type PermissionRoleTypeProps = {
  initialPermissionType: PermissionType;
  onChange: (arg: PermissionItemType) => void;
  title: string;
  active?: boolean;
};
