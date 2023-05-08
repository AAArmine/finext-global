import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useForm,
  FieldValues,
  Controller,
  useFieldArray
} from 'react-hook-form';
import { Row, Col, Checkbox, Typography } from 'antd';
import Select from 'components/Select';
import Input from 'components/Input';
import Textarea from 'components/Textarea';
import Button from 'components/Button';
import AvailableBalance from './AvailableBalance';
import {
  ONE_TIME_TRANSACTION,
  TRANSACTION_RECURRENCE_OPTIONS,
  TRANSACTION_FREQUENCY_OPTIONS,
  SCHEDULED_TRANSACTION,
  PERCENTS,
  SPLITTED_TRANSACTION,
  FAKE_CURRENCIES,
  TRANSACTION_SOURCE,
  FEE_TYPE,
  TRANSACTION_PURPOSE,
  PAYMENT_TYPE
} from './constants';
import DateInput from 'components/DateInput';
import ModalTransactionDetails from './ModalTransactionDetails';
import classNames from 'classnames';
import styles from './TransactionCreatePage.module.scss';
import { CreateTransactionSchema, IForm } from './typesAndSchemas';
import PromptModal from 'components/PromptModal';
import { isNumber } from 'utils';

const { Text } = Typography;

const CreateTransaction = () => {
  //TODO 4 modals in this page should open in a right moment
  const [waitingApprovalModalVisible, setWaitingApprovalModalVisible] =
    useState(false);
  const [nextTransactionModalVisible, setNextTransactionModalVisible] =
    useState(false);
  const [insufficientFundsModalVisible, setInsufficientFundsModalVisible] =
    useState(false);
  const [infoTransactionModalVisible, setInfoTransactionModalVisible] =
    useState(false);

  const { handleSubmit, control, setValue, watch } = useForm<IForm>({
    resolver: yupResolver(CreateTransactionSchema),
    mode: 'onTouched',
    defaultValues: {
      amount: '',
      recurringTransaction: false,
      splittedAmounts: [
        {
          amountPercent: PERCENTS.find((percent) => percent.value === '50'),
          amount: 50,
          date: null
        },
        {
          amountPercent: PERCENTS.find((percent) => percent.value === '50'),
          amount: 50,
          date: null
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'splittedAmounts'
  });

  const defaultAmountRow = {
    amountPercent: '50',
    amount: 50,
    date: null
  };

  const splittedAmountsCount = fields.length;

  const { transactionRecurrence, recurringTransaction, currency } = watch();

  const setValueAndTrigger = (
    key: any,
    val: { value: string | undefined },
    value: any
  ) => {
    setValue(key, JSON.stringify(value) === JSON.stringify(val) ? null : val, {
      shouldValidate: true
    });
  };

  const prepareFormData = (data: FieldValues) => {
    console.log(data, 5665);
    setInfoTransactionModalVisible(true);
  };
  return (
    <>
      <AvailableBalance />
      <form onSubmit={handleSubmit(prepareFormData)}>
        <Row className="flex flex-wrap gap-x-2 gap-y-3 max-w-[908px]">
          <Col>
            <Controller
              control={control}
              name="beneficiary"
              render={({ field: { value }, fieldState: { error } }) => {
                return (
                  <Select
                    options={[
                      {
                        label: 'Beneficiary 1',
                        value: 'bene1'
                      },
                      {
                        label: 'Beneficiary 2',
                        value: 'bene2'
                      }
                    ]}
                    label="Beneficiary"
                    placeholder="Select beneficiary"
                    error={error?.message}
                    value={value}
                    onChange={(val) =>
                      setValueAndTrigger('beneficiary', val, value)
                    }
                  />
                );
              }}
            />
          </Col>
          <Col>
            <Controller
              control={control}
              name="paymentType"
              render={({ field: { value }, fieldState: { error } }) => {
                return (
                  <Select
                    options={PAYMENT_TYPE}
                    label="Payment Type"
                    placeholder="Select payment type"
                    error={error?.message}
                    value={value}
                    onChange={(val) =>
                      setValueAndTrigger('paymentType', val, value)
                    }
                  />
                );
              }}
            />
          </Col>
          <Col>
            <Controller
              control={control}
              name="transactionRecurrence"
              render={({ field: { value }, fieldState: { error } }) => {
                return (
                  <Select
                    options={TRANSACTION_RECURRENCE_OPTIONS}
                    label="Transaction recurrence"
                    placeholder="Select transaction recurrence"
                    error={error?.message}
                    value={value}
                    onChange={(val) => {
                      setValueAndTrigger('transactionRecurrence', val, value);
                      setValue('recurringTransaction', false);
                    }}
                  />
                );
              }}
            />
          </Col>
          <Col className="w-[296px] flex justify-between">
            <Controller
              control={control}
              name="amount"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error }
              }) => (
                <Input
                  label="Amount"
                  wrapperClass="w-[182px]"
                  placeholder="Enter amount"
                  value={value}
                  onChange={(e) => {
                    const { value } = e.target;
                    isNumber(value) && onChange(value);
                  }}
                  onBlur={onBlur}
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="currency"
              render={({ field: { value }, fieldState: { error } }) => {
                return (
                  <Select
                    options={FAKE_CURRENCIES}
                    wrapperClass="w-[104px]"
                    withLabelMargin
                    isValid={!!error}
                    placeholder="Currency"
                    value={value}
                    onChange={(val) =>
                      setValueAndTrigger('currency', val, value)
                    }
                  />
                );
              }}
            />
          </Col>
          {transactionRecurrence?.value === SPLITTED_TRANSACTION && (
            <>
              <Col className="w-[296px]" />
              <Col className="w-[296px]" />
            </>
          )}
          {transactionRecurrence?.value === SPLITTED_TRANSACTION && (
            <div className="w-full">
              <Col>
                {fields.map((field, index) => {
                  return (
                    <div
                      key={field.id}
                      className={classNames('flex items-start', {
                        'mt-3': index
                      })}
                    >
                      <Col
                        className={classNames('w-[296px]', {
                          'mt-[20px]': index
                        })}
                      >
                        {index === 0 && (
                          <Text className="block text-secondary text-sm font-bold w-[296px]">
                            Amount to Split
                          </Text>
                        )}
                        <div className="flex">
                          <Controller
                            control={control}
                            name={`splittedAmounts.${index}.amountPercent`}
                            render={({
                              field: { value },
                              fieldState: { error }
                            }) => {
                              return (
                                <Select
                                  options={PERCENTS}
                                  wrapperClass="w-[89px] mr-3"
                                  isValid={!!error}
                                  placeholder="%"
                                  value={value}
                                  onChange={(val) =>
                                    setValueAndTrigger(
                                      `splittedAmounts.${index}.amountPercent`,
                                      val,
                                      value
                                    )
                                  }
                                />
                              );
                            }}
                          />
                          <Controller
                            control={control}
                            name={`splittedAmounts.${index}.amount`}
                            render={({
                              field: { onChange, onBlur, value },
                              fieldState: { error }
                            }) => (
                              <Input
                                wrapperClass="w-[89px] mr-6"
                                placeholder="Enter amount"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                isValid={!!error}
                              />
                            )}
                          />
                          <Text className="flex items-center uppercase font-bold">
                            {currency?.value}
                          </Text>
                        </div>
                      </Col>
                      <Col>
                        <Controller
                          control={control}
                          name={`splittedAmounts.${index}.date`}
                          render={({
                            field: { value, onChange, onBlur },
                            fieldState: { error }
                          }) => {
                            return (
                              <DateInput
                                label="Transaction Date"
                                placeholder="Select date"
                                onChange={onChange}
                                value={value}
                                onBlur={onBlur}
                                error={error?.message}
                              />
                            );
                          }}
                        />
                      </Col>
                      <Col className="flex mt-[20px]">
                        {splittedAmountsCount > 1 && (
                          <div
                            className={styles.deleteButton}
                            onClick={() => remove(index)}
                          >
                            <span className="icon-trash text-2xl text-green" />
                          </div>
                        )}
                        {index === splittedAmountsCount - 1 && (
                          <Button
                            type="default"
                            size="xs"
                            color="light-green"
                            text="Add"
                            className="ml-5"
                            onClick={() => append(defaultAmountRow)}
                          />
                        )}
                      </Col>
                    </div>
                  );
                })}
              </Col>
            </div>
          )}
          {(transactionRecurrence?.value !== SPLITTED_TRANSACTION ||
            !transactionRecurrence?.value) && (
            <Col>
              <Controller
                control={control}
                name="transactionSource"
                render={({ field: { value }, fieldState: { error } }) => {
                  return (
                    <Select
                      options={TRANSACTION_SOURCE}
                      label="Transaction Source"
                      placeholder="Select transaction source"
                      error={error?.message}
                      value={value}
                      onChange={(val) =>
                        setValueAndTrigger('transactionSource', val, value)
                      }
                    />
                  );
                }}
              />
            </Col>
          )}
          {transactionRecurrence?.value === SCHEDULED_TRANSACTION && (
            <Col>
              <Controller
                control={control}
                name="transactionDate"
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error }
                }) => {
                  return (
                    <>
                      <DateInput
                        label="Transaction Date"
                        placeholder="Select date"
                        onChange={onChange}
                        value={value}
                        onBlur={onBlur}
                        error={error?.message}
                      />
                    </>
                  );
                }}
              />
            </Col>
          )}
          {transactionRecurrence?.value === SPLITTED_TRANSACTION && (
            <Col>
              <Controller
                control={control}
                name="transactionSource"
                render={({ field: { value }, fieldState: { error } }) => {
                  return (
                    <Select
                      options={TRANSACTION_SOURCE}
                      label="Transaction Source"
                      placeholder="Select transaction source"
                      error={error?.message}
                      value={value}
                      onChange={(val) =>
                        setValueAndTrigger('transactionSource', val, value)
                      }
                    />
                  );
                }}
              />
            </Col>
          )}
          <Col>
            <Controller
              control={control}
              name="fee"
              render={({ field: { value }, fieldState: { error } }) => {
                return (
                  <Select
                    options={FEE_TYPE}
                    label="Fee"
                    placeholder="Select fee"
                    error={error?.message}
                    value={value}
                    onChange={(val) => setValueAndTrigger('fee', val, value)}
                  />
                );
              }}
            />
          </Col>
          <Col>
            <Controller
              control={control}
              name="transactionPurpose"
              render={({ field: { value }, fieldState: { error } }) => {
                return (
                  <Select
                    options={TRANSACTION_PURPOSE}
                    label="Transaction Purpose"
                    placeholder="Select transaction purpose"
                    error={error?.message}
                    value={value}
                    onChange={(val) =>
                      setValueAndTrigger('transactionPurpose', val, value)
                    }
                  />
                );
              }}
            />
          </Col>
          {transactionRecurrence?.value === ONE_TIME_TRANSACTION &&
            recurringTransaction && (
              <Col>
                <Controller
                  control={control}
                  name="transactionFrequency"
                  render={({ field: { value }, fieldState: { error } }) => {
                    return (
                      <Select
                        options={TRANSACTION_FREQUENCY_OPTIONS}
                        label="Transaction Frequency"
                        placeholder="Select transaction frequency"
                        error={error?.message}
                        value={value}
                        onChange={(val) =>
                          setValueAndTrigger('transactionFrequency', val, value)
                        }
                      />
                    );
                  }}
                />
              </Col>
            )}
        </Row>
        {transactionRecurrence?.value === ONE_TIME_TRANSACTION && (
          <Row className="mt-8 select-none">
            <Controller
              control={control}
              name="recurringTransaction"
              render={({ field: { onChange, value } }) => (
                <Checkbox checked={value} onChange={onChange}>
                  Recurring Transaction
                </Checkbox>
              )}
            />
          </Row>
        )}
        <Row className="mt-3">
          <Col>
            <Controller
              control={control}
              name="comment"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error }
              }) => (
                <Textarea
                  label="Comment"
                  placeholder="Enter comment"
                  onChange={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                  defaultValue={value}
                  wrapperClass="w-[600px]"
                />
              )}
            />
          </Col>
        </Row>
        <Row className="mt-16">
          <Button
            text="Upload payment invoice"
            size="lg"
            type="default"
            color="tea-green"
            className="mr-3"
            textSize="text-sm"
            textColor="text-secondary"
          />
          <Button
            text="Submit"
            size="sm"
            type="default"
            textSize="text-sm"
            submit
            color="light-green"
          />
        </Row>
      </form>
      <PromptModal
        type="submit"
        visible={nextTransactionModalVisible}
        onOk={() => setNextTransactionModalVisible(false)}
        onCancel={() => setNextTransactionModalVisible(false)}
        text={
          <>
            Your next transaction will be on
            <span className="block font-extrabold">13.07.2022</span>
          </>
        }
        title="Waiting for approval"
      />
      <PromptModal
        singleButtonType="Close"
        visible={waitingApprovalModalVisible}
        onOk={() => setWaitingApprovalModalVisible(false)}
        onCancel={() => setWaitingApprovalModalVisible(false)}
        text="Dear Name your transaction has been created successfully. Please wait for an approval from the management."
        title="Waiting for approval"
      />
      <PromptModal
        singleButtonType="Back"
        visible={insufficientFundsModalVisible}
        onOk={() => setInsufficientFundsModalVisible(false)}
        onCancel={() => setInsufficientFundsModalVisible(false)}
        text="Your transaction amount exceeds your balances. Please insert another amount."
        title="Insufficient Funds"
      />
      <ModalTransactionDetails
        title="Waiting for approval"
        onCancel={() => setInfoTransactionModalVisible(false)}
        onOk={() => setInfoTransactionModalVisible(false)}
        visible={infoTransactionModalVisible}
      />
    </>
  );
};

export default CreateTransaction;
