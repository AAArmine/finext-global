import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from 'antd';
import Button from 'components/Button';
import Title from 'components/Title';
import { FC } from 'react';
import useAsyncEffect from 'hooks/useAsyncEffect';
import { FormProvider, useForm } from 'react-hook-form';
import { ModalProps } from 'types/general';
import { AddOrEditOfficerForm, SetOfficerSchema } from './typesAndSchemas';
import AdditionalInfo from './AdditionalInfo';
import GeneralInfo from './GeneralInfo';
import { ADD_OFFICER } from '../constants';
import { getSingleOfficer, setOfficer } from 'services/auth';
import { PHONE_CODES } from 'constants/phoneCodes';
import styles from './RegisterOrganization.module.scss';
import { officersList } from 'constants/input';
import countryList from 'react-select-country-list';
import moment from 'moment';
import { idTypes } from 'constants/global';

const AddOrEditOrganization: FC<ModalProps> = ({
  visible,
  setVisible,
  add = true,
  officerId,
  companyId,
  setEditOfficerId
}) => {
  const formMethods = useForm<AddOrEditOfficerForm>({
    resolver: yupResolver(SetOfficerSchema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid }
  } = formMethods;

  const handleAddOrEditOfficer = async (data: AddOrEditOfficerForm) => {
    const phoneCode = PHONE_CODES.filter((obj) => {
      if (data.mobile.code === obj.value) return obj;
    })[0].label;

    const phoneNumber = data.mobile.number ?? '';
    try {
      const request = {
        ...(officerId && !add && { id: officerId }),
        fullName: data.fullName,
        'id_info[position]': data.id_info.position.value,
        'id_info[issuer]': data.id_info.issuer,
        'id_info[issueDate]': data.id_info.issueDate,
        'id_info[expDate]': data.id_info.expDate,
        'id_info[type]': data.id_info.type.value,
        ...(data.shareholderOf &&
          data.votingRights && {
            'id_info[note]': `Shareholder of ${data.shareholderOf.toString()}% and/or with ${data.votingRights.toString()}% of voting rights`
          }),
        nationalID: data.nationalID,
        nationalCountry: data.nationalCountry.value.concat(
          ' ',
          data.nationality
        ),
        city: data.city,
        state: data.state,
        street: data.street,
        mobile: phoneCode.concat(' ', phoneNumber.toString()),
        email: data.email
      };
      const setOfficerResponse = await setOfficer(companyId, request);
      if (setOfficerResponse.data.return) {
        setVisible(false);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useAsyncEffect(async () => {
    if (companyId && officerId && !add) {
      try {
        const getOffData = await getSingleOfficer(companyId, officerId);
        const singleOffData = getOffData.data.return;
        const countryAndNationality = singleOffData.nationalCountry
          ? singleOffData.nationalCountry.split(' ')
          : null;
        const nationalCountry =
          countryList().data.find((countryItem) => {
            if (countryAndNationality) {
              return countryItem.value === countryAndNationality[0];
            }
          }) ?? null;
        const position = officersList.find(
          (position) => position.value === singleOffData.id_info.position
        );
        const phoneData = singleOffData.mobile
          ? singleOffData.mobile.split(' ')
          : null;
        const phoneCode =
          PHONE_CODES.filter((obj) => {
            if (phoneData) {
              if (phoneData[0] === obj.label) return obj;
            }
          })[0] || null;
        const idType = idTypes.find(
          (idType) => idType.value === singleOffData.id_info.type
        );

        const shareAndVotingsData = singleOffData.id_info.note ?? null;
        const shareAndVotingsDataArray = shareAndVotingsData?.match(/[0-9]+/g);

        if (singleOffData && !add) {
          reset({
            fullName: singleOffData.fullName,
            email: singleOffData.email,
            ...(singleOffData.city && { city: singleOffData.city }),
            ...(singleOffData.state && { state: singleOffData.state }),
            ...(singleOffData.street && { street: singleOffData.street }),
            ...(singleOffData.nationalID && {
              nationalID: singleOffData.nationalID
            }),
            ...(nationalCountry && { nationalCountry }),
            ...(countryAndNationality && {
              nationality: countryAndNationality[1]
            }),
            ...(shareAndVotingsDataArray?.length && {
              shareholderOf: shareAndVotingsDataArray[0]
            }),
            ...(shareAndVotingsDataArray?.length && {
              votingRights: shareAndVotingsDataArray[1]
            }),
            id_info: {
              ...(singleOffData.id_info.issuer && {
                issuer: singleOffData.id_info.issuer
              }),
              ...(position && { position }),
              ...(singleOffData.id_info.issueDate && {
                issueDate: moment(singleOffData.id_info.issueDate)
              }),
              ...(singleOffData.id_info.expDate && {
                expDate: moment(singleOffData.id_info.expDate)
              }),
              type: idType
            },
            mobile: {
              ...(phoneCode && { code: phoneCode.value, number: phoneData[1] })
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [companyId, officerId, add]);

  const handleModalCancel = () => {
    if (officerId && setEditOfficerId) {
      setEditOfficerId('');
    }
    setVisible(false);
    window.location.reload();
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleModalCancel}
      title={
        <Title
          sizeClass="text-2xl"
          text={add ? ADD_OFFICER.ADD.title : ADD_OFFICER.EDIT.title}
          className="text-center"
        />
      }
      centered
      width={688}
      footer={null}
      className={styles.modalContainer}
    >
      <div>
        <div className="text-left py-3 px-7 absolute top-0 left-0 text-sm">
          <span className="text-green text-xs">* All fields are required</span>
        </div>
        <FormProvider {...formMethods}>
          <form
            onSubmit={handleSubmit(handleAddOrEditOfficer)}
            className="mt-5"
          >
            <GeneralInfo />
            <AdditionalInfo />
            <div className="flex justify-center w-1/3 m-auto mt-12">
              {!add && (
                <Button
                  type="default"
                  text="Back"
                  color="orange"
                  size="sm"
                  onClick={handleModalCancel}
                  className="mx-2"
                />
              )}
              <Button
                type="default"
                text={
                  add ? ADD_OFFICER.ADD.buttonName : ADD_OFFICER.EDIT.buttonName
                }
                color="light-green"
                size="sm"
                className="mx-2"
                submit
                disabled={!isValid}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </Modal>
  );
};

export default AddOrEditOrganization;
