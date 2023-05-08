import TransactionIcon from 'assets/images/TransactionIcon';

export const menu = [
  {
    Icon: <i className="icon-beneficiary-list text-7xl text-orange" />,
    title: 'Beneficiary List',
    subMenus: [],
    link: '/beneficiaries'
  },
  {
    Icon: <TransactionIcon />,
    title: 'Create Transaction',
    subMenus: [],
    link: '/create-transaction'
  },
  {
    Icon: <span className="icon-awaiting-approvals text-7xl  text-orange" />,
    ActiveIcon: (
      <span className="icon-awaiting-approvals text-7xl  text-white" />
    ),
    title: 'Awaiting Approvals',
    notification: '27',
    link: '/awaiting-approvals',
    subMenus: [
      {
        text: 'Transactions for Approval',
        link: '/awaiting-approvals/transactions'
      },
      {
        text: 'Beneficiaries for Approval',
        link: '/awaiting-approvals/beneficiaries'
      }
    ],
    subMenuPosition: 'center'
  },
  {
    Icon: <i className="icon-reports text-7xl text-orange" />,
    ActiveIcon: <i className="icon-reports text-7xl text-white" />,
    title: 'Transactions History',
    link: '/reports',
    subMenus: [
      {
        text: 'Recent Transactions',
        link: '/dashboard'
      },
      {
        text: 'Exchange History',
        link: '/dashboard'
      },
      {
        text: 'Awaiting Confirmation',
        link: '/dashboard'
      }
    ],
    subMenuPosition: 'end'
  },
  {
    Icon: <i className="icon-general-info text-7xl text-orange" />,
    ActiveIcon: <i className="icon-general-info text-7xl text-white" />,
    title: 'General Information',
    link: '/general_info',
    subMenus: [
      {
        text: 'Regulation provisions',
        link: '/dashboard'
      },
      {
        text: 'TAX',
        link: '/dashboard'
      },
      {
        text: 'Bank fees',
        link: '/dashboard'
      },
      {
        text: 'Forms for Download',
        link: '/dashboard'
      }
    ],
    subMenuPosition: 'end'
  }
];
