import Title from 'components/Title';
import React, { useState } from 'react';
import Select from 'react-select';
import SelectComponent from 'components/Select';
import classNames from 'classnames';
import styles from './Wallet.module.scss';
import { allCurrency } from './allCurrency';
import Button from 'components/Button';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from 'components/Input';
import PromptModal from 'components/PromptModal';
import {
  MoneySourceType,
  FormBankValues,
  FormWalletValues,
  depositBankSchema,
  depositWalletSchema
} from './typesAndSchemas';

const DepositToWallet = () => {
  const [depositSuccessModalVisible, setDepositSuccessModalVisible] =
    useState(false);
  const [selectedMoneySource, setSelectedMoneySource] = useState<string | null>(
    null
  );

  const settingMoneySource = (option: MoneySourceType | null) => {
    option && setSelectedMoneySource(option.value);
  };
  const choseDepositOption = [
    { label: 'Bank', value: 'Bank' },
    { label: 'Wallet', value: 'Wallet' }
  ];
  const { control, handleSubmit, setValue, reset } = useForm<
    FormBankValues | FormWalletValues
  >({
    resolver: yupResolver(
      selectedMoneySource && selectedMoneySource === 'Bank'
        ? depositBankSchema
        : depositWalletSchema
    ),
    mode: 'onTouched'
  });

  const onSubmit = (data: FieldValues, e: any) => {
    console.log(data);
    e.target.reset();
    reset({
      accountName: '',
      bankName: '',
      accountNumber: '',
      swift: '',
      iban: '',
      amount: '',
      currency: ''
    });
    setDepositSuccessModalVisible(true);
  };
  const setValueAndTrigger = (
    key: any,
    val: { value: string | undefined },
    value: any
  ) => {
    setValue(key, JSON.stringify(value) === JSON.stringify(val) ? null : val, {
      shouldValidate: true
    });
  };
  return (
    <div className={classNames(styles.walletCont, 'my-5', 'xl:mt-14')}>
      <Title text="Deposit to My Wallet" color="green" />
      <span className="font-bold block pt-5 text-sm">Money source</span>
      <div className={classNames(styles.flexItem)}>
        <div className={styles.inputCont}>
          <Select
            options={choseDepositOption}
            onChange={settingMoneySource}
            placeholder="Choose"
            components={{
              IndicatorSeparator: () => null
            }}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {selectedMoneySource === 'Bank' ? (
          <div className="flex w-full justify-items-start mt-4 flex-wrap max-w-5xl">
            <div className={classNames(styles.flexItem, 'pt-4')}>
              <Controller
                control={control}
                name="accountName"
                render={({
                  field: { onChange, onBlur },
                  fieldState: { error }
                }) => {
                  return (
                    <Input
                      placeholder="Beneficiary Account Name"
                      label="Beneficiary Account Name"
                      onChange={onChange}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  );
                }}
              />
            </div>
            <div className={classNames(styles.flexItem, 'pt-4')}>
              <Controller
                control={control}
                name="bankName"
                render={({
                  field: { onChange, onBlur },
                  fieldState: { error }
                }) => {
                  return (
                    <Input
                      placeholder="Bank Name"
                      label="Bank Name"
                      onChange={onChange}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  );
                }}
              />
            </div>
            <div className={classNames(styles.flexItem, 'pt-4')}>
              <Controller
                control={control}
                name="accountNumber"
                render={({
                  field: { onChange, onBlur },
                  fieldState: { error }
                }) => {
                  return (
                    <Input
                      placeholder="Account Number"
                      label="Account Number"
                      onChange={onChange}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  );
                }}
              />
            </div>
            <div className={classNames(styles.flexItem, 'pt-4')}>
              <Controller
                control={control}
                name="swift"
                render={({
                  field: { onChange, onBlur },
                  fieldState: { error }
                }) => {
                  return (
                    <Input
                      placeholder="SWIFT"
                      label="SWIFT"
                      onChange={onChange}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  );
                }}
              />
            </div>
            <div className={classNames(styles.flexItem, 'pt-4')}>
              <Controller
                control={control}
                name="iban"
                render={({
                  field: { onChange, onBlur },
                  fieldState: { error }
                }) => {
                  return (
                    <Input
                      placeholder="IBAN"
                      label="IBAN"
                      onChange={onChange}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  );
                }}
              />
            </div>
          </div>
        ) : selectedMoneySource === 'Wallet' ? (
          <div className="flex w-full justify-items-start mt-4 flex-wrap">
            <div className={classNames(styles.flexItem, 'pt-4')}>
              <Controller
                control={control}
                name="companyWallet"
                render={({
                  field: { onChange, onBlur },
                  fieldState: { error }
                }) => {
                  return (
                    <Input
                      placeholder="Wallet Company"
                      label="Wallet Company"
                      onChange={onChange}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  );
                }}
              />
            </div>
            <div className={classNames(styles.flexItem, 'pt-4')}>
              <Controller
                control={control}
                name="numberWallet"
                render={({
                  field: { onChange, onBlur },
                  fieldState: { error }
                }) => {
                  return (
                    <Input
                      placeholder="Wallet Number"
                      label="Wallet Number"
                      onChange={onChange}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  );
                }}
              />
            </div>
          </div>
        ) : (
          ''
        )}
        {selectedMoneySource && (
          <>
            <div className="mt-10 pt-4 border-t border-light flex  flex-wrap">
              <div className={classNames(styles.flexItem, 'pt-4')}>
                <Controller
                  control={control}
                  name={
                    selectedMoneySource && selectedMoneySource === 'Bank'
                      ? 'amount'
                      : 'amountWallet'
                  }
                  render={({ field: { onChange }, fieldState: { error } }) => {
                    return (
                      <Input
                        placeholder="Amount to Deposit"
                        label="Amount to Deposit"
                        onChange={onChange}
                        error={error?.message}
                      />
                    );
                  }}
                />
              </div>
              <div className={classNames(styles.flexItem, 'pt-4')}>
                <Controller
                  control={control}
                  name={
                    selectedMoneySource && selectedMoneySource === 'Bank'
                      ? 'currency'
                      : 'currencyWallet'
                  }
                  render={({ field: { value }, fieldState: { error } }) => {
                    return (
                      <SelectComponent
                        options={allCurrency}
                        placeholder="Currency"
                        label="Currency"
                        error={error?.message}
                        value={value}
                        onChange={(val) => {
                          setValueAndTrigger(
                            selectedMoneySource &&
                              selectedMoneySource === 'Bank'
                              ? 'currency'
                              : 'currencyWallet',
                            val,
                            value
                          );
                        }}
                        isSearchable
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="w-full flex justify-end mt-5">
              <Button
                type="default"
                text="Submit"
                color="light-green"
                size="sm"
                submit
              />
            </div>
          </>
        )}
      </form>
      <PromptModal
        singleButtonType="Close"
        visible={depositSuccessModalVisible}
        onOk={() => setDepositSuccessModalVisible(false)}
        onCancel={() => setDepositSuccessModalVisible(false)}
        text="The amount has been successfully deposited to your Finext Global wallet."
        title="Deposit Successful!"
      />
    </div>
  );
};

export default DepositToWallet;
