export const ONE_TIME_TRANSACTION = '1';
export const SCHEDULED_TRANSACTION = '2';
export const SPLITTED_TRANSACTION = '3';

export const TRANSACTION_RECURRENCE_OPTIONS = [
  {
    value: ONE_TIME_TRANSACTION,
    label: 'One-time Transaction'
  },
  {
    value: SCHEDULED_TRANSACTION,
    label: 'Scheduled Transaction'
  },
  {
    value: SPLITTED_TRANSACTION,
    label: 'Split Transaction'
  }
];

export const TRANSACTION_FREQUENCY_OPTIONS = [
  {
    value: 'week',
    label: 'Week'
  },
  {
    value: 'month',
    label: 'Month'
  },
  {
    value: '3months',
    label: '3 Months'
  },
  {
    value: '6months',
    label: '6 Months'
  },
  {
    value: 'year',
    label: 'Year'
  }
];

export const PERCENTS = [
  {
    label: '10%',
    value: '10'
  },
  {
    label: '20%',
    value: '20'
  },
  {
    label: '30%',
    value: '30'
  },
  {
    label: '40%',
    value: '40'
  },
  {
    label: '50%',
    value: '50'
  },
  {
    label: '60%',
    value: '60'
  },
  {
    label: '70%',
    value: '70'
  },
  {
    label: '80%',
    value: '80'
  },
  {
    label: '90%',
    value: '90'
  },
  {
    label: '100%',
    value: '100'
  }
];

export const FAKE_CURRENCIES = [
  {
    label: 'USD',
    value: 'usd'
  },
  {
    label: 'EUR',
    value: 'eur'
  },
  {
    label: 'AMD',
    value: 'amd'
  }
];
export const PAYMENT_TYPE = [
  {
    label: 'Wallet Transfer',
    value: 'walletTransfer'
  },
  {
    label: 'Bank Transfer',
    value: 'bankTransfer'
  }
];
export const TRANSACTION_SOURCE = [
  {
    label: 'Crypto',
    value: 'crypto'
  },
  {
    label: 'Fiat',
    value: 'fiat'
  }
];
export const FEE_TYPE = [
  {
    label: 'Our',
    value: 'our'
  },
  {
    label: 'Benef',
    value: 'benef'
  },
  {
    label: 'Shared',
    value: 'shared'
  }
];
export const TRANSACTION_PURPOSE = [
  {
    label: 'Purpose 1',
    value: 'purpose1'
  },
  {
    label: 'Purpose 2',
    value: 'purpose2'
  },
  {
    label: 'Purpose 3',
    value: 'purpose3'
  }
];
