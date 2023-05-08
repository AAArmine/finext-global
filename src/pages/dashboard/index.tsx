import React from 'react';
import MyWallet from '../../components/MyWallet';
import Menu from './Menu';
import RatesOverview from './RatesOverview';

const Dashboard: React.FC = () => {
  return (
    <>
      <Menu />
      <div className="flex justify-between space-x-6">
        <MyWallet />
        <RatesOverview />
      </div>
    </>
  );
};

export default Dashboard;
