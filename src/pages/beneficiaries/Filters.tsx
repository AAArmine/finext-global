import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Row, Col } from 'antd';
import { useForm, FormProvider } from 'react-hook-form';
import countryList from 'react-select-country-list';
import ControlledSelect from 'components/ControlledSelect';
import ControlledInput from 'components/ControlledInput';
import { TRANSACTION_TYPE } from './constants';
import { FormValues, FilterSchema } from './typesAndSchemas';

const Filters: React.FC = () => {
  const countries = useMemo(() => countryList().getData(), []);
  const formMethods = useForm<FormValues>({
    resolver: yupResolver(FilterSchema),
    mode: 'onChange'
  });
  const { handleSubmit, control, setValue } = formMethods;

  const onSubmitSearch = (data: FormValues) => {
    //TODO: Get the submittion data
    console.log('data', data);
  };
  return (
    <FormProvider {...formMethods}>
      <form className="mt-5 w-full" onSubmit={handleSubmit(onSubmitSearch)}>
        <Col>
          <ControlledInput
            name="search"
            label="Search"
            placeholder="Find By: Name / Email / Phone Number"
            wrapperClass="w-full"
          />
          <button
            type="submit"
            className="icon-search absolute top-6 right-2 text-2xl text-green"
          ></button>
        </Col>
        <Row gutter={16}>
          <Col>
            <ControlledSelect
              control={control}
              name="country"
              label="Country"
              placeholder="Country"
              options={countries}
              wrapperClass="mt-7"
              setValue={setValue}
            />
          </Col>
          <Col>
            <ControlledSelect
              control={control}
              name="payment"
              label="Payment Method"
              placeholder="Payment Method"
              options={TRANSACTION_TYPE}
              wrapperClass="mt-7"
              setValue={setValue}
            />
          </Col>
        </Row>
      </form>
    </FormProvider>
  );
};

export default Filters;
