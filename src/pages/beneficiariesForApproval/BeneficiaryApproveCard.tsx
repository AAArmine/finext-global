import React, { useState } from 'react';
import styles from './BeneficiaryApprove.module.scss';
import Button from 'components/Button';
import ModalDeatils from './ModalDetails';
import DetailItem from 'components/DetailItem';
import PromptModal from 'components/PromptModal';
import { BeneficiaryApproveCardPropsType } from './types';

const BeneficiaryApproveCard: React.FC<BeneficiaryApproveCardPropsType> = ({
  data
}) => {
  const [isModalApproveOpen, setIsModalApproveOpen] = useState(false);
  const [isModalDeclineOpen, setIsModalDeclineOpen] = useState(false);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);

  const showBeneficiaryInfo = () => {
    setIsModalDetailsOpen(true);
  };
  const approveBeneficiary = () => {
    setIsModalDetailsOpen(false);
    setIsModalApproveOpen(true);
  };
  const declineBeneficiary = () => {
    setIsModalDetailsOpen(false);
    setIsModalDeclineOpen(true);
  };

  return (
    <>
      {data.map((beneficiary) => (
        <div className={styles.approveBeneficiaryItem} key={beneficiary.id}>
          <button
            className="text-green text-sm underline text-center font-bold block m-auto pt-2"
            onClick={showBeneficiaryInfo}
          >
            {beneficiary.name}
          </button>
          <div className="flex justify-between flex-wrap py-3 border-b-2">
            <DetailItem
              classname="w-1/2"
              value={beneficiary.country.value}
              label={beneficiary.country.name}
            />
            <DetailItem
              classname="w-1/2"
              value={beneficiary.city.value}
              label={beneficiary.city.name}
            />
            <DetailItem
              classname="w-1/2"
              value={beneficiary.street.value}
              label={beneficiary.street.name}
            />
            <DetailItem
              classname="w-1/2"
              value={beneficiary.phoneNumber.value}
              label={beneficiary.phoneNumber.name}
            />
            <DetailItem
              classname="w-1/2"
              value={beneficiary.email.value}
              label={beneficiary.email.name}
            />
          </div>
          <div className="flex justify-between flex-wrap py-3">
            <DetailItem
              classname="w-1/2"
              value={beneficiary.currencyType.value}
              label={beneficiary.currencyType.name}
            />
            <DetailItem
              classname="w-1/2"
              value={beneficiary.paymentType.value}
              label={beneficiary.paymentType.name}
            />
            <DetailItem
              classname="w-1/2"
              value={beneficiary.paymentDestination.value}
              label={beneficiary.paymentDestination.name}
            />
            <DetailItem
              classname="w-1/2"
              value={beneficiary.bankName.value}
              label={beneficiary.bankName.name}
            />
            <DetailItem
              classname="w-1/2"
              value={beneficiary.branchAddress.value}
              label={beneficiary.branchAddress.name}
            />
            <DetailItem
              classname="w-1/2"
              value={beneficiary.accountNumber.value}
              label={beneficiary.accountNumber.name}
            />
            <DetailItem
              classname="w-1/2"
              value={beneficiary.IBAN.value}
              label={beneficiary.IBAN.name}
            />
            <DetailItem
              classname="w-1/2"
              value={beneficiary.SWIFT.value}
              label={beneficiary.SWIFT.name}
            />
          </div>
          <div className="flex justify-between mt-3 w-3/4 xl:w-full 2xl:w-3/4 m-auto">
            <Button
              type="default"
              text="Decline"
              color="red"
              size="sm"
              textSize="text-sm"
              onClick={() => setIsModalDeclineOpen(true)}
            />
            <Button
              type="default"
              text="Approve"
              color="light-green"
              size="sm"
              textSize="text-sm"
              onClick={() => setIsModalApproveOpen(true)}
            />
          </div>
        </div>
      ))}
      <PromptModal
        visible={isModalApproveOpen}
        onCancel={() => setIsModalApproveOpen(false)}
        title="Approval"
        text="Are you sure you want to approve the transaction?"
        type="approve"
        onOk={() => setIsModalApproveOpen(false)}
      />
      <PromptModal
        visible={isModalDeclineOpen}
        onCancel={() => setIsModalDeclineOpen(false)}
        title="Decline"
        text="Are you sure you want to decline the transaction?"
        type="decline"
        onOk={() => setIsModalDeclineOpen(false)}
      />
      <ModalDeatils
        onDecline={declineBeneficiary}
        visible={isModalDetailsOpen}
        onApprove={approveBeneficiary}
        onCancel={() => setIsModalDetailsOpen(false)}
      />
    </>
  );
};
export default BeneficiaryApproveCard;
