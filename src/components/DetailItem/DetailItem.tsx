import React from 'react';
import { DetailItemTypeProps } from './types';

const DetailItem: React.FC<DetailItemTypeProps> = ({
  label,
  value,
  classname
}) => {
  return (
    <div className={classname}>
      <span className="font-bold text-sm block py-1">{label}</span>
      <span className="text-sm block py-1">{value}</span>
    </div>
  );
};
export default DetailItem;
