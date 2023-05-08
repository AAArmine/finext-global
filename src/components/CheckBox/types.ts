import { PermissionItemType } from 'types/general';

export type CheckboxPropsType = {
  id: string;
  value?: boolean;
  onChange?: (
    arg: PermissionItemType | React.ChangeEvent<HTMLInputElement>
  ) => void;
};
