import { Col, Divider, Row } from 'antd';
import Title from 'components/Title';
import { BOOL_SELECT_DATA } from 'constants/global';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import countryList from 'react-select-country-list';
import ControlledSelect from 'components/ControlledSelect';
import ControlledInput from 'components/ControlledInput';

const CompanyInfo = () => {
  const { control, setValue, watch } = useFormContext();
  const countries = useMemo(() => countryList().getData(), []);
  const [isStockExchange, doesAcceptCards] = watch([
    'companyInfo.orgStockInfo.isStockListed',
    'companyInfo.orgStockInfo.acceptCards'
  ]);

  return (
    <>
      <Title sizeClass="text-2xl" text="Company Information" className="mt-7" />
      <Row gutter={20}>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="companyInfo.fullName"
            label="Company Name"
            placeholder="Enter the full name of the company"
            wrapperClass="mt-7"
          />
        </Col>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="companyInfo.nationalID"
            label="Company Registration Number"
            placeholder="Enter the company registration number"
            wrapperClass="mt-7"
          />
        </Col>
        <Col span={12}>
          <ControlledSelect
            control={control}
            name="companyInfo.nationalCountry"
            label="Country of Incorporation"
            placeholder="Enter the country of incorporation"
            options={countries}
            wrapperClass="mt-7"
            setValue={setValue}
          />
        </Col>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="companyInfo.webSite"
            label="Company website"
            placeholder="Enter the company website link"
            wrapperClass="mt-7"
          />
        </Col>
        <span className="text-green text-sm font-black pl-2.5 mt-7 w-full text-left">
          Head Office Full Address
        </span>
        <Col span={12}>
          <ControlledSelect
            control={control}
            name="companyInfo.country"
            label="Country"
            placeholder="Enter the country"
            options={countries}
            wrapperClass="mt-2.5"
            setValue={setValue}
          />
        </Col>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="companyInfo.city"
            label="City"
            placeholder="Enter the city"
            wrapperClass="mt-2.5"
          />
        </Col>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="companyInfo.street"
            label="Street"
            placeholder="Enter the street"
            wrapperClass="mt-7"
          />
        </Col>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="companyInfo.zip"
            label="Zip Code"
            placeholder="Enter the zip code"
            wrapperClass="mt-7"
          />
        </Col>
        <Col span={24}>
          <Divider className="bg-green my-7" />
          <ControlledSelect
            control={control}
            name="companyInfo.orgStockInfo.isStockListed"
            label="Is the company or the parent company listed on regulated stock exchange?"
            placeholder="Yes/No"
            options={BOOL_SELECT_DATA}
            wrapperClass="w-full"
            isSearchable={false}
            setValue={setValue}
          />
        </Col>
        {!!isStockExchange?.value && (
          <>
            <Col span={12}>
              <ControlledInput
                control={control}
                name="companyInfo.orgStockInfo.stockName"
                label="Name Of The Stock Exchange"
                placeholder="Enter the stock exchange name"
                wrapperClass="mt-7"
              />
            </Col>
            <Col span={12}>
              <ControlledInput
                control={control}
                name="companyInfo.orgStockInfo.parentOrgName"
                label="Name Of The Parent Company"
                placeholder="Enter the parent company name"
                wrapperClass="mt-7"
              />
            </Col>
            <Col span={12}>
              <ControlledInput
                control={control}
                name="companyInfo.orgStockInfo.parentOrgID"
                label="Registration Number"
                placeholder="Enter the registration number"
                wrapperClass="mt-7"
              />
            </Col>
          </>
        )}
        <Col span={24}>
          <ControlledSelect
            control={control}
            name="companyInfo.orgStockInfo.acceptCards"
            label="Does the company accept Credit/Debit/Prepaid cards?"
            placeholder="Yes/No"
            options={BOOL_SELECT_DATA}
            wrapperClass="mt-7 w-full"
            setValue={setValue}
            isSearchable={false}
          />
        </Col>
        {!!doesAcceptCards?.value && (
          <Col span={12}>
            <ControlledInput
              control={control}
              name="companyInfo.orgStockInfo.mcc"
              label="Merchant Category Code (MCC)"
              placeholder="Enter the MCC code"
              wrapperClass="mt-7"
              type="number"
            />
          </Col>
        )}
      </Row>
    </>
  );
};

export default CompanyInfo;
