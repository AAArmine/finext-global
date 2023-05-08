import React from 'react';
import styles from './TransactionCreatePage.module.scss';
import classNames from 'classnames';
import Title from 'components/Title';
import AvailableBalanceItem from './AvailableBalanceItem';

const fakeBalanceData = [
  { currency: 'USD', value: '10.000' },
  { currency: 'EURO', value: '50,000' },
  { currency: 'USDT', value: '30,000' },
  { currency: 'ETH', value: '10.000' },
  { currency: 'Total Balance for Use', value: '86,273.67' }
];
const AvailableBalance = () => {
  return (
    <div
      className={classNames(
        styles.availableBalanceCont,
        'flex',
        'justify-between',
        'mb-16'
      )}
    >
      <div className="min-w-[100px] pt-2 text-center">
        <span className="block">
          <Title text="Available" color="green" />
        </span>
        <span className="block">
          <Title text="Balance" color="green" />
        </span>
      </div>
      {fakeBalanceData.map((balance) => (
        <div key={balance.currency}>
          <AvailableBalanceItem
            currency={balance.currency}
            value={balance.value}
          />
        </div>
      ))}
    </div>
  );
};
export default AvailableBalance;
