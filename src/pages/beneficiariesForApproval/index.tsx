import React from 'react';
import Title from 'components/Title';
import BeneficiaryApproveCard from './BeneficiaryApproveCard';
import styles from './BeneficiaryApprove.module.scss';

const fakeBeneficiariesData = [
  {
    id: 'Beneficiary 1',
    name: 'Beneficiary 1',
    country: { name: 'Country', value: 'Armenia1' },
    city: { name: 'City', value: 'Yerevan1' },
    street: { name: 'Street', value: 'Saryan 26/4' },
    phoneNumber: { name: 'Phone Number', value: '+374 00 000 000' },
    email: { name: 'Email', value: 'example@mail.com' },
    currencyType: { name: 'Currency Type', value: 'USD' },
    paymentType: { name: 'Payment Type', value: 'Bank transfer' },
    paymentDestination: { name: 'Payment Destination', value: 'Armenia' },
    bankName: { name: 'Bank Name', value: 'Bank Name' },
    branchAddress: { name: 'Branch Address', value: 'Branch Address' },
    accountNumber: { name: 'Account Number', value: '123456789' },
    IBAN: { name: 'IBAN', value: 'IBAN' },
    SWIFT: { name: 'SWIFT', value: 'SWIFT' }
  },
  {
    id: 'Beneficiary 2',
    name: 'Beneficiary 2',
    country: { name: 'Country', value: 'Armenia2' },
    city: { name: 'City', value: 'Yerevan2' },
    street: { name: 'Street', value: 'Saryan 26/4' },
    phoneNumber: { name: 'Phone Number', value: '+374 00 000 000' },
    email: { name: 'Email', value: 'example@mail.com' },
    currencyType: { name: 'Currency Type', value: 'USD' },
    paymentType: { name: 'Payment Type', value: 'Bank transfer' },
    paymentDestination: { name: 'Payment Destination', value: 'Armenia' },
    bankName: { name: 'Bank Name', value: 'Bank Name' },
    branchAddress: { name: 'Branch Address', value: 'Branch Address' },
    accountNumber: { name: 'Account Number', value: '123456789' },
    IBAN: { name: 'IBAN', value: 'IBAN' },
    SWIFT: { name: 'SWIFT', value: 'SWIFT' }
  },
  {
    id: 'Beneficiary 3',
    name: 'Beneficiary 3',
    country: { name: 'Country', value: 'Armenia3' },
    city: { name: 'City', value: 'Yerevan3' },
    street: { name: 'Street', value: 'Saryan 26/4' },
    phoneNumber: { name: 'Phone Number', value: '+374 00 000 000' },
    email: { name: 'Email', value: 'example@mail.com' },
    currencyType: { name: 'Currency Type', value: 'USD' },
    paymentType: { name: 'Payment Type', value: 'Bank transfer' },
    paymentDestination: { name: 'Payment Destination', value: 'Armenia' },
    bankName: { name: 'Bank Name', value: 'Bank Name' },
    branchAddress: { name: 'Branch Address', value: 'Branch Address' },
    accountNumber: { name: 'Account Number', value: '123456789' },
    IBAN: { name: 'IBAN', value: 'IBAN' },
    SWIFT: { name: 'SWIFT', value: 'SWIFT' }
  },
  {
    id: 'Beneficiary 4',
    name: 'Beneficiary 4',
    country: { name: 'Country', value: 'Armenia3' },
    city: { name: 'City', value: 'Yerevan3' },
    street: { name: 'Street', value: 'Saryan 26/4' },
    phoneNumber: { name: 'Phone Number', value: '+374 00 000 000' },
    email: { name: 'Email', value: 'example@mail.com' },
    currencyType: { name: 'Currency Type', value: 'USD' },
    paymentType: { name: 'Payment Type', value: 'Bank transfer' },
    paymentDestination: { name: 'Payment Destination', value: 'Armenia' },
    bankName: { name: 'Bank Name', value: 'Bank Name' },
    branchAddress: { name: 'Branch Address', value: 'Branch Address' },
    accountNumber: { name: 'Account Number', value: '123456789' },
    IBAN: { name: 'IBAN', value: 'IBAN' },
    SWIFT: { name: 'SWIFT', value: 'SWIFT' }
  },
  {
    id: 'Beneficiary 5',
    name: 'Beneficiary 5',
    country: { name: 'Country', value: 'Armenia3' },
    city: { name: 'City', value: 'Yerevan3' },
    street: { name: 'Street', value: 'Saryan 26/4' },
    phoneNumber: { name: 'Phone Number', value: '+374 00 000 000' },
    email: { name: 'Email', value: 'example@mail.com' },
    currencyType: { name: 'Currency Type', value: 'USD' },
    paymentType: { name: 'Payment Type', value: 'Bank transfer' },
    paymentDestination: { name: 'Payment Destination', value: 'Armenia' },
    bankName: { name: 'Bank Name', value: 'Bank Name' },
    branchAddress: { name: 'Branch Address', value: 'Branch Address' },
    accountNumber: { name: 'Account Number', value: '123456789' },
    IBAN: { name: 'IBAN', value: 'IBAN' },
    SWIFT: { name: 'SWIFT', value: 'SWIFT' }
  },
  {
    id: 'Beneficiary 6',
    name: 'Beneficiary 6',
    country: { name: 'Country', value: 'Armenia3' },
    city: { name: 'City', value: 'Yerevan3' },
    street: { name: 'Street', value: 'Saryan 26/4' },
    phoneNumber: { name: 'Phone Number', value: '+374 00 000 000' },
    email: { name: 'Email', value: 'example@mail.com' },
    currencyType: { name: 'Currency Type', value: 'USD' },
    paymentType: { name: 'Payment Type', value: 'Bank transfer' },
    paymentDestination: { name: 'Payment Destination', value: 'Armenia' },
    bankName: { name: 'Bank Name', value: 'Bank Name' },
    branchAddress: { name: 'Branch Address', value: 'Branch Address' },
    accountNumber: { name: 'Account Number', value: '123456789' },
    IBAN: { name: 'IBAN', value: 'IBAN' },
    SWIFT: { name: 'SWIFT', value: 'SWIFT' }
  },
  {
    id: 'Beneficiary 7',
    name: 'Beneficiary 7',
    country: { name: 'Country', value: 'Armenia3' },
    city: { name: 'City', value: 'Yerevan3' },
    street: { name: 'Street', value: 'Saryan 26/4' },
    phoneNumber: { name: 'Phone Number', value: '+374 00 000 000' },
    email: { name: 'Email', value: 'example@mail.com' },
    currencyType: { name: 'Currency Type', value: 'USD' },
    paymentType: { name: 'Payment Type', value: 'Bank transfer' },
    paymentDestination: { name: 'Payment Destination', value: 'Armenia' },
    bankName: { name: 'Bank Name', value: 'Bank Name' },
    branchAddress: { name: 'Branch Address', value: 'Branch Address' },
    accountNumber: { name: 'Account Number', value: '123456789' },
    IBAN: { name: 'IBAN', value: 'IBAN' },
    SWIFT: { name: 'SWIFT', value: 'SWIFT' }
  }
];

const BeneficiariesForApproval = () => {
  return (
    <>
      <Title text="Beneficiaries for Approval" color="green" />
      <div className={styles.approveBeneficiaryCont}>
        <BeneficiaryApproveCard data={fakeBeneficiariesData} />
      </div>
    </>
  );
};
export default BeneficiariesForApproval;
