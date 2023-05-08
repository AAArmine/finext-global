export type BeneficiaryApproveCardPropsType = {
  data: {
    name: string;
    id: string;
    country: { name: string; value: string };
    city: { name: string; value: string };
    street: { name: string; value: string };
    phoneNumber: { name: string; value: string };
    email: { name: string; value: string };
    currencyType: { name: string; value: string };
    paymentType: { name: string; value: string };
    paymentDestination: { name: string; value: string };
    bankName: { name: string; value: string };
    branchAddress: { name: string; value: string };
    accountNumber: { name: string; value: string };
    IBAN: { name: string; value: string };
    SWIFT: { name: string; value: string };
  }[];
};
export type ModalDetailsPropsTypes = {
  onApprove: () => void;
  onCancel: () => void;
  onDecline: () => void;
  visible: boolean;
};
