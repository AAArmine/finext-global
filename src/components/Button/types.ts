export type ButtonPropsType = {
  size?:
    | 'lg'
    | 'md'
    | 'sm'
    | 'xs' /** lg[205,36], md[115,30], sm[110,36], xs[70,36] */;
  type: 'default' | 'text' | 'circle';
  // use <i /> as a child when type is circle
  color?:
    | 'green'
    | 'light-green'
    | 'grey'
    | 'orange'
    | 'red'
    | 'white'
    | 'tea-green';
  iconObj?: {
    icon: string;
    position: 'left' | 'right';
  };
  text?: string | React.ReactNode;
  textSize?: 'text-base' | 'text-sm' | 'text-xs' | 'text-lg';
  onClick?: () => void;
  disabled?: boolean;
  goTo?: string;
  textColor?: string;
  loading?: boolean;
  children?: string | React.ReactNode;
  className?: string;
  submit?: boolean;
  [rest: string]: any;
};
