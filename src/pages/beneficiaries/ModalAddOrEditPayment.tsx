import { FC } from 'react';
import AddOrEditPaymentForm from './AddOrEditPaymentForm';
import PromptModal from 'components/PromptModal';

export type ModalAddOrEditPaymentPropsType = {
  edit?: boolean;
  beneficiaryId: string;
  addOrEditPaymentModalVisible: boolean;
  setAddOrEditPaymentModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const ModalAddOrEditPayment: FC<ModalAddOrEditPaymentPropsType> = ({
  edit,
  beneficiaryId,
  addOrEditPaymentModalVisible,
  setAddOrEditPaymentModalVisible
}) => {
  const handleAddOrEditPaymentMethod = () => {
    //TODO: edit or add payment method
    console.log({ beneficiaryId });
  };

  return (
    <PromptModal
      visible={addOrEditPaymentModalVisible}
      onCancel={() => setAddOrEditPaymentModalVisible(false)}
      title="Add a Payment Method"
      text={<AddOrEditPaymentForm />}
      type="create"
      onOk={() => handleAddOrEditPaymentMethod()}
    />
  );
};

export default ModalAddOrEditPayment;
