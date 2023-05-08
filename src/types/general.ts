export interface ModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  add?: boolean;
  officerId?: string;
  companyId?: number;
  setEditOfficerId?: (editOfficerId: string) => void;
}
export type PhoneValueType = {
  code: string | undefined;
  number: string | undefined;
};
export type SelectValueType<T = string | boolean | number> = {
  value: T;
  label: string;
};
export type LocationState = {
  email: string;
};
export type PermissionType = PermissionItemType[];
export type PermissionItemType = {
  id: string;
  name: string;
  value: boolean;
};
export type UserType = 'User' | 'Authorizer' | 'Admin' | undefined;

export type PaymentMethod = 'Bank' | 'Wallet';
