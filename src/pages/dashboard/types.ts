export type MenuCardPropsType = {
  title: string;
  Icon: React.ReactNode;
  ActiveIcon?: React.ReactNode;
  notification?: string;
  hasSubMenu?: boolean;
  showSubMenu?: (index: number) => void;
  index: number;
  isActive: boolean;
  link: string;
};
