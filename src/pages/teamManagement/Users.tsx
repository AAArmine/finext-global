import { useState } from 'react';
import { Table } from 'antd';
import { AlignType } from 'rc-table/lib/interface';
import styles from './TeamManagement.module.scss';
import Button from 'components/Button';
import PromptModal from 'components/PromptModal';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EditUser from './EditUser';
import { EditUserForm, EditUserSchema, UserRow } from './typesAndSchemas';
import { itemRender } from '../../helpers/pageItemRender';

//TODO:remove fakeData
const fakeData: UserRow[] = [
  {
    key: '1',
    fullName: 'Name Surname 1',
    email: 'example@gmail.com',
    position: 'CFO',
    role: 'Authoriser',
    status: 'Deactivated'
  },
  {
    key: '2',
    fullName: 'Name Surname 2',
    email: 'example@gmail.com',
    position: 'COO',
    role: 'User',
    status: 'Active'
  },
  {
    key: '3',
    fullName: 'Name Surname 3',
    email: 'example@gmail.com',
    position: 'CFO',
    role: 'Authoriser',
    status: 'Active'
  },
  {
    key: '4',
    fullName: 'Name Surname 4',
    email: 'example@gmail.com',
    position: 'COO',
    role: 'User',
    status: 'Active'
  },
  {
    key: '5',
    fullName: 'Name Surname 5',
    email: 'example@gmail.com',
    position: 'CFO',
    role: 'Authoriser',
    status: 'Deactivated'
  },
  {
    key: '6',
    fullName: 'Name Surname 6',
    email: 'example@gmail.com',
    position: 'COO',
    role: 'User',
    status: 'Active'
  },
  {
    key: '7',
    fullName: 'Name Surname 7',
    email: 'example@gmail.com',
    position: 'CFO',
    role: 'Authoriser',
    status: 'Deactivated'
  },
  {
    key: '8',
    fullName: 'Name Surname 8',
    email: 'example@gmail.com',
    position: 'COO',
    role: 'User',
    status: 'Active'
  },
  {
    key: '9',
    fullName: 'Name Surname 9',
    email: 'example@gmail.com',
    position: 'CFO',
    role: 'Authoriser',
    status: 'Deactivated'
  },
  {
    key: '10',
    fullName: 'Name Surname 10',
    email: 'example@gmail.com',
    position: 'COO',
    role: 'User',
    status: 'Active'
  },
  {
    key: '11',
    fullName: 'Name Surname 11',
    email: 'example@gmail.com',
    position: 'CFO',
    role: 'Authoriser',
    status: 'Deactivated'
  },
  {
    key: '12',
    fullName: 'Name Surname 12',
    email: 'example@gmail.com',
    position: 'COO',
    role: 'User',
    status: 'Active'
  },
  {
    key: '13',
    fullName: 'Name Surname 13',
    email: 'example@gmail.com',
    position: 'CFO',
    role: 'Authoriser',
    status: 'Deactivated'
  },
  {
    key: '14',
    fullName: 'Name Surname 14',
    email: 'example@gmail.com',
    position: 'COO',
    role: 'User',
    status: 'Active'
  }
];

const Users = () => {
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isUserStatusModalOpen, setUserStatusModalOpen] =
    useState<boolean>(false);
  const [editUserId, setEditUserId] = useState<string | undefined>();
  const [changeStatusUserData, setChangeStatusUserData] = useState<UserRow>();

  const formMethods = useForm<EditUserForm>({
    resolver: yupResolver(EditUserSchema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const { handleSubmit } = formMethods;

  const columns = [
    {
      dataIndex: 'fullName',
      key: 'fullName',
      align: 'left' as AlignType
    },
    {
      dataIndex: 'email',
      key: 'email',
      align: 'left' as AlignType
    },
    {
      dataIndex: 'position',
      key: 'position',
      align: 'left' as AlignType
    },
    {
      dataIndex: 'role',
      key: 'role',
      align: 'left' as AlignType
    },
    {
      dataIndex: '',
      key: 'action',
      align: 'right' as AlignType,
      render: (data: UserRow) => (
        <i
          className="icon-edit text-2xl text-green cursor-pointer py-1 px-3.5 rounded shadow-lg shadow-light-20 hover:shadow-transparent"
          onClick={() => {
            setEditUserId(data.key);
            setEditModalOpen(true);
          }}
        />
      )
    },
    {
      dataIndex: '',
      key: 'status',
      align: 'right' as AlignType,
      render: (data: UserRow) => (
        <Button
          type="default"
          color={data.status === 'Active' ? 'red' : 'green'}
          text={data.status === 'Active' ? 'Deactivate' : 'Reactivate'}
          onClick={() => {
            setUserStatusModalOpen(true);
            setChangeStatusUserData(data);
          }}
          size="sm"
          className="inline"
        />
      )
    }
  ];

  const handleEditUser = async (data: EditUserForm) => {
    //  TODO: submit edited user role after the Api is ready, remove consols
    console.log({ data });
    console.log({ editUserId });
    setEditModalOpen(false);
  };
  const handleChangeUserStatus = (userData: UserRow | undefined) => {
    //  TODO: change user status after the Api is ready, remove console
    console.log({ userData });
    setUserStatusModalOpen(false);
  };
  return (
    <div className={styles.teamTableCont}>
      <Table
        className="table_component mt-0 pt-0"
        columns={columns}
        dataSource={fakeData}
        pagination={{
          pageSize: 2,
          position: ['bottomCenter'],
          itemRender,
          showLessItems: true
        }}
        bordered
        scroll={{ x: true }}
        size="middle"
      />
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(handleEditUser)} className="mt-5">
          <PromptModal
            onOk={handleSubmit(handleEditUser)}
            onCancel={() => setEditModalOpen(false)}
            visible={isEditModalOpen}
            text={<EditUser />}
            title="Edit User"
            type="submit"
          />
        </form>
      </FormProvider>
      <PromptModal
        onOk={() => handleChangeUserStatus(changeStatusUserData)}
        onCancel={() => setUserStatusModalOpen(false)}
        visible={isUserStatusModalOpen}
        text={`Are you sure you want to ${
          changeStatusUserData?.status === 'Active'
            ? 'deactivate'
            : 'reactivate'
        } ${changeStatusUserData?.fullName}'s account?`}
        title={`${
          changeStatusUserData?.status === 'Active'
            ? 'Deactivate'
            : 'Reactivate'
        } User`}
        type="default"
      />
    </div>
  );
};

export default Users;
