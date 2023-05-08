import { FC, useState } from 'react';
import PromptModal from 'components/PromptModal';
import { ModalRejectReasonPropsType } from './typesAndSchemas';
import RejectForm from './RejectForm';

const ModalRejectReason: FC<ModalRejectReasonPropsType> = ({
  rejectModalVisible,
  setRejectModalVisible,
  setModalVisible
}) => {
  const [rejectReason, setRejectReason] = useState<string>();
  const handleRejectBeneficiary = () => {
    //TODO: submit reject beneficiary
    setModalVisible(true);
    rejectReason && setRejectModalVisible(false);
  };
  return (
    <PromptModal
      disabled={!rejectReason}
      visible={rejectModalVisible}
      onCancel={() => setRejectModalVisible(false)}
      title="Reject Beneficiary"
      text={<RejectForm setRejectReason={setRejectReason} />}
      type="rejectReason"
      onOk={() => handleRejectBeneficiary()}
    />
  );
};

export default ModalRejectReason;
