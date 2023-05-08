import { FC, useState, useEffect } from 'react';
import { AlignType } from 'rc-table/lib/interface';
import { Table } from 'antd';
import {
  BeneTablePropsType,
  BeneficiaryActionType,
  BeneficiaryCompanyRowType
} from './typesAndSchemas';
import { UserType } from 'types/general';
import { fakeBeneficiariesData, beneListTableColumns } from './constants';
import styles from './Beneficiaries.module.scss';
import { itemRender } from '../../helpers/pageItemRender';
import PopoverInfo from 'components/Popover';
import { useNavigate } from 'react-router-dom';
import ModalAction from './ModalAction';
import ModalRejectReason from './ModalRejectReason';

const BeneficiaryTable: FC<BeneTablePropsType> = ({ beneficiaryStatus }) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>();
  const [showLastColumn, setShowLastColumn] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [beneficiaryAction, setBeneficiaryAction] =
    useState<BeneficiaryActionType>();
  const [beneficiaryData, setBeneficiaryData] =
    useState<BeneficiaryCompanyRowType>();

  const handleBeneficiaryAction = (beneData: BeneficiaryCompanyRowType) => {
    setBeneficiaryData(beneData);
    setModalVisible(true);
  };
  const handleOpenModalReject = (beneData: BeneficiaryCompanyRowType) => {
    setBeneficiaryData(beneData);
    setRejectModalVisible(true);
  };

  const colums = [
    ...beneListTableColumns(navigate, userType, beneficiaryStatus),
    ...(showLastColumn
      ? [
          {
            title: '',
            dataIndex: 'action',
            key: 'action',
            align: 'right' as AlignType,
            width: 100,
            render: (
              _col: string,
              row: BeneficiaryCompanyRowType,
              index: number
            ) => {
              if (
                beneficiaryStatus === 'Declined' &&
                (userType === 'Authorizer' || userType === 'Admin')
              ) {
                return <PopoverInfo row={row} index={index} />;
              } else if (
                beneficiaryStatus === 'Active' &&
                (userType === 'User' || userType === 'Admin')
              ) {
                const style = 'text-2xl text-green cursor-pointer ml-2';
                return (
                  <>
                    <span className={`icon-send ${style}`} />
                    {userType === 'User' && (
                      <span
                        className={`icon-edit ${style}`}
                        onClick={() => navigate('edit')}
                      />
                    )}
                    <span
                      className={`icon-trash ${style}`}
                      onClick={() => {
                        setBeneficiaryAction('Delete');
                        handleBeneficiaryAction(row);
                      }}
                    />
                  </>
                );
              } else if (
                beneficiaryStatus === 'Pending' &&
                userType === 'Authorizer'
              ) {
                const style = 'text-2xl cursor-pointer  ml-6';
                return (
                  <>
                    <span
                      className={`icon-checkmark-circle text-green ${style}`}
                      onClick={() => {
                        setBeneficiaryAction('Approve');
                        handleBeneficiaryAction(row);
                      }}
                    />
                    <span
                      className={`icon-close-circle-filled text-error ${style}`}
                      onClick={() => {
                        handleOpenModalReject(row);
                        setBeneficiaryAction('Reject');
                      }}
                    />
                  </>
                );
              }
            }
          }
        ]
      : [])
  ];

  const listData = fakeBeneficiariesData.filter((beneficiary) => {
    return beneficiary.status === beneficiaryStatus;
  });

  useEffect(() => {
    //TODO get user type
    const user = 'User';
    setUserType(user);
  }, []);

  useEffect(() => {
    if (
      (beneficiaryStatus === 'Declined' &&
        (userType === 'Authorizer' || userType === 'Admin')) ||
      (beneficiaryStatus === 'Active' &&
        (userType === 'User' || userType === 'Admin')) ||
      (beneficiaryStatus === 'Pending' && userType === 'Authorizer')
    ) {
      setShowLastColumn(true);
    }
  }, [beneficiaryStatus, userType]);
  return (
    <div className={styles.tableCont}>
      <Table
        className="table_component mt-7"
        columns={colums}
        dataSource={listData}
        bordered
        pagination={{
          pageSize: 2,
          position: ['bottomCenter'],
          itemRender
        }}
        scroll={{ x: true, y: 1500 }}
        showHeader={true}
        size="middle"
      />
      <ModalAction
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        beneficiaryAction={beneficiaryAction}
        beneficiaryData={beneficiaryData}
      />
      <ModalRejectReason
        setModalVisible={setModalVisible}
        rejectModalVisible={rejectModalVisible}
        setRejectModalVisible={setRejectModalVisible}
      />
    </div>
  );
};

export default BeneficiaryTable;
