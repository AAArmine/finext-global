import { Divider, Table } from 'antd';
import classNames from 'classnames';
import React from 'react';
import Title from '../Title';
import styles from './MyWallet.module.scss';
import { AlignType } from 'rc-table/lib/interface';
import Button from '../Button';
import { MyWalletPropsType } from './types';

const data = [
  {
    currency: 'USD',
    balance: '10,000',
    usd_balance: '10,000',
    locked_amount: '5,000'
  },
  {
    currency: 'EURO',
    balance: '50,000',
    usd_balance: '54,700',
    locked_amount: ''
  },
  {
    currency: 'BTC',
    balance: '1.2',
    usd_balance: '43,000',
    locked_amount: '0.7'
  },
  {
    currency: 'USDT',
    balance: '30,000',
    usd_balance: '30,000',
    locked_amount: '25,000'
  },
  {
    currency: 'ETH',
    balance: '10',
    usd_balance: '25,800',
    locked_amount: ''
  }
];

const columns = [
  {
    title: '',
    dataIndex: 'currency',
    key: 'currency'
    // render: (text) => <a>{text}</a>
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
    align: 'center' as AlignType
  },
  {
    title: 'Balance in USD',
    dataIndex: 'usd_balance',
    key: 'usd_balance',
    align: 'center' as AlignType
  },
  {
    title: 'Locked Amount',
    dataIndex: 'locked_amount',
    key: 'locked_amount',
    align: 'center' as AlignType,
    className: 'text-orange',
    render: (txt: string, row: any) => {
      return (
        <div className="flex justify-center">
          <div className="text-left w-16">{txt ? txt : '____'}</div>
          <div className="text-right">{txt && row.currency}</div>
        </div>
      );
    }
  }
];

const MyWallet: React.FC<MyWalletPropsType> = ({ myWalletPage }) => {
  return (
    <div
      className={classNames(
        'flex-auto',
        styles.component,
        'mt-8',
        'py-6',
        'px-8'
      )}
    >
      <Title
        text="My Multicurrency Wallet"
        underline={!myWalletPage}
        color="green"
      />
      <Divider className="bg-light h-0.5 my-2.5" />
      <Table
        className="wallet-table"
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
      />
      <div className="flex justify-between mt-3.5">
        <span className="text-green font-bold text-sm">
          Total Balance: 141,357$
        </span>
        <span className="text-green font-bold text-sm">
          Total Balance for use: 86,273.67$
        </span>
      </div>

      <div
        className={`flex justify-center space-x-5 mt-3.5 ${
          myWalletPage ? 'hidden' : ''
        }`}
      >
        <Button
          type="default"
          size="lg"
          className={styles.button}
          textSize="text-sm"
          goTo="/wallet"
        >
          Add Currency
        </Button>

        <Button
          type="default"
          size="lg"
          className={styles.button}
          textSize="text-sm"
          goTo="/wallet"
        >
          Deposit to My Wallet
        </Button>
      </div>
    </div>
  );
};

export default MyWallet;
