import { Table } from 'antd';
import moment from 'moment';
import { AlignType } from 'rc-table/lib/interface';
import { useNavigate } from 'react-router-dom';
import { UserRow } from './typesAndSchemas';

const data: UserRow[] = [
  {
    full_name: 'Rob Hovhannisyan',
    email: 'example@gmail.com',
    phone: '+374 00 000000',
    role: 'CFO',
    user_type: 'Admin',
    date: new Date(),
    status: 'Active'
  },
  {
    full_name: 'Rob Hovhannisyan',
    email: 'example@gmail.com',
    phone: '+374 00 000000',
    role: 'CFO',
    user_type: 'Admin',
    date: new Date(),
    status: 'Active'
  },
  {
    full_name: 'Rob Hovhannisyan',
    email: 'example@gmail.com',
    phone: '+374 00 000000',
    role: 'CFO',
    user_type: 'Admin',
    date: new Date(),
    status: 'Active'
  },
  {
    full_name: 'Rob Hovhannisyan',
    email: 'example@gmail.com',
    phone: '+374 00 000000',
    role: 'CFO',
    user_type: 'Admin',
    date: new Date(),
    status: 'Active'
  },
  {
    full_name: 'Rob Hovhannisyan',
    email: 'example@gmail.com',
    phone: '+374 00 000000',
    role: 'CFO',
    user_type: 'Admin',
    date: new Date(),
    status: 'Active'
  },
  {
    full_name: 'Rob Hovhannisyan',
    email: 'example@gmail.com',
    phone: '+374 00 000000',
    role: 'CFO',
    user_type: 'Admin',
    date: new Date(),
    status: 'Active'
  }
];

const UserTable: React.FC = () => {
  const navigate = useNavigate();
  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      render: (text: string, row: UserRow, index: number) => (
        <div className="flex items-center">
          <span className="ml-2">{index + 1}</span>
        </div>
      )
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      align: 'left' as AlignType
    },
    {
      title: 'Registration Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: Date) => moment(date).format('DD.MM.YYYY'),
      align: 'left' as AlignType
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'left' as AlignType
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      align: 'left' as AlignType
    },
    {
      title: 'Company Role',
      dataIndex: 'role',
      key: 'role',
      align: 'left' as AlignType
    },
    {
      title: 'User Type',
      dataIndex: 'user_type',
      key: 'user_type',
      align: 'left' as AlignType
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'left' as AlignType
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      align: 'left' as AlignType,
      render: () => (
        <i
          className="icon-edit text-2xl text-green cursor-pointer"
          onClick={() => navigate('/user-management/edit')}
        />
      )
    }
  ];
  return (
    <>
      <Table
        className="table_component mt-7"
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        scroll={{ x: true }}
      />
    </>
  );
};

export default UserTable;
