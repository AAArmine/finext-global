//TODO: delete this old File
import { Divider, Popover, Table } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import styles from './Beneficiaries.module.scss';
import { AlignType } from 'rc-table/lib/interface';
import { useState } from 'react';
import { TransactionRowType, BeneHistoryPropsType } from '../typesAndSchemas';

const transactionData: TransactionRowType[] = [
  {
    date: new Date(),
    order: '123456789',
    amount: '1000 $',
    status: 'Declined',
    approved_by: 'Rob Hovhannisyan'
  },
  {
    date: new Date(),
    order: '123456789',
    amount: '1000 $',
    status: 'Declined',
    approved_by: 'Rob Hovhannisyan'
  },
  {
    date: new Date(),
    order: '123456789',
    amount: '1000 $',
    status: 'Declined',
    approved_by: 'Rob Hovhannisyan'
  },
  {
    date: new Date(),
    order: '123456789',
    amount: '1000 $',
    status: 'Declined',
    approved_by: 'Rob Hovhannisyan'
  }
];

const popoverData = [
  {
    key: 'Destination Country',
    value: 'Armenia'
  },
  {
    key: 'Bank Fees',
    value: '30 USD'
  },
  {
    key: 'Bank Fees',
    value: '30 USD'
  },
  {
    key: 'Exchange Rate',
    value: '1 USD = 400 AMD'
  },
  {
    key: 'Amount Sent',
    value: '1200 USD'
  },
  {
    key: 'Amount Received',
    value: '480,000 AMD'
  }
];
const BeneHistory: React.FC<BeneHistoryPropsType> = ({
  data,
  setActiveRow,
  setActive
}) => {
  const [toolbarIndex, setToolbarIndex] = useState<number>();
  const toggleInfoBar = (index?: number) => {
    setToolbarIndex(index);
    console.log(data);
  };
  const columns = [
    {
      title: 'Transaction Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => moment(date).format('DD.MM.YYYY'),
      align: 'left' as AlignType
    },
    {
      title: 'Payment Order',
      dataIndex: 'order',
      key: 'order',
      align: 'left' as AlignType
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'left' as AlignType
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'left' as AlignType
    },
    {
      title: 'Approved By',
      dataIndex: 'approved_by',
      key: 'approved_by',
      align: 'left' as AlignType,
      render: (col: string, row: TransactionRowType, index: number) => (
        <div className={classNames('flex items-center')}>
          <span>{col}</span>
          <span className="icon-download text-2xl text-green cursor-pointer ml-7" />
          <Popover
            content={
              <div
                className={classNames(
                  styles.popoverContent,
                  'flex justify-between'
                )}
              >
                {popoverData.map((col) => (
                  <div key={col.key} className="flex flex-col justify-between">
                    <span className="font-bold text-secondary">{col.key}</span>
                    <span className="text-secondary">{col.value}</span>
                  </div>
                ))}
              </div>
            }
            placement="bottomLeft"
            trigger="click"
            overlayClassName="popover_overlay_for_table"
            visible={toolbarIndex === index}
            onVisibleChange={(bool) => toggleInfoBar(bool ? index : undefined)}
          >
            <span
              className={classNames({
                'text-2xl text-green cursor-pointer ml-2': true,
                'icon-info-square': toolbarIndex !== index,
                'icon-info-square-filled': toolbarIndex == index
              })}
              onClick={() => toggleInfoBar(index)}
            />
          </Popover>
        </div>
      )
    }
  ];
  const closeSubCard = () => {
    setActive();
    setActiveRow();
  };
  return (
    <div className={classNames('px-5 pt-4 pb-1', styles.historyContainer)}>
      <div className="flex justify-between">
        <span className="text-sm text-green font-bold">Beneficiary Hitory</span>
        <span
          className="icon-close text-secondary text-sm cursor-pointer"
          onClick={closeSubCard}
        ></span>
      </div>
      <Divider className="bg-light h-0.5 my-2.5" />
      <Table
        className="table_component mt-7"
        columns={columns}
        dataSource={[...transactionData, ...transactionData]}
        pagination={false}
        bordered
        // scroll={{ y: 380 }}
      />
    </div>
  );
};

export default BeneHistory;
