export type TransactionDetailsPropsType = {
  onApprove: () => void;
  onCancel: () => void;
  onDecline: () => void;
  visible: boolean;
};
export type CardItem = {
  id: string;
  bene_name: string;
  createdBy: DataItem;
  paymentType: DataItem;
  transactionType: DataItem;
  transactionSource: DataItem;
  fee: DataItem;
};
type DataItem = {
  label: string;
  value: string;
};
export type TransactionCardPropsType = {
  data: CardItem;
};
