import { FC } from 'react';
import PromptModal from 'components/PromptModal';
import { ModalActionPropsType } from './typesAndSchemas';

const ModalAction: FC<ModalActionPropsType> = ({
  modalVisible,
  setModalVisible,
  beneficiaryAction,
  beneficiaryData,
  deletePaymentId
}) => {
  const handleSubmitBeneficiary = () => {
    //TODO: submit approve, delete, reject beneficiary or delete payment method
    console.log({ beneficiaryAction });
    console.log({ beneficiaryData });
    deletePaymentId && console.log({ deletePaymentId });
    setModalVisible(false);
  };
  return (
    <PromptModal
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      title={`${beneficiaryAction} ${!deletePaymentId ? 'Beneficiary' : ''}`}
      text={`Are you sure you want to
        ${
          !deletePaymentId
            ? `${beneficiaryAction?.toLowerCase()} ${
                beneficiaryData?.fullName
              }?`
            : 'delete this paymnet method'
        }`}
      type={
        beneficiaryAction === 'Approve'
          ? 'approve'
          : beneficiaryAction === 'Reject'
          ? 'reject'
          : 'danger'
      }
      onOk={() => handleSubmitBeneficiary()}
    />
  );
};

export default ModalAction;
