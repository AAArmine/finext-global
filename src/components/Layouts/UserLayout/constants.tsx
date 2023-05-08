import classNames from 'classnames';
import { MenuItem } from './types';

export const menu: MenuItem[] = [
  {
    label: 'Dashboard',
    key: '1',
    icon: (isActive = false) => (
      <i
        className={classNames({
          'icon-dashboard text-3xl leading-none ': true,
          'text-orange': !isActive,
          'text-white': isActive
        })}
      />
    ),
    link: '/dashboard'
  },
  {
    label: 'Team Management',
    key: '2',
    icon: (isActive = false) => (
      <i
        className={classNames({
          'icon-beneficiary-list text-3xl leading-none': true,
          'text-orange': !isActive,
          'text-white': isActive
        })}
      />
    ),
    link: '/team-management'
  },
  {
    label: 'Beneficiary List',
    key: '3',
    icon: (isActive = false) => (
      <i
        className={classNames({
          'icon-beneficiary-list text-3xl leading-none': true,
          'text-orange': !isActive,
          'text-white': isActive
        })}
      />
    ),
    link: '/beneficiaries'
  },
  {
    label: 'Create Transaction',
    key: '4',
    icon: (isActive = false) => (
      <span
        className={classNames({
          'icon-transaction text-3xl leading-none': true,
          'text-orange': !isActive,
          'text-white': isActive
        })}
      ></span>
    ),
    link: '/create-transaction'
  },
  {
    label: 'Awaiting Approvals',
    key: '5',
    icon: (isActive = false) => (
      <span
        className={classNames({
          'icon-awaiting-approvals text-3xl leading-none': true,
          'text-orange': !isActive,
          'text-white': isActive
        })}
      />
    ),
    children: [
      {
        label: 'Transactions For Approval',
        key: '6',
        link: '/awaiting-approvals/transactions'
      },
      {
        label: 'Beneficiaries For Approvall',
        key: '7',
        link: '/awaiting-approvals/beneficiaries'
      }
    ]
  },
  {
    label: 'Reports',
    key: '8',
    icon: (isActive = false) => (
      <i
        className={classNames({
          'icon-reports text-3xl leading-none': true,
          'text-orange': !isActive,
          'text-white': isActive
        })}
      />
    ),
    children: [
      {
        label: 'Transactions',
        key: '9',
        link: '/reports'
      },
      {
        label: 'Awaiting Beneficiary Confirmation',
        key: '10',
        link: '/reports'
      },
      {
        label: 'Exchange History',
        key: '11',
        link: '/reports'
      }
    ]
  },
  {
    label: 'General Information',
    key: '12',
    icon: (isActive = false) => (
      <i
        className={classNames({
          'icon-general-info text-3xl leading-none': true,
          'text-orange': !isActive,
          'text-white': isActive
        })}
      />
    ),
    children: [
      {
        label: 'Regulation Provisions',
        key: '14',
        link: '/general_info'
      },
      {
        label: 'TAX',
        key: '15',
        link: '/general_info'
      },
      {
        label: 'Bank Fees',
        key: '16',
        link: '/general_info'
      },
      {
        label: 'Forms For Download',
        key: '17',
        link: '/general_info'
      }
    ]
  }
];

export const burgerMenu = [
  {
    label: 'My Company Profile',
    link: '/profile',
    key: '1'
  },
  {
    label: 'User Management',
    link: '/user-management',
    key: '2'
  },
  {
    label: 'My Settings',
    link: '/settings',
    key: '3'
  },
  {
    label: 'Dictionary',
    link: '/dictionary',
    key: '4'
  },
  {
    label: 'Support',
    link: '/support',
    key: '5'
  },
  {
    label: 'About Finext Global',
    link: '/about',
    key: '6'
  }
];
