import React, { FC } from 'react';
import { Modal } from 'antd';
import Button from 'components/Button';
import { ModalTransactionDetailsPropsType } from './typesAndSchemas';
import classNames from 'classnames';

const transactionDetails = [
  { title: 'Beneficiary', value: 'Name Surname' },
  { title: 'Payment Type', value: 'Bank Transfer' },
  { title: 'Transaction Type', value: 'One Time Transaction' },
  { title: 'Transaction  Source', value: 'Transaction  Source' },
  { title: 'Transaction Purpose', value: 'Transaction Purpose' },
  { title: 'Fee', value: 'Fee type' },
  { title: 'Amount', value: '1000$' }
];
const ModalTransactionDetails: FC<ModalTransactionDetailsPropsType> = ({
  title,
  onCancel,
  visible,
  onOk
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      centered
      width={1108}
      footer={null}
    >
      <h2 className="mt-4 mb-4 font-extrabold m-auto text-base text-center text-[23px]">
        {title}
      </h2>
      <h3 className="text-green text-center font-extrabold">
        Payment Order XXXXXXXXX
      </h3>
      <div className="mt-6 w-11/12 m-auto text-base text-center">
        <p className="pb-3 m-auto font-bold leading-5">
          Dear Name your transaction has been created successfully.
          <br />
          Please wait for an approval from the management.
        </p>
        <hr />
        <div className="text-left flex flex-wrap justify-center pb-4">
          {transactionDetails.map((transDetail) => (
            <div
              key={transDetail.title}
              className={classNames('pt-4', {
                'mx-8':
                  transDetail.title === 'Fee' || transDetail.title === 'Amount',

                'w-1/5':
                  transDetail.title !== 'Fee' && transDetail.title !== 'Amount'
              })}
            >
              {transDetail.title}
              <span className="text-bold block font-extrabold">
                {transDetail.value}
              </span>
            </div>
          ))}
        </div>
        <hr />
      </div>
      <div className="w-full m-auto pt-4 pb-2 mt-7 text-center flex justify-center">
        <Button
          type="default"
          color="light-green"
          text="Close"
          onClick={onCancel}
          size="sm"
        />
      </div>
    </Modal>
  );
};
export default ModalTransactionDetails;
