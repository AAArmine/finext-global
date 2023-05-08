import { Col, Row } from 'antd';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import countryList from 'react-select-country-list';
import ControlledSelect from 'components/ControlledSelect';
import ControlledInput from 'components/ControlledInput';
import { idTypes } from 'constants/global';
import PhoneNumber from 'components/PhoneNumber';
import { PhoneValueType } from 'types/general';

const AdditionalInfo = () => {
  const { control, setValue } = useFormContext();
  const countries = useMemo(() => countryList().getData(), []);

  return (
    <>
      <p className="text-green text-sm font-black mt-5">Additional</p>
      <Row gutter={20}>
        <Col span={12}>
          <ControlledSelect
            control={control}
            name="nationalCountry"
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
            name="city"
            label="City"
            placeholder="Enter the city"
            wrapperClass="mt-2.5"
          />
        </Col>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="state"
            label="State/Province"
            placeholder="Enter the state/province"
            wrapperClass="mt-7"
          />
        </Col>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="street"
            label="Street"
            placeholder="Enter the street"
            wrapperClass="mt-7"
          />
        </Col>
        <Col span={12}>
          <ControlledSelect
            control={control}
            name="id_info[type]"
            label="ID Type"
            placeholder="Enter the ID type"
            options={idTypes}
            wrapperClass="mt-7"
            setValue={setValue}
            isSearchable={false}
          />
        </Col>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="nationalID"
            label="ID Number"
            placeholder="Enter the ID number"
            wrapperClass="mt-7"
          />
        </Col>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="id_info[issuer]"
            label="Issued by"
            placeholder="Enter the issuing authority"
            wrapperClass="mt-7"
          />
        </Col>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="id_info[issueDate]"
            label="Date Of Issue"
            placeholder="yyyy-mm-dd"
            wrapperClass="mt-7"
            inputType="date"
            defaultValue="2022-05-28"
          />
        </Col>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="id_info[expDate]"
            label="Expiration Date"
            placeholder="yyyy-mm-dd"
            wrapperClass="mt-7"
            inputType="date"
          />
        </Col>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="nationality"
            label="Nationality"
            placeholder="Enter the nationality"
            wrapperClass="mt-7"
          />
        </Col>
        <Col span={12}>
          <Controller
            control={control}
            name="mobile"
            render={({ field: { value }, fieldState: { error } }) => (
              <PhoneNumber
                label="Phone Number (Mobile)"
                value={value}
                onChange={(val: PhoneValueType) =>
                  setValue('mobile', val, {
                    shouldValidate: true
                  })
                }
                wrapperClass="mt-7"
                error={error}
              />
            )}
          />
        </Col>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="email"
            label="Email"
            placeholder="Enter the email"
            wrapperClass="mt-7"
          />
        </Col>
      </Row>
    </>
  );
};

export default AdditionalInfo;
