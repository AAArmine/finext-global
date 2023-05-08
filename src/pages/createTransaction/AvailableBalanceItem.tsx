import React from 'react';
import { AvailableBalanceItemProps } from './typesAndSchemas';

const AvailableBalanceItem: React.FC<AvailableBalanceItemProps> = ({
  currency,
  value
}) => {
  return (
    <div className="min-w-[100px] pt-2 text-center">
      <span className="font-extrabold text-secondary block pb-2">
        {currency}
      </span>
      <span className="font-bold text-secondary">{value}</span>
    </div>
  );
};

export default AvailableBalanceItem;
