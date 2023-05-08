import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Title from 'components/Title';
import {
  PaymentMethodCardPropsType,
  paymentBankType,
  paymentWalletType,
  LocationStateBeneType
} from './typesAndSchemas';
import ModalAction from './ModalAction';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

const PaymentMethodCard: FC<PaymentMethodCardPropsType> = ({
  userType,
  declined,
  payment
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const bankPayment = payment as paymentBankType;
  const walletPayment = payment as paymentWalletType;
  const location = useLocation();
  const beneficiaryData = (location.state as LocationStateBeneType)
    .beneficiaryData;
  const style = 'text-2xl cursor-pointer';
  return (
    <div className="py-4 px-4 mr-4 border border-light-800 w-[296px] rounded-2xl mb-4 h-[120px]">
      <Title
        text={
          <span className="flex justify-between">
            <span>
              {bankPayment.bankName ? 'Bank Account' : 'Cripto Wallet'}
            </span>
            {userType !== 'Authorizer' && (
              <span>
                <>
                  {userType === 'User' && (
                    <span
                      className={classNames(style, 'icon-edit mr-2', {
                        'text-gray-300 pointer-events-none': declined
                      })}
                      onClick={() => {
                        // TODO: edit payment functionality
                        console.log('edit payment');
                      }}
                    />
                  )}
                  <span
                    className={classNames(style, 'icon-trash', {
                      'text-gray-300 pointer-events-none': declined
                    })}
                    onClick={() => {
                      console.log({ payment });
                      console.log({ beneficiaryData });
                      setModalVisible(true);
                    }}
                  />
                </>
              </span>
            )}
          </span>
        }
        color="green"
        className="font-semibold"
      />

      {bankPayment.bankName && (
        <>
          <span className="font-bold mr-2">Bank Name</span>
          {bankPayment.bankName}
          <br />
          <span className="font-bold mr-2">Account No.</span>
          {bankPayment.accountNo}
        </>
      )}
      {walletPayment.cryptoWalletID && (
        <>
          <span className="font-bold mr-2">Wallet ID</span>
          {walletPayment.cryptoWalletID}
        </>
      )}
      <ModalAction
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        beneficiaryAction="Delete Payment Method"
        beneficiaryData={beneficiaryData}
        deletePaymentId={payment.id}
      />
    </div>
  );
};
export default PaymentMethodCard;
