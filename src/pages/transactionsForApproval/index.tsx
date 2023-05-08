import { Col, Row } from 'antd';
import Title from 'components/Title';
import TransactionCard from './TransactionCard';
import { CardItem } from './types';

const data: CardItem[] = [
  {
    id: 'Beneficiary 6',
    bene_name: 'Beneficiary 6',
    createdBy: { label: 'Created By', value: 'Name Surname' },
    paymentType: { label: 'Payment Type', value: 'Payment Type' },
    transactionType: {
      label: 'Transaction Type',
      value: 'Split Transaction Type'
    },
    transactionSource: {
      label: 'Transaction Source',
      value: 'Finext Wallet (Fiat)'
    },
    fee: {
      label: 'Fee',
      value: 'BENEFICIARY'
    }
  }
];
const TransactionsForApproval = () => {
  return (
    <>
      <Title text="Transactions for Approval" color="green" />
      <Row gutter={16}>
        {Array.from({ length: 7 }, () => data[0]).map((item, index) => (
          <Col span={8} key={index} className="mt-5">
            <TransactionCard data={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default TransactionsForApproval;
