import classNames from 'classnames';
import Button from 'components/Button';
import DetailItem from 'components/DetailItem';
import PromptModal from 'components/PromptModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionDetails from './TransactionDetails';
import styles from './TransactionsForApproval.module.scss';
import { TransactionCardPropsType } from './types';

const TransactionCard: React.FC<TransactionCardPropsType> = ({ data }) => {
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [declineModalVisible, setDeclineModalVisible] = useState(false);
  const navigate = useNavigate();
  const showTransactionInfo = () => {
    setDetailsModalVisible(true);
  };
  const approveTransaction = () => {
    setDetailsModalVisible(false);
    setApproveModalVisible(true);
  };
  const declineTransaction = () => {
    setDetailsModalVisible(false);
    setDeclineModalVisible(true);
  };
  return (
    <div
      className={classNames({
        [styles.cardContainer]: true,
        'px-5 py-6': true
      })}
    >
      <button
        className="text-green text-sm underline text-center font-bold block m-auto pt-2"
        onClick={() => navigate('/beneficiaries')}
      >
        {data.bene_name}
      </button>
      <div className="flex justify-between flex-wrap py-3">
        <DetailItem
          value={data.createdBy.value}
          label={data.createdBy.label}
          classname="w-1/2"
        />
        <DetailItem
          value={data.paymentType.value}
          label={data.paymentType.label}
          classname="w-1/2"
        />
        <DetailItem
          value={data.transactionType.value}
          label={data.transactionType.label}
          classname="w-1/2"
        />
        <DetailItem
          value={data.transactionSource.value}
          label={data.transactionSource.label}
          classname="w-1/2"
        />
      </div>
      <div>
        <span className="font-bold text-sm block py-1">Amount</span>
        <span className="text-sm block py-1">
          80% - 800 USD <span className="ml-6">07.08.2022</span>
        </span>
        <span className="text-sm block py-1">
          10% - 100 USD <span className="ml-6">03.08.2022</span>
        </span>
        <span className="text-sm block py-1">
          10% - 100 USD <span className="ml-6">03.08.2022</span>
        </span>
      </div>
      <DetailItem value={data.fee.value} label={data.fee.label} />
      <div className="flex justify-between mt-3 w-3/4 xl:w-full 2xl:w-3/4 m-auto">
        <Button
          type="default"
          text="Decline"
          size="sm"
          color="red"
          textSize="text-sm"
          onClick={() => setDeclineModalVisible(true)}
        />
        <Button
          type="default"
          text="Approve"
          color="light-green"
          size="sm"
          textSize="text-sm"
          onClick={() => setApproveModalVisible(true)}
        />
        <div
          className={classNames(
            'w-9 h-9 flex justify-center items-center cursor-pointer',
            styles.moreComponent
          )}
          onClick={showTransactionInfo}
        >
          <span className="icon-more-circle text-xl"></span>
        </div>
      </div>
      <PromptModal
        visible={approveModalVisible}
        onCancel={() => setApproveModalVisible(false)}
        title="Approval"
        text="Are you sure you want to approve the transaction?"
        type="approve"
        onOk={() => setApproveModalVisible(false)}
      />
      <PromptModal
        visible={declineModalVisible}
        onCancel={() => setDeclineModalVisible(false)}
        title="Decline"
        text="Are you sure you want to decline the transaction?"
        type="decline"
        onOk={() => setDeclineModalVisible(false)}
      />
      {/* TODO should move to index.tsx (same in approveBeneficaries)*/}
      <TransactionDetails
        onDecline={declineTransaction}
        visible={detailsModalVisible}
        onApprove={approveTransaction}
        onCancel={() => setDetailsModalVisible(false)}
      />
    </div>
  );
};

export default TransactionCard;
