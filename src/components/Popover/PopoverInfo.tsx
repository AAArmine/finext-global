import { FC, useState } from 'react';
import { Popover } from 'antd';
import { BeneficiaryCompanyRowType } from '../../pages/beneficiaries/typesAndSchemas';
import classNames from 'classnames';
import './PopoverInfo.module.scss';

export type PopoverInfoPropsType = {
  row: BeneficiaryCompanyRowType;
  index: number | undefined;
};
const PopoverInfo: FC<PopoverInfoPropsType> = ({ row, index }) => {
  const [toolbarIndex, setToolbarIndex] = useState<number>();
  const toggleInfoBar = (index?: number) => {
    setToolbarIndex(index);
  };
  return (
    <Popover
      content={
        <div className="h-full font-bold grid text-secondary place-content-center">
          {row.declineReason}
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
          'text-2xl cursor-pointer ml-2': true,
          'icon-info text-green ': toolbarIndex !== index,
          'icon-info text-light': toolbarIndex === index
        })}
        onClick={() => {
          toggleInfoBar(index);
        }}
      />
    </Popover>
  );
};

export default PopoverInfo;
