import { Col, Row } from 'antd';
import ControlledInput from 'components/ControlledInput';
import Title from 'components/Title';
import { useFormContext } from 'react-hook-form';

const PersonalInfo = () => {
  const { control } = useFormContext();
  return (
    <>
      <Title sizeClass="text-2xl" text="Personal Information" />
      <Row gutter={20}>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="personalInfo.fullName"
            label="Full Name"
            placeholder="Enter your name"
            wrapperClass="mt-7"
          />
        </Col>
        <Col span={12}>
          <ControlledInput
            control={control}
            name="personalInfo.position"
            label="Position in Company"
            placeholder="Enter your position"
            wrapperClass="mt-7"
          />
        </Col>
      </Row>
    </>
  );
};

export default PersonalInfo;
