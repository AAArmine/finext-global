import { FC, useState } from 'react';
import Input from 'components/Input';
import {
  useForm,
  FieldValues,
  Controller,
  useFieldArray,
  FormProvider
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'components/Select';
import { Col, Divider, Row } from 'antd';
import Button from 'components/Button';
import { BUSINESS_TYPE } from './constants';
import PhoneNumber from 'components/PhoneNumber';
import { PhoneValueType } from 'types/general';
import {
  BANK_TRANSFER,
  CURRENCY_TYPE,
  TRANSACTION_TYPE,
  WALLET
} from './constants';
import FTitle from 'components/Title';
import {
  FormType,
  AddOrEditBeneficiaryPropsType,
  BeneficiaryFormSchema
} from './typesAndSchemas';
import PromptModal from 'components/PromptModal';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const AddOrEditBeneficiary: FC<AddOrEditBeneficiaryPropsType> = ({ edit }) => {
  //TODO if edit-> get selected beneficiary's details and set as default values in inputs
  const [waitingApprovalModalVisible, setWaitingApprovalModalVisible] =
    useState(false);
  const navigate = useNavigate();
  const formMethods = useForm<FormType>({
    resolver: yupResolver(BeneficiaryFormSchema),
    mode: 'onTouched',
    defaultValues: {
      companyName: 'test Company name',
      companyNumber: { code: 'test +374', number: '91123456' },
      payments: [
        {
          currencyType: undefined,
          transactionType: undefined,
          bankName: undefined,
          branchAddress: undefined,
          accountNumber: undefined,
          accountType: undefined
        }
      ]
    }
  });

  const { handleSubmit, control, setValue, watch } = formMethods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'payments'
  });

  const values = watch();

  const paymentsRowCount = fields.length;

  const onSubmit = (data: FieldValues, e: any) => {
    console.log(data, 5665);
    e.target.reset();
    setWaitingApprovalModalVisible(true);
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

  const newPayment = {
    currencyType: undefined,
    transactionType: undefined,
    bankName: undefined,
    branchAddress: '',
    accountNumber: '',
    accountType: undefined,
    cryptoWalletId: ''
  };

  return (
    <div>
      <p className="text-green text-base font-black">My Beneficiaries</p>
      <p className="text-secondary mt-5 mb-3 text-sm font-bold">
        {edit ? 'Edit Beneficiary' : 'Create a New Beneficiary'}
      </p>
      <Divider className="bg-light mb-3 mt-0" />
      <p className="text-green text-base font-black my-5">General Details</p>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="flex flex-wrap gap-2 max-w-[908px]">
            <Col>
              <Controller
                control={control}
                name="companyName"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error }
                }) => (
                  <Input
                    label="Company Name"
                    placeholder="Enter company name"
                    onChange={onChange}
                    {...(edit && { value })}
                    disabled={edit ? true : false}
                    onBlur={onBlur}
                    error={error?.message}
                  />
                )}
              />
            </Col>
            <Col>
              {edit ? (
                <Controller
                  control={control}
                  name="companyNumber"
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error }
                  }) => (
                    <Input
                      label="Company Number"
                      placeholder="Enter company number"
                      onChange={onChange}
                      {...(edit && { value: `${value.code} ${value.number}` })}
                      disabled={edit ? true : false}
                      onBlur={onBlur}
                      error={error?.message}
                    />
                  )}
                />
              ) : (
                <Controller
                  control={control}
                  name="companyNumber"
                  render={({ field: { value }, fieldState: { error } }) => (
                    <PhoneNumber
                      value={value}
                      onChange={(val: PhoneValueType) =>
                        setValue('companyNumber', val, {
                          shouldValidate: true
                        })
                      }
                      error={error}
                    />
                  )}
                />
              )}
            </Col>
            <Col>
              <Controller
                control={control}
                name="countryDestination"
                render={({
                  field: { onChange, onBlur },
                  fieldState: { error }
                }) => (
                  <Input
                    label="Country Destination"
                    placeholder="Enter country destination"
                    onChange={onChange}
                    onBlur={onBlur}
                    error={error?.message}
                  />
                )}
              />
            </Col>
            <Col>
              <Controller
                control={control}
                name="city"
                render={({
                  field: { onChange, onBlur },
                  fieldState: { error }
                }) => (
                  <Input
                    label="City"
                    placeholder="Enter your city"
                    onChange={onChange}
                    onBlur={onBlur}
                    error={error?.message}
                  />
                )}
              />
            </Col>
            <Col>
              <Controller
                control={control}
                name="street"
                render={({
                  field: { onChange, onBlur },
                  fieldState: { error }
                }) => (
                  <Input
                    label="Street"
                    placeholder="Enter your street"
                    onChange={onChange}
                    onBlur={onBlur}
                    error={error?.message}
                  />
                )}
              />
            </Col>
            <Col>
              <Controller
                control={control}
                name="postcode"
                render={({
                  field: { onChange, onBlur },
                  fieldState: { error }
                }) => (
                  <Input
                    label="Postcode"
                    placeholder="Enter your postcode"
                    onChange={onChange}
                    onBlur={onBlur}
                    error={error?.message}
                  />
                )}
              />
            </Col>
            <Col>
              <Controller
                control={control}
                name="businessType"
                render={({ field: { value }, fieldState: { error } }) => {
                  return (
                    <Select
                      options={BUSINESS_TYPE}
                      label="Business Type"
                      placeholder="Select business type"
                      error={error?.message}
                      value={value}
                      onChange={(val) =>
                        setValueAndTrigger('businessType', val, value)
                      }
                      isSearchable
                    />
                  );
                }}
              />
            </Col>
            <Col>
              <Controller
                control={control}
                name="contactPersonName"
                render={({
                  field: { onChange, onBlur },
                  fieldState: { error }
                }) => (
                  <Input
                    label="Contact Person Name"
                    placeholder="Enter contact person name"
                    onChange={onChange}
                    onBlur={onBlur}
                    error={error?.message}
                  />
                )}
              />
            </Col>
            <Col>
              <Controller
                control={control}
                name="contactPersonSurname"
                render={({
                  field: { onChange, onBlur },
                  fieldState: { error }
                }) => (
                  <Input
                    label="Contact Person Surname"
                    placeholder="Enter contact person surname"
                    onChange={onChange}
                    onBlur={onBlur}
                    error={error?.message}
                  />
                )}
              />
            </Col>
            <Col>
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { value }, fieldState: { error } }) => (
                  <PhoneNumber
                    value={value}
                    onChange={(val: PhoneValueType) =>
                      setValue('phoneNumber', val, { shouldValidate: true })
                    }
                    error={error}
                  />
                )}
              />
            </Col>
            <Col>
              <Controller
                control={control}
                name="email"
                render={({
                  field: { onChange, onBlur },
                  fieldState: { error }
                }) => (
                  <Input
                    label="Email"
                    placeholder="Enter email"
                    onChange={onChange}
                    onBlur={onBlur}
                    error={error?.message}
                  />
                )}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <Controller
                control={control}
                name="contactPersonsPhoneNumber"
                render={({ field: { value }, fieldState: { error } }) => (
                  <PhoneNumber
                    label="Contact Person Phone Number"
                    value={value}
                    onChange={(val: PhoneValueType) =>
                      setValue('contactPersonsPhoneNumber', val, {
                        shouldValidate: true
                      })
                    }
                    error={error}
                  />
                )}
              />
            </Col>
          </Row>

          <Divider className="bg-light my-5" />
          <div className="flex items-center my-5">
            <FTitle text="Payment" />
            <Button
              type="circle"
              size="sm"
              color="white"
              className="ml-4"
              onClick={() => append(newPayment)}
            >
              <span className="icon-plus text-[30px] cursor-pointer text-green" />
            </Button>
          </div>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                {!!index && <Divider className="bg-light my-8" />}
                <div className="relative">
                  {paymentsRowCount > 1 && (
                    <Button
                      type="circle"
                      size="sm"
                      color="red"
                      className={classNames('absolute right-0 ', {
                        '-top-4': index,
                        '-top-12': !index
                      })}
                      onClick={() => remove(index)}
                    >
                      <span className="icon-trash text-2xl cursor-pointer text-white" />
                    </Button>
                  )}
                  <Row className="flex flex-wrap gap-2 max-w-[908px] ">
                    <Col>
                      <Controller
                        control={control}
                        name={`payments.${index}.currencyType`}
                        render={({
                          field: { value, onChange },
                          fieldState: { error }
                        }) => {
                          return (
                            <Select
                              options={CURRENCY_TYPE}
                              label="Currency Type"
                              placeholder="Select currency type"
                              error={error?.message}
                              value={value}
                              onChange={onChange}
                            />
                          );
                        }}
                      />
                    </Col>
                    <Col>
                      <Controller
                        control={control}
                        name={`payments.${index}.transactionType`}
                        render={({
                          field: { value },
                          fieldState: { error }
                        }) => {
                          return (
                            <Select
                              options={TRANSACTION_TYPE}
                              label="Transaction Type"
                              placeholder="Select transaction type"
                              error={error?.message}
                              value={value}
                              onChange={(val) =>
                                setValueAndTrigger(
                                  `payments.${index}.transactionType`,
                                  val,
                                  value
                                )
                              }
                            />
                          );
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                {values.payments[index].transactionType?.value ===
                  BANK_TRANSFER && (
                  <div>
                    <Row className="flex flex-wrap gap-2 max-w-[908px] my-2">
                      <Col>
                        <Controller
                          control={control}
                          name={`payments.${index}.bankName`}
                          render={({
                            field: { value },
                            fieldState: { error }
                          }) => {
                            return (
                              <Select
                                options={TRANSACTION_TYPE}
                                label="Bank Name"
                                placeholder="Select bank name"
                                error={error?.message}
                                value={value}
                                onChange={(val) =>
                                  setValueAndTrigger(
                                    `payments.${index}.bankName`,
                                    val,
                                    value
                                  )
                                }
                              />
                            );
                          }}
                        />
                      </Col>
                      <Col>
                        <Controller
                          control={control}
                          name={`payments.${index}.branchAddress`}
                          render={({
                            field: { onChange, onBlur },
                            fieldState: { error }
                          }) => (
                            <Input
                              label="Branch Address"
                              placeholder="Enter branch address"
                              onChange={onChange}
                              onBlur={onBlur}
                              error={error?.message}
                            />
                          )}
                        />
                      </Col>
                      <Col>
                        <Controller
                          control={control}
                          name={`payments.${index}.accountNumber`}
                          render={({
                            field: { onChange, onBlur },
                            fieldState: { error }
                          }) => (
                            <Input
                              label="Account No."
                              placeholder="Enter account number"
                              onChange={onChange}
                              onBlur={onBlur}
                              error={error?.message}
                            />
                          )}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Controller
                          control={control}
                          name={`payments.${index}.accountType`}
                          render={({
                            field: { value },
                            fieldState: { error }
                          }) => {
                            return (
                              <Select
                                options={TRANSACTION_TYPE}
                                label="Account Type"
                                placeholder="Select account type"
                                error={error?.message}
                                value={value}
                                onChange={(val) =>
                                  setValueAndTrigger(
                                    `payments.${index}.accountType`,
                                    val,
                                    value
                                  )
                                }
                              />
                            );
                          }}
                        />
                      </Col>
                    </Row>
                  </div>
                )}

                {values.payments[index].transactionType?.value === WALLET && (
                  <Row className="mt-2">
                    <Col>
                      <Controller
                        control={control}
                        name={`payments.${index}.cryptoWalletId`}
                        render={({
                          field: { onChange, onBlur },
                          fieldState: { error }
                        }) => (
                          <Input
                            label="Crypto Wallet ID"
                            placeholder="Enter crypto wallet id"
                            onChange={onChange}
                            onBlur={onBlur}
                            error={error?.message}
                          />
                        )}
                      />
                    </Col>
                  </Row>
                )}
              </div>
            );
          })}
          <Row className="mt-8">
            <Button
              text={edit ? 'Edit' : 'Create'}
              size="sm"
              type="default"
              submit
              color="green"
            />
          </Row>
        </form>
      </FormProvider>
      <PromptModal
        singleButtonType="Back"
        visible={waitingApprovalModalVisible}
        onOk={() => {
          setWaitingApprovalModalVisible(false);
          navigate('/beneficiaries');
        }}
        onCancel={() => {
          setWaitingApprovalModalVisible(false);
          navigate('/beneficiaries');
        }}
        text={`Dear Name your beneficiary has been ${
          edit ? 'edited' : 'created'
        } successfully. Please wait for an approval from the management.`}
        title="Waiting For Approval!"
      />
    </div>
  );
};

export default AddOrEditBeneficiary;
