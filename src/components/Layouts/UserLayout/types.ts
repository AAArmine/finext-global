export type UserLayoutPropsType = {
  withoutSidebar?: boolean;
  singleContainer?: boolean;
  children?: JSX.Element[] | JSX.Element;
};
export type MenuItem = {
  key: React.Key;
  icon?: (isActive: boolean) => React.ReactNode;
  label?: React.ReactNode;
  children?: MenuItem[];
  link?: string;
};
