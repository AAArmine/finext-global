import { AlignType } from 'rc-table/lib/interface';
import {
  PaymentTypeItem,
  BeneficiaryCompanyRowType,
  BeneficiaryStatus
} from './typesAndSchemas';
import { UserType } from 'types/general';

export const CURRENCY_TYPE = [
  {
    value: '1',
    label: 'Fiat'
  },
  {
    value: '2',
    label: 'Crypto'
  }
];
export const WALLET = '1';
export const BANK_TRANSFER = '2';

export const TRANSACTION_TYPE = [
  {
    value: WALLET,
    label: 'Wallet'
  },
  {
    value: BANK_TRANSFER,
    label: 'Bank Transfer'
  }
];

export const BUSINESS_TYPE = [
  { value: 'aBusnessType', label: 'A Busness Type' },
  { value: 'bBusnessType', label: 'B Busness Type' },
  { value: 'cBusnessType', label: 'C Busness Type' }
];

export const BENEFICIARY_STATUS: BeneficiaryStatus[] = [
  'Pending',
  'Active',
  'Declined'
];

export const BENEFICIARY_ACTION = ['Approve', 'Delete', 'Reject'];

export const REJECT_REASON = [
  { value: 1, label: 'High risk beneficiary' },
  { value: 2, label: 'High risk country' },
  { value: 3, label: 'Other' }
];

export const beneListTableColumns = (
  navigate: (arg1: string, arg2: object) => void,
  userType: UserType,
  beneficiaryStatus: string
) => [
  {
    title: 'Full Name',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (col: string, row: BeneficiaryCompanyRowType) => (
      <span
        className="underline cursor-pointer text-green"
        onClick={() => {
          navigate('/beneficiaries/details', {
            state: {
              beneficiaryData: row,
              userType,
              beneficiaryStatus
            }
          });
        }}
      >
        {col}
      </span>
    ),
    align: 'left' as AlignType
  },
  {
    title: 'Segment',
    dataIndex: 'segment',
    key: 'segment',
    align: 'center' as AlignType
  },
  {
    title: 'ID Number',
    dataIndex: 'idNumber',
    key: 'idNumber',
    align: 'center' as AlignType
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    align: 'center' as AlignType
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    align: 'center' as AlignType,
    render: (col: string) => (col ? col : '-')
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    align: 'center' as AlignType,
    render: (col: string) => (col ? col : '-')
  }
];

//TODO:remove this fake data
export const fakeBeneficiariesData: BeneficiaryCompanyRowType[] = [
  {
    key: '1',
    status: 'Declined',
    declineReason: 'Some reason to decline',
    segment: 'Company',
    fullName: 'Company name 1',
    idNumber: '1234567',
    country: 'Armenia',
    city: 'Yerevan',
    street: 'Saryan',
    postcode: '0001',
    businessType: 'BysinesType 1',
    contactPerson: 'Contact person Name1',
    email: 'fulname@gmail.com',
    phone: '001002003'
  },
  {
    key: '2',
    status: 'Declined',
    declineReason: 'Some reason to decline',
    segment: 'Individual',
    fullName: 'Individual name 1',
    idNumber: '1234567',
    country: 'Armenia',
    city: 'Yerevan',
    street: 'Saryan',
    postcode: '0001',
    birthDate: '0.02.02003',
    email: 'fulname@gmail.com',
    phone: '001002003'
  },
  {
    key: '3',
    status: 'Active',
    segment: 'Company',
    fullName: 'Company name 2',
    idNumber: '1234567',
    country: 'Armenia',
    city: 'Yerevan',
    street: 'Saryan',
    postcode: '0001',
    businessType: 'BysinesType 1',
    contactPerson: 'Contact person Name2',
    email: 'fulname@gmail.com',
    phone: '001002003'
  },
  {
    key: '4',
    status: 'Declined',
    declineReason: 'Some reason to decline',
    segment: 'Company',
    fullName: 'Company name 3',
    idNumber: '1234567',
    country: 'Armenia',
    city: 'Yerevan',
    street: 'Saryan',
    postcode: '0001',
    businessType: 'BysinesType 1',
    contactPerson: 'Contact person Name1',
    email: 'fulname@gmail.com',
    phone: '001002003'
  },
  {
    key: '5',
    status: 'Pending',
    segment: 'Individual',
    fullName: 'Individual name 2',
    idNumber: '1234567',
    country: 'Armenia',
    city: 'Yerevan',
    street: 'Saryan',
    postcode: '0001',
    birthDate: '0.02.02003',
    email: 'fulname@gmail.com'
  },
  {
    key: '6',
    status: 'Pending',
    segment: 'Individual',
    fullName: 'Individual name 3',
    idNumber: '1234567',
    country: 'Armenia',
    city: 'Yerevan',
    street: 'Saryan',
    postcode: '0001',
    // birthDate: '0.02.02003',
    phone: '001002003'
  },
  {
    key: '7',
    status: 'Pending',
    segment: 'Individual',
    fullName: 'Individual name 4',
    idNumber: '1234567',
    country: 'Armenia',
    city: 'Yerevan',
    street: 'Saryan',
    postcode: '0001',
    birthDate: '0.02.02003',
    email: 'fulname@gmail.com',
    phone: '001002003'
  },
  {
    key: '8',
    status: 'Pending',
    segment: 'Individual',
    fullName: 'Individual name 5',
    idNumber: '1234567',
    country: 'Armenia',
    city: 'Yerevan',
    street: 'Saryan',
    postcode: '0001',
    birthDate: '0.02.02003',
    email: 'fulname@gmail.com',
    phone: '001002003'
  },
  {
    key: '9',
    status: 'Pending',
    segment: 'Individual',
    fullName: 'Individual name 6',
    idNumber: '1234567',
    country: 'Armenia',
    city: 'Yerevan',
    street: 'Saryan',
    postcode: '0001',
    birthDate: '0.02.02003',
    email: 'fulname@gmail.com',
    phone: '001002003'
  }
];

//TODO:remove this fake data
export const fakePaymentData: PaymentTypeItem[] = [
  {
    id: '1',
    paymentType: 'Bank',
    bankName: 'Bank no1',
    branchAddress: 'some branch address1',
    accountNo: '123456',
    accountType: 'Checking',
    currency: 'USD'
  },
  {
    id: '2',
    paymentType: 'Bank',
    bankName: 'Bank no2',
    branchAddress: 'some branch address2',
    accountNo: '123456',
    accountType: 'Savings',
    currency: 'USD'
  },
  {
    id: '3',
    paymentType: 'Bank',
    bankName: 'Bank no3',
    branchAddress: 'some branch address3',
    accountNo: '123456',
    accountType: 'Savings',
    currency: 'USD'
  },
  {
    id: '4',
    paymentType: 'Wallet',
    cryptoWalletID: 'cwId 222222222',
    currency: 'USD'
  },
  {
    id: '5',
    paymentType: 'Wallet',
    cryptoWalletID: 'cwId 333333',
    currency: 'USD'
  },
  {
    id: '6',
    paymentType: 'Wallet',
    cryptoWalletID: 'cwId 444444',
    currency: 'USD'
  },
  {
    id: '7',
    paymentType: 'Wallet',
    cryptoWalletID: 'cwId 555555',
    currency: 'USD'
  }
];
