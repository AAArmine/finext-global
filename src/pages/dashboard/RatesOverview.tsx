import { Divider } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.scss';
import Title from '../../components/Title';
import Button from '../../components/Button';

type Props = {
  withoutSidebar?: boolean;
};

const data = {
  usd: {
    usd: '-',
    euro: '100',
    btc: '100',
    usdt: '100',
    eth: '100'
  },
  euro: {
    usd: '100',
    euro: '-',
    btc: '0.0027',
    usdt: '11.05',
    eth: '0.0040'
  },
  btc: {
    usd: '0.0027',
    euro: '0.0027',
    btc: '-',
    usdt: '0.0027',
    eth: '0.0027'
  },
  usdt: {
    usd: '11.05',
    euro: '11.05',
    btc: '11.05',
    usdt: '-',
    eth: '11.05'
  },
  eth: {
    usd: '0.0040',
    euro: '0.0040',
    btc: '0.0040',
    usdt: '0.0040',
    eth: '-'
  }
};

const RatesOverview: React.FC<Props> = ({}) => {
  const [rates, setRates] = useState<any>([]);
  useEffect(() => {
    const rateColumn = ['', ...Object.keys(data)];
    const newRates = Object.keys(data).map((key) => {
      if (data[key as keyof typeof data]) {
        return [key, ...Object.values(data[key as keyof typeof data])];
      }
    });
    setRates([rateColumn, ...newRates]);
  }, []);

  return (
    <div
      className={classNames(
        'flex-auto',
        styles.overviewComponent,
        'mt-8',
        'py-6',
        'px-8'
      )}
    >
      <div className="flex justify-between">
        <div className="flex justify-start">
          <Title text="Cross-rates overview" underline color="green" />
          <div
            className={classNames(
              styles.iconContainer,
              'flex',
              'justify-center',
              'items-center',
              'ml-2.5'
            )}
          >
            <span className="icon-chart text-green" />
          </div>
          <div
            className={classNames(
              styles.iconContainer,
              'flex',
              'justify-center',
              'items-center',
              'ml-2.5'
            )}
          >
            <span className="icon-edit text-green text-xl" />
          </div>
        </div>
        <Button type="default" className={styles.button} textSize="text-sm">
          Exchange
        </Button>
      </div>
      <Divider className="bg-light h-0.5 my-2.5" />
      <div>
        {rates.map((rateRow: any, index: number) => {
          return (
            <div className="flex justify-between mb-6 space-x-12 " key={index}>
              {rateRow.map((row: string, rowIndex: number) => {
                return (
                  <span
                    className={classNames(
                      'text-secondary text-sm text-center w-8',
                      index == 0 || rowIndex == 0 ? 'font-black' : ''
                    )}
                    key={`${index}${rowIndex}`}
                  >
                    {row.toUpperCase()}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatesOverview;
