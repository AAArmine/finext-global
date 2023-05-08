import { Col, Row, Typography } from 'antd';
import Authfooter from 'components/AuthFooter';
import CreateCompanyWrapper from 'components/Wrappers/CreateCompanyWrapper';
import { reqDocuments } from '../constants';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/Button';
import ControlledInputFile from 'components/ControlledInputFile';
import { RegisterThirdStepForm, reqDocSchema } from './typesAndSchemas';
import { uploadDocuments, getCompanyInfo } from 'services/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import useAsyncEffect from 'hooks/useAsyncEffect';
import { LocationState } from 'types/general';

const { Text } = Typography;

const RegisterDocuments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailSubmitted = (location.state as LocationState)?.email;
  const formMethods = useForm<RegisterThirdStepForm>({
    resolver: yupResolver(reqDocSchema),
    mode: 'onTouched'
  });
  const { handleSubmit, setValue, watch } = formMethods;

  const inputValues = watch();

  const handleRegister = async (data: RegisterThirdStepForm) => {
    let companyId;
    try {
      const companyInfo = await getCompanyInfo();
      companyId = companyInfo.data?.return[0]?.id;
    } catch (err) {
      console.log(err);
    }
    try {
      const uploadDocumentsResponse = await uploadDocuments({
        id: companyId,
        'docs[POI]': data.POI?.originFileObj,
        'docs[CWC1]': data.CWC1?.originFileObj,
        'docs[POI2]': data.POI2?.originFileObj,
        'docs[POA]': data.POA?.originFileObj,
        'docs[director_appointment]': data.director_appointment?.originFileObj,
        'docs[assocation_articles]': data.assocation_articles?.originFileObj,
        'docs[notarized_attorny]': data.notarized_attorny?.originFileObj
      });
      if (uploadDocumentsResponse.data.success) {
        navigate('/auth/registration-complete');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CreateCompanyWrapper
      step={reqDocuments.step}
      title={reqDocuments.title}
      description={reqDocuments.description}
      left
      requiredFields
    >
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(handleRegister)} className="mt-5">
          <Row gutter={20} className="pt-5">
            <Col span={12}>
              <ControlledInputFile
                name="POI"
                label="Certificate of The Company Registration"
                onUploadChange={({ fileList }) => {
                  const resultFile = fileList.length ? fileList[0] : undefined;
                  setValue('POI', resultFile, {
                    shouldValidate: true
                  });
                }}
              />
            </Col>
            <Col span={12}>
              <ControlledInputFile
                name="CWC1"
                label="Company Corporate Ownership Chart"
                onUploadChange={({ fileList }) => {
                  const resultFile = fileList.length ? fileList[0] : undefined;
                  setValue('CWC1', resultFile, {
                    shouldValidate: true
                  });
                }}
              />
            </Col>
          </Row>
          <Row gutter={20} className="pt-5">
            <Col span={12}>
              <ControlledInputFile
                name="POI2"
                label="Copies of Identity Proof"
                onUploadChange={({ fileList }) => {
                  const resultFile = fileList.length ? fileList[0] : undefined;
                  setValue('POI2', resultFile, {
                    shouldValidate: true
                  });
                }}
              />
            </Col>
            <Col span={12}>
              <ControlledInputFile
                name="POA"
                label="Evidence of Residential Address"
                onUploadChange={({ fileList }) => {
                  const resultFile = fileList.length ? fileList[0] : undefined;
                  setValue('POA', resultFile, {
                    shouldValidate: true
                  });
                }}
              />
            </Col>
          </Row>
          <Row gutter={20} className="pt-5">
            <Col span={12}>
              <ControlledInputFile
                name="director_appointment"
                label="Directors Appointment Resolution"
                onUploadChange={({ fileList }) => {
                  const resultFile = fileList.length ? fileList[0] : undefined;
                  setValue('director_appointment', resultFile, {
                    shouldValidate: true
                  });
                }}
              />
            </Col>
            <Col span={12}>
              <ControlledInputFile
                name="assocation_articles"
                label="Memorandum & Articles of Association"
                onUploadChange={({ fileList }) => {
                  const resultFile = fileList.length ? fileList[0] : undefined;
                  setValue('assocation_articles', resultFile, {
                    shouldValidate: true
                  });
                }}
              />
            </Col>
          </Row>
          <Row gutter={20} className="pt-5">
            <Col span={12}>
              <ControlledInputFile
                name="notarized_attorny"
                label="Notarized Power of Attorney"
                onUploadChange={({ fileList }) => {
                  const resultFile = fileList.length ? fileList[0] : undefined;
                  setValue('notarized_attorny', resultFile, {
                    shouldValidate: true
                  });
                }}
              />
              <Text className="text-[10px] text-green block text-left mt-[-15px]">
                *Confirming the signatory authority
              </Text>
            </Col>
          </Row>
          <div className="flex justify-between mt-12">
            <Button
              type="default"
              text="Back"
              color="orange"
              size="sm"
              onClick={() =>
                navigate('/auth/register-organization', {
                  state: { email: emailSubmitted }
                })
              }
            />
            <Button
              type="default"
              text="Move Forward"
              color="light-green"
              size="lg"
              submit
              disabled={
                Object.values(inputValues).some((v) => !v) ||
                Object.keys(inputValues).length === 0
              }
            />
          </div>
        </form>
      </FormProvider>
      <Authfooter />
    </CreateCompanyWrapper>
  );
};

export default RegisterDocuments;
