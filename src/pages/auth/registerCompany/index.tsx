import { useEffect } from 'react';
import PersonalInfo from './PersonalInfo';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  RegisterFirstStepForm,
  RegisterFirstStepSchema
} from './typesAndSchemas';
import Button from 'components/Button';
import AuthFooter from 'components/AuthFooter';
import CompanyInfo from './CompanyInfo';
import { createCompany, getCompanyInfo, setOfficer } from 'services/auth';
import CreateCompanyWrapper from 'components/Wrappers/CreateCompanyWrapper';
import { regCompany } from '../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import useAsyncEffect from 'hooks/useAsyncEffect';
import countryList from 'react-select-country-list';
import { BOOL_SELECT_DATA } from 'constants/global';
import { LocationState } from 'types/general';
import { useDispatch } from 'react-redux';
import { authUserInfo } from 'redux/slices/authUserInfoSlice';

const RegisterCompany = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState<any>(null);
  const location = useLocation();
  const emailSubmitted = (location.state as LocationState)?.email;
  const dispatch = useDispatch();
  const formMethods = useForm<RegisterFirstStepForm>({
    resolver: yupResolver(RegisterFirstStepSchema),
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const {
    handleSubmit,
    formState: { isValid },
    reset,
    watch
  } = formMethods;

  const setPersonalData = async (personalData: any) => {
    const companyInfo = await getCompanyInfo();
    try {
      const createPersonalInfoResponse = await setOfficer(
        companyInfo.data.return[0].id,
        personalData
      );
      if (createPersonalInfoResponse.data.success) {
        return navigate('/auth/register-organization', {
          state: { email: emailSubmitted }
        });
      } else {
        alert(createPersonalInfoResponse.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const inputValues = watch();
  const [isStockExchange, doesAcceptCards] = watch([
    'companyInfo.orgStockInfo.isStockListed',
    'companyInfo.orgStockInfo.acceptCards'
  ]);

  useEffect(() => {
    const isStockExchangeValue = isStockExchange?.value;
    const doesAcceptCardsValue = doesAcceptCards?.value;
    reset(
      {
        personalInfo: {
          fullName: inputValues?.personalInfo?.fullName,
          position: inputValues?.personalInfo?.position
        },
        companyInfo: {
          country: inputValues?.companyInfo?.country,
          nationalCountry: inputValues?.companyInfo?.nationalCountry,
          fullName: inputValues?.companyInfo?.fullName,
          nationalID: inputValues?.companyInfo?.nationalID,
          webSite: inputValues?.companyInfo?.webSite,
          city: inputValues?.companyInfo?.city,
          street: inputValues?.companyInfo?.street,
          zip: inputValues?.companyInfo?.zip,
          orgStockInfo: {
            isStockListed: isStockExchange,
            acceptCards: doesAcceptCards,
            ...(!isStockExchangeValue
              ? {
                  stockName: '',
                  parentOrgName: '',
                  parentOrgID: ''
                }
              : {
                  stockName: inputValues?.companyInfo?.orgStockInfo?.stockName,
                  parentOrgName:
                    inputValues?.companyInfo?.orgStockInfo?.parentOrgName,
                  parentOrgID:
                    inputValues?.companyInfo?.orgStockInfo?.parentOrgID
                }),
            ...(!doesAcceptCardsValue
              ? {
                  mcc: undefined
                }
              : { mcc: inputValues?.companyInfo?.orgStockInfo?.mcc })
          }
        }
      },
      {
        keepErrors: true,
        keepDirty: true
      }
    );
  }, [isStockExchange, doesAcceptCards]);

  const handleRegister = async (data: RegisterFirstStepForm) => {
    const isStockExchange = data.companyInfo.orgStockInfo.isStockListed.value;
    const acceptCards = data.companyInfo.orgStockInfo.acceptCards.value;
    try {
      const request = {
        ...(companyData && { id: companyData.id }),
        fullName: data.companyInfo.fullName,
        nationalID: data.companyInfo.nationalID,
        nationalCountry: data.companyInfo.nationalCountry.value,
        webSite: data.companyInfo.webSite,
        country: data.companyInfo.country.value,
        city: data.companyInfo.city,
        street: data.companyInfo.street,
        zip: data.companyInfo.zip,
        'orgStockInfo[isStockListed]': isStockExchange,
        'orgStockInfo[stockName]': isStockExchange
          ? data.companyInfo.orgStockInfo.stockName
          : '',
        'orgStockInfo[parentOrgName]': isStockExchange
          ? data.companyInfo.orgStockInfo.parentOrgName
          : '',
        'orgStockInfo[parentOrgID]': isStockExchange
          ? data.companyInfo.orgStockInfo.parentOrgID
          : '',
        'orgStockInfo[acceptCards]': acceptCards,
        'orgStockInfo[mcc]': acceptCards
          ? data.companyInfo.orgStockInfo.mcc
          : ''
      };
      await createCompany(request);
      const requestPersonalInfo = {
        ...(emailSubmitted && { email: emailSubmitted }),
        fullName: data.personalInfo.fullName,
        'id_info[position]': data.personalInfo.position
      };
      setPersonalData(requestPersonalInfo);
    } catch (err) {
      console.log(err);
    }
  };

  useAsyncEffect(async () => {
    try {
      const companyInfo = await getCompanyInfo();
      setCompanyData(companyInfo.data.return[0]);
      dispatch(authUserInfo({ ...companyInfo, userEmail: emailSubmitted }));
      const companyData = companyInfo.data.return[0];
      const nationalCountry = countryList().data.find(
        (countryItem) => countryItem.value === companyData?.nationalCountry
      );
      const country = countryList().data.find(
        (countryItem) => countryItem.value === companyData?.country
      );
      const isStockListed = BOOL_SELECT_DATA.find(
        (booleanData: any) =>
          booleanData.value == companyData?.orgStockInfo.isStockListed
      );
      const acceptCards = BOOL_SELECT_DATA.find(
        (booleanData: any) =>
          booleanData.value == companyData?.orgStockInfo.acceptCards
      );
      const authUserData = companyData?.officers.find(
        (officer: any) => officer.email === emailSubmitted
      );
      reset({
        personalInfo: {
          fullName: authUserData?.fullName,
          position: authUserData?.id_info.position
        },
        companyInfo: {
          fullName: companyData?.fullName,
          nationalID: companyData?.nationalID,
          nationalCountry,
          webSite: companyData?.webSite,
          country,
          city: companyData?.city,
          street: companyData?.street,
          zip: companyData?.zip,
          orgStockInfo: {
            isStockListed,
            acceptCards: acceptCards,
            mcc: companyData?.orgStockInfo.mcc,
            parentOrgName: companyData?.orgStockInfo.parentOrgName,
            stockName: companyData?.orgStockInfo.stockName,
            parentOrgID: companyData?.orgStockInfo.parentOrgID
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <CreateCompanyWrapper
      step={regCompany.step}
      title={regCompany.title}
      description={regCompany.description}
      requiredFields
    >
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(handleRegister)} className="mt-5">
          <PersonalInfo />
          <CompanyInfo />
          <Button
            type="default"
            text="Move Forward"
            color="light-green"
            size="lg"
            className="mt-12 float-right"
            submit
            disabled={!isValid}
          />
        </form>
      </FormProvider>
      <AuthFooter />
    </CreateCompanyWrapper>
  );
};

export default RegisterCompany;
