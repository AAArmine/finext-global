import React, { FC } from 'react';
import { Modal } from 'antd';
import Button from 'components/Button';
import InputDisabled from 'components/InputDisabled';
import { ModalDetailsPropsTypes } from './types';
import styles from './BeneficiaryApprove.module.scss';
import classNames from 'classnames';

const fakeBeneficiaryCompanyData = [
  'Beneficiary 1',
  'Company Name',
  'Company Number',
  'Country Destination',
  'Yerevan',
  'Saryan 3',
  '0013',
  'Contact Person Name',
  'Contact Person Surname',
  'Phone Number',
  'Email',
  'Contact Person Phone Number'
];
const fakeBeneficiaryContactpersonData = [
  'Contact Person Phone Number',
  'Contact Person Phone Numbe'
];
const fakeBeneficiaryTransferData = [
  'Currency Type:',
  'Bank',
  'Account type:',
  'Bank Name',
  'Branch Address',
  'Account No.'
];

const ModalDetails: FC<ModalDetailsPropsTypes> = ({
  onApprove,
  onCancel,
  visible,
  onDecline
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      centered
      width={1000}
      footer={null}
    >
      <p className="text-green text-sm font-bold block pt-2">Beneficiary 1</p>
      <div className={styles.inputsContainer}>
        {fakeBeneficiaryCompanyData.map((detail) => (
          <InputDisabled placeholder={detail} key={detail} />
        ))}
      </div>
      <div className={styles.inputsContainer}>
        {fakeBeneficiaryContactpersonData.map((detail) => (
          <InputDisabled placeholder={detail} key={detail} />
        ))}
      </div>
      <div
        className={classNames(
          styles.inputsContainer,
          'pt-8',
          'mt-8',
          'border-t',
          'border-light'
        )}
      >
        {fakeBeneficiaryTransferData.map((detail) => (
          <InputDisabled placeholder={detail} key={detail} />
        ))}
      </div>
      <div className="mt-10 text-center flex justify-end">
        <div className="pr-1">
          <Button
            type="default"
            color="red"
            text="Decline"
            onClick={onDecline}
            size="sm"
          />
        </div>
        <div className="pl-1">
          <Button
            type="default"
            color="light-green"
            text="Approve"
            onClick={onApprove}
            size="sm"
          />
        </div>
      </div>
    </Modal>
  );
};
export default ModalDetails;
