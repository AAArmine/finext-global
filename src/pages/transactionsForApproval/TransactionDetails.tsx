import { FC } from 'react';
import { Col, Divider, Modal, Row } from 'antd';
import Button from 'components/Button';
import InputDisabled from 'components/InputDisabled';
import DetailItem from 'components/DetailItem';
import { TransactionDetailsPropsType } from './types';

const fakeUserData = [
  'Country',
  'City',
  'Street',
  'Date of birth',
  'Phone Number',
  'Email'
];
const fakeTransactionData = [
  'Currency Type',
  'Payment Type',
  'Payment Destination',
  'Bank Name',
  'Account Number',
  'IBAN',
  'Swift'
];

const TransactionDetails: FC<TransactionDetailsPropsType> = ({
  onApprove,
  onCancel,
  visible,
  onDecline
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      centered
      width={1000}
      footer={null}
    >
      <p className="text-green text-sm font-bold block pt-2">Beneficiary 1</p>
      <Row gutter={[24, 24]} className="pt-8">
        {fakeUserData.map((detail) => (
          <Col className="gutter-row" span={8} key={detail}>
            <InputDisabled placeholder={detail} />
          </Col>
        ))}
      </Row>
      <Divider className="bg-light h-0.5 mt-8 mb-0" />
      <Row gutter={[24, 24]} className="pt-8">
        {fakeTransactionData.map((detail) => (
          <Col className="gutter-row" span={8} key={detail}>
            <InputDisabled placeholder={detail} />
          </Col>
        ))}
      </Row>
      <Divider className="bg-light h-0.5 mt-8" />
      <div>
        <div className="flex justify-between flex-wrap py-3">
          <DetailItem value="Name Surname" label="Created By" />
          <DetailItem value="Bank Transfer" label="Payment Type" />
          <DetailItem value="Split Transaction" label="Transaction Type" />
          <DetailItem value="Finext Wallet (Fiat)" label="Transaction Source" />
          <DetailItem value="BENEFICIARY" label="Fee" />
        </div>
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
      <div className="mt-10 text-center flex justify-end">
        <div className="pr-1">
          <Button
            type="default"
            color="red"
            text="Decline"
            onClick={onDecline}
            size="sm"
          />
        </div>
        <div className="pl-1">
          <Button
            type="default"
            color="light-green"
            text="Approve"
            onClick={onApprove}
            size="sm"
          />
        </div>
      </div>
    </Modal>
  );
};
export default TransactionDetails;
