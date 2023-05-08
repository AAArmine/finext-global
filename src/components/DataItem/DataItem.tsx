import React from 'react';
import { DataItemPropsType } from './types';

const DataItem: React.FC<DataItemPropsType> = ({ title, data }) => {
  return (
    <div className="w-1/3 py-3 pr-3">
      <div className="font-bold">{title}</div>
      <div>{data}</div>
    </div>
  );
};

export default DataItem;
