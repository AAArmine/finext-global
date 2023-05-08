import { Col, Row } from 'antd';
import ControlledInput from 'components/ControlledInput';
import ControlledSelect from 'components/ControlledSelect';
import { officersList } from 'constants/input';
import { useFormContext } from 'react-hook-form';

const GeneralInfo = () => {
  const { control, setValue, watch } = useFormContext();
  const officer = watch('id_info[position]');

  return (
    <>
      <p className="text-green text-sm font-black">General</p>
      <Row gutter={20}>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="fullName"
            label="Name Surname"
            placeholder="Enter the name of the officer"
            wrapperClass="mt-2.5"
          />
        </Col>
        <Col span={12}>
          <ControlledSelect
            control={control}
            name="id_info[position]"
            label="Organisation Officers"
            placeholder="Choose"
            options={officersList}
            wrapperClass="mt-2.5"
            isSearchable
            setValue={setValue}
          />
        </Col>
        {officer?.value === 'shareholder' && (
          <Col span={24}>
            <div className="flex items-end text-sm text-secondary font-bold mt-7">
              Shareholder of
              <ControlledInput
                control={control}
                name="shareholderOf"
                wrapperClass="w-28 mx-2"
                inputClass="text-center text-light"
                showErrorText={false}
                type="number"
              />
              % and/or with
              <ControlledInput
                control={control}
                name="votingRights"
                wrapperClass="w-28 mx-2"
                inputClass="text-center text-light"
                showErrorText={false}
                type="number"
              />
              % of voting rights
            </div>
          </Col>
        )}
      </Row>
    </>
  );
};

export default GeneralInfo;
