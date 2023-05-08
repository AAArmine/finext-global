import ControlledInput from 'components/ControlledInput';

const PasswortMatch = () => {
  return (
    <>
      <ControlledInput
        name="pass"
        type="password"
        label="Password"
        placeholder="*************"
        wrapperClass="m-auto mt-5"
        autoComplete="new-password"
      />
      <ControlledInput
        name="confirmPass"
        type="password"
        label="Repeat Password"
        placeholder="*************"
        wrapperClass="m-auto mt-5"
      />
    </>
  );
};

export default PasswortMatch;
