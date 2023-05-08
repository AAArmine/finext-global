import { useState } from 'react';
import { Table } from 'antd';
import { AlignType } from 'rc-table/lib/interface';
import styles from './TeamManagement.module.scss';
import Button from 'components/Button';
import PromptModal from 'components/PromptModal';
import { InvitationRow } from './typesAndSchemas';
import { itemRender } from '../../helpers/pageItemRender';

const fakeData: InvitationRow[] = [
  {
    key: '1',
    date: '20.01.2022',
    email: 'example@gmail.com',
    role: 'Authoriser',
    status: 'Cancelled'
  },
  {
    key: '2',
    date: '20.01.2022',
    email: 'example@gmail.com',
    role: 'Authoriser',
    status: 'Pending'
  },
  {
    key: '3',
    date: '20.01.2022',
    email: 'example@gmail.com',
    role: 'Authoriser',
    status: 'Expired'
  }
];

const Invitations = () => {
  const [invitationId, setInvitationId] = useState<string>();
  const columns = [
    {
      dataIndex: 'date',
      key: 'date',
      align: 'left' as AlignType
    },
    {
      dataIndex: 'email',
      key: 'email',
      align: 'left' as AlignType
    },
    {
      dataIndex: 'status',
      key: 'status',
      align: 'left' as AlignType
    },
    {
      dataIndex: 'role',
      key: 'role',
      align: 'left' as AlignType
    },
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right' as AlignType,
      render: (_: any, row: InvitationRow) =>
        row.status == 'Pending' && (
          <Button
            type="default"
            color="red"
            text="Cancel"
            onClick={() => openPopup(row.key)}
            size="sm"
            className="inline"
          />
        )
    }
  ];

  const handleCancelInvitaion = () => {
    setInvitationId('');
  };

  const openPopup = (id: string) => {
    setInvitationId(id);
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
      <PromptModal
        onOk={handleCancelInvitaion}
        onCancel={() => setInvitationId('')}
        visible={!!invitationId}
        text="Are you sure you want to cancel this invitation?"
        title="Cancel Invitation"
      />
    </div>
  );
};

export default Invitations;
