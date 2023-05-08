import { Table, Typography } from 'antd';
import Button from 'components/Button';
import AuthFooter from 'components/AuthFooter';
import { useState } from 'react';
import { OrganizationTableItem } from './typesAndSchemas';
import { LocationState } from 'types/general';
import AddOrEditOrganization from './AddOrEditOrganization';
import PromptModal from 'components/PromptModal';
import { getOfficerList, getCompanyInfo, deleteOfficer } from 'services/auth';
import useAsyncEffect from 'hooks/useAsyncEffect';
import CreateCompanyWrapper from 'components/Wrappers/CreateCompanyWrapper';
import { regOrganization } from '../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './RegisterOrganization.module.scss';
import classNames from 'classnames';
import { ADD_OFFICER } from '../constants';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

const RegisterOrganization = () => {
  const { Text } = Typography;
  const navigate = useNavigate();
  const location = useLocation();
  const emailSubmitted = (location.state as LocationState)?.email;
  const companyInfo = useSelector((state: RootState) => state.authUserInfo);
  const [companyId, setCompanyId] = useState<number>();
  const columns = [
    {
      dataIndex: 'fullName',
      key: 'fullName',
      render: (fullName: string) => (
        <span className="text-secondary text-sm font-bold">{fullName}</span>
      )
    },
    {
      dataIndex: 'position',
      key: 'position',
      render: (position: string) => (
        <span className="text-secondary text-sm font-bold">{position}</span>
      )
    },
    {
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <div className="gap-2 flex justify-end">
          <i
            className="icon-edit text-2xl text-green cursor-pointer"
            onClick={() => handleEditOfficer(id)}
          />
          <i
            className="icon-trash text-2xl text-green cursor-pointer"
            onClick={() => handleRemoveOfficer(id)}
          />
        </div>
      )
    }
  ];
  const [visible, setVisible] = useState<boolean>(false);
  const [addOfficer, setAddOfficer] = useState<boolean>(ADD_OFFICER.ADD.value);
  const [deleteOfficerId, setDeleteOfficerId] = useState<string>('');
  const [editOfficerId, setEditOfficerId] = useState<string>('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [officersList, setOfficersList] = useState<OrganizationTableItem[]>([]);

  const handleEditOfficer = (id: string) => {
    setEditOfficerId(id);
    setAddOfficer(ADD_OFFICER.EDIT.value);
    setVisible(true);
  };

  const handleRemoveOfficer = (id: string) => {
    setDeleteOfficerId(id);
    setDeleteModalOpen(true);
  };
  const handleDeleteOfficer = async (id: string) => {
    if (companyId) {
      await deleteOfficer(companyId, {
        id,
        'teamMember[role]': ''
      });
    }
    window.location.reload();
    setDeleteModalOpen(false);
  };
  const handleAddNewOfficer = () => {
    setVisible(true);
    setAddOfficer(true);
  };
  useAsyncEffect(async () => {
    if (companyInfo?.data?.return[0]?.id) {
      setCompanyId(companyInfo.data?.return[0]?.id);
    } else {
      try {
        const companyData = await getCompanyInfo();
        setCompanyId(companyData.data?.return[0]?.id);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  useAsyncEffect(async () => {
    const officerList = await getOfficerList({ cstID: companyId });
    if (officerList.data.return.length) {
      const addPosition = officerList.data.return.map((item: any) => {
        return {
          ...item,
          position: item.id_info.position.toUpperCase(),
          key: item.id
        };
      });
      const getActiveOfficers = addPosition.filter((item: any) => {
        return (
          item.teamMember.role !== '' && item.teamMember.id !== emailSubmitted
        );
      });
      setOfficersList(getActiveOfficers);
    }
  }, [companyId]);

  return (
    <CreateCompanyWrapper
      step={regOrganization.step}
      title={regOrganization.title}
    >
      {officersList.length ? (
        <Table
          dataSource={officersList}
          columns={columns}
          pagination={false}
          showHeader={false}
          className={styles.tableComponent}
        />
      ) : (
        <Text className="text-secondary text-sm font-bold text-left mt-5 mb-10">
          Ultimately owns, either directly or indirectly, more than 25% of the
          shares of the Company, or controls, either directly or indirectly,
          more than 25% of the voting rights, or otherwise exercises control
          over the management or the directors of the company.
        </Text>
      )}
      <Button
        type="default"
        text="+ Add a New Officer"
        color="light-green"
        size="lg"
        className="mb-48"
        onClick={handleAddNewOfficer}
      />
      <div className={classNames(styles.registerFooter, 'flex flex-col')}>
        <div className="flex justify-between">
          <Button
            type="default"
            text="Back"
            color="orange"
            size="sm"
            onClick={() =>
              navigate('/auth/register-company', {
                state: { email: emailSubmitted }
              })
            }
          />
          <Button
            type="default"
            text="Move Forward"
            color="light-green"
            size="lg"
            onClick={() => {
              navigate('/auth/register-documents', {
                state: { email: emailSubmitted }
              });
            }}
            {...(!officersList.length && { disabled: true })}
          />
        </div>
        <AuthFooter />
      </div>
      <AddOrEditOrganization
        visible={visible}
        setVisible={setVisible}
        add={addOfficer}
        {...(editOfficerId.length && {
          officerId: editOfficerId,
          setEditOfficerId: setEditOfficerId
        })}
        companyId={companyId}
      />
      <PromptModal
        onOk={() => handleDeleteOfficer(deleteOfficerId)}
        onCancel={() => setDeleteModalOpen(false)}
        visible={isDeleteModalOpen}
        text="Are you sure you want to delete the officer?"
        title="Delete Officer"
        type="danger"
      />
    </CreateCompanyWrapper>
  );
};

export default RegisterOrganization;
