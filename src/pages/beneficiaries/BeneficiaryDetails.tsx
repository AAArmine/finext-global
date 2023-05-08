import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  LocationStateBeneType,
  LocationStateUserType,
  LocationStateBeneStatus,
  BeneficiaryActionType
} from './typesAndSchemas';
import DataItem from 'components/DataItem';
import Title from 'components/Title';
import { useNavigate } from 'react-router-dom';
import PaymentMethodCard from './PaymentMethodCard';
import { fakePaymentData } from './constants';
import Button from 'components/Button';
import ModalAction from './ModalAction';
import ModalRejectReason from './ModalRejectReason';
import ModalAddOrEditPayment from './ModalAddOrEditPayment';
import classNames from 'classnames';
import styles from './Beneficiaries.module.scss';

const BeneficiaryDetails = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);

  const [beneficiaryAction, setBeneficiaryAction] =
    useState<BeneficiaryActionType>();
  const [addOrEditPaymentModalVisible, setAddOrEditPaymentModalVisible] =
    useState<boolean>(false);
  const location = useLocation();
  const beneficiaryData = (location.state as LocationStateBeneType)
    .beneficiaryData;
  const userType = (location.state as LocationStateUserType).userType;
  const beneficiaryStatus = (location.state as LocationStateBeneStatus)
    .beneficiaryStatus;
  const navigate = useNavigate();
  const ifCompany = beneficiaryData.segment === 'Company';
  const style = 'text-2xl cursor-pointer';

  return (
    <>
      <div className={styles.contentContainer}>
        <Title
          text={
            <div className="flex justify-between">
              <div>
                <span
                  className="icon-arrow-left-circle text-2xl relative top-1 mr-2"
                  onClick={() => navigate('/beneficiaries')}
                />
                {beneficiaryData.fullName}
                {userType !== 'Authorizer' && (
                  <span className="relative top-1 ml-3">
                    {userType === 'User' && (
                      <span
                        className={classNames(style, 'icon-edit mr-2', {
                          'text-gray-300 pointer-events-none':
                            beneficiaryStatus === 'Declined'
                        })}
                        onClick={() =>
                          navigate('/beneficiaries/edit', {
                            state: { beneficiaryId: beneficiaryData.key }
                          })
                        }
                      />
                    )}
                    <span
                      className={classNames(style, 'icon-trash', {
                        'text-gray-300 pointer-events-none':
                          beneficiaryStatus === 'Declined'
                      })}
                      onClick={() => {
                        setModalVisible(true);
                        setBeneficiaryAction('Delete');
                      }}
                    />
                  </span>
                )}
              </div>
              {userType === 'Authorizer' && (
                <div className="flex">
                  <Button
                    type="default"
                    text="Accept"
                    color="green"
                    className="mr-3"
                    onClick={() => {
                      setModalVisible(true);
                      setBeneficiaryAction('Approve');
                    }}
                  />
                  <Button
                    type="default"
                    text="Decline"
                    color="red"
                    onClick={() => {
                      setRejectModalVisible(true);
                      setBeneficiaryAction('Reject');
                    }}
                  />
                </div>
              )}
            </div>
          }
          color="green"
        />
        <div className="flex flex-wrap justify-start items-top mt-5 py-3 border-t border-light-800">
          <DataItem
            title={ifCompany ? 'Company Name' : 'Full Name'}
            data={beneficiaryData.fullName}
          />
          <DataItem
            title={ifCompany ? 'Company ID Number' : 'ID Number'}
            data={beneficiaryData.idNumber}
          />
          <DataItem
            title={ifCompany ? 'Country Destination' : 'Country'}
            data={beneficiaryData?.country}
          />
          <DataItem title="City" data={beneficiaryData.city} />
          <DataItem title="Street" data={beneficiaryData.street} />
          <DataItem title="Postcode" data={beneficiaryData.postcode} />
          {ifCompany ? (
            <>
              <DataItem
                title="Business Type"
                data={beneficiaryData.businessType}
              />
              <DataItem
                title="Contact Person Full Name"
                data={beneficiaryData.contactPerson}
              />
            </>
          ) : (
            <DataItem
              title="Date of birth"
              data={beneficiaryData.birthDate || '-'}
            />
          )}

          <DataItem title="Phone Number" data={beneficiaryData.phone || '-'} />

          <DataItem title="Email" data={beneficiaryData.email || '-'} />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <Title
          text={
            <div className="flex justify-start">
              <span>Payment Methods</span>
              <span
                className="icon-plus text-4xl ml-7 relative bottom-2"
                onClick={() => setAddOrEditPaymentModalVisible(true)}
              />
            </div>
          }
          color="green"
        />
        <div className="flex flex-wrap justify-start items-top mt-5 pt-4 border-t border-light-800">
          {fakePaymentData.map((payment) => (
            <PaymentMethodCard
              userType={userType}
              key={payment.id}
              declined={beneficiaryStatus === 'Declined'}
              payment={payment}
            />
          ))}
        </div>
      </div>
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
      <ModalAddOrEditPayment
        addOrEditPaymentModalVisible={addOrEditPaymentModalVisible}
        setAddOrEditPaymentModalVisible={setAddOrEditPaymentModalVisible}
        beneficiaryId={beneficiaryData.key}
      />
    </>
  );
};

export default BeneficiaryDetails;
