export type PromptModalPropesType = {
  title?: string;
  onOk?: () => void;
  onCancel?: () => void;
  visible: boolean;
  text: string | React.ReactNode;
  type?:
    | 'default'
    | 'approve'
    | 'decline'
    | 'danger'
    | 'submit'
    | 'reject'
    | 'rejectReason'
    | 'create';
  singleButtonType?: string;
  singleButtonClick?: () => void;
  closable?: boolean;
  disabled?: boolean;
};
