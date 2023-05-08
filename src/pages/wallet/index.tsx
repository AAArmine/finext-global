import React from 'react';
import AddCurrency from './AddCurrency';
import DepositToWallet from './DepositToWallet';

const Wallet: React.FC = () => {
  return (
    <>
      <AddCurrency />
      <DepositToWallet />
    </>
  );
};

export default Wallet;
