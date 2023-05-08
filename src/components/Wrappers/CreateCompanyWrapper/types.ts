export type ContentContainerPropsType = {
  children?: JSX.Element[] | JSX.Element;
  title?: string;
};

export type CreateCompanyWrapperPropsType = {
  children: JSX.Element | JSX.Element[];
  title?: string;
  className?: string;
  requiredFields?: boolean;
  savedFields?: boolean;
  step: number;
  description?: string | JSX.Element;
  left?: boolean;
};
