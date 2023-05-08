import Title from 'components/Title';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/Button';
import PasswordMatch from 'components/PasswordMatch';
import PasswordValidCheck from 'components/PasswordValidCheck';
import { useNavigate } from 'react-router-dom';
import ControlledInput from 'components/ControlledInput';
import PromptModal from 'components/PromptModal';
import { useRef, useState } from 'react';
import {
  RegistrationByInvitationForm,
  regByInvitationSchema
} from '../registerUser/typesAndSchemas';

const RegisterByInvitaion = () => {
  const navigate = useNavigate();
  const navigateLoginTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [visible, setVisible] = useState<boolean>();
  const onSubmitRegUser = async (data: RegistrationByInvitationForm) => {
    console.log(data); // in progress
    setVisible(true);
    navigateLoginTimeout.current = setTimeout(() => {
      navigate('/auth/login');
    }, 5000);
  };

  const onSuccessButtonClick = () => {
    clearTimeout(navigateLoginTimeout.current);
    setVisible(false);
    navigate('/auth/login');
  };
  const formMethods = useForm<RegistrationByInvitationForm>({
    resolver: yupResolver(regByInvitationSchema),
    mode: 'onChange'
  });
  const {
    handleSubmit,
    watch,
    formState: { isValid }
  } = formMethods;
  const inputValues = watch();
  const password = !inputValues.pass ? '' : inputValues.pass;
  return (
    <>
      <Title text="Congratulations, Name Surname!" sizeClass="text-[23px]" />
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmitRegUser)} autoComplete="off">
          <ControlledInput
            name="full_name"
            label="Full Name"
            placeholder="Enter full name here"
            wrapperClass="m-auto pt-6"
          />
          <ControlledInput
            name="position"
            label="Position in Company"
            placeholder="Enter ypur position"
            wrapperClass="m-auto pt-6"
          />
          <PasswordMatch />
          <PasswordValidCheck password={password} />
          <div className="flex justify-center pt-6 mt-20">
            <Button
              type="default"
              text="Save"
              color="light-green"
              size="sm"
              submit
              disabled={!isValid}
            />
          </div>
        </form>
      </FormProvider>
      <PromptModal
        singleButtonType="Login"
        visible={!!visible}
        singleButtonClick={onSuccessButtonClick}
        closable={false}
        text='You will be automatically redirected to a Log In page after 5 seconds, or you can click "Login" below.'
        title="Registration successful"
      />
    </>
  );
};

export default RegisterByInvitaion;
