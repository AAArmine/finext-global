import React, { useState } from 'react';
import MyWallet from 'components/MyWallet';
import styles from './Wallet.module.scss';
import Title from 'components/Title';
import Button from 'components/Button';
import Select from 'components/Select';
import { allCurrency } from './allCurrency';
import * as yup from 'yup';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import { REQUIRED_TEXT } from 'constants/global';
import { yupResolver } from '@hookform/resolvers/yup';
import PromptModal from 'components/PromptModal';

const addCurrencySchema = yup.object().shape({
  currency: yup.object().nullable().required(REQUIRED_TEXT)
});

interface IForm {
  currency: string | undefined;
}

const AddCurrency = () => {
  const [currencyAddedModalVisible, setCurrencyAddedModalVisible] =
    useState(false);
  const [addCurrency, setAddCurrency] = useState<string>('');
  const [addedCurrencies, setAddedCurrencies] = useState<string[]>([]);
  const [alreadyChosen, setAlreadyChosen] = useState<boolean>(false);

  const { handleSubmit, control, setValue } = useForm<IForm>({
    resolver: yupResolver(addCurrencySchema),
    mode: 'onTouched'
  });
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    setCurrencyAddedModalVisible(true);
    if (addedCurrencies.length) {
      if (!addedCurrencies.includes(addCurrency)) {
        setAddedCurrencies((prev) => [...prev, addCurrency]);
        setAlreadyChosen(false);
      } else {
        setAlreadyChosen(true);
      }
    } else {
      if (addCurrency) {
        setAddedCurrencies([addCurrency]);
      }
    }
  };
  const setValueAndTrigger = (
    key: any,
    val: { value: string | undefined },
    value: any
  ) => {
    setValue(key, JSON.stringify(value) === JSON.stringify(val) ? null : val);
  };
  return (
    <div className={styles.walletCont}>
      <div className="flex justify-between w-full flex-wrap 2xl:flex-nowrap">
        <div className="w-full 2xl:w-3/5">
          <MyWallet myWalletPage={true} />
        </div>
        <div className="w-full 2xl:w-2/5 py-6 2xl:ml-10 mt-8">
          <Title text="Add Currency" color="green" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-items-start pt-3">
              <Controller
                control={control}
                name="currency"
                render={({ field: { value }, fieldState: { error } }) => {
                  return (
                    <Select
                      options={allCurrency}
                      placeholder="Search"
                      label="Currency"
                      error={error?.message}
                      value={value}
                      onChange={(val) => {
                        setValueAndTrigger('currency', val, value);
                        setAddCurrency(val.value);
                      }}
                      isSearchable
                    />
                  );
                }}
              />
              <div className="ml-2 mt-5">
                <Button
                  type="default"
                  color="light-green"
                  text="Add"
                  size="xs"
                  submit
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <PromptModal
        singleButtonType="Close"
        visible={currencyAddedModalVisible}
        onOk={() => setCurrencyAddedModalVisible(false)}
        onCancel={() => setCurrencyAddedModalVisible(false)}
        text={
          !alreadyChosen &&
          'The selected currency has been added to your account!'
        }
        title={
          alreadyChosen
            ? 'This currency is already on your account!'
            : 'Currency Added!'
        }
      />
    </div>
  );
};
export default AddCurrency;
