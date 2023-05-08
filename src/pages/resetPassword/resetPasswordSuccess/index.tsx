import SuccessResetPass from 'assets/images/SuccessResetPass';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';

const ResetPasswordSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="text-[23px] font-black pb-6">Success</h2>
      <p className="text-sm font-bold">
        Your password was successfully changed!
      </p>
      <div className="mt-10 mb-12 flex justify-center">
        <SuccessResetPass />
      </div>
      <Button
        type="default"
        color="light-green"
        text="Login"
        className="m-auto mt-4 mb-20"
        size="sm"
        onClick={() => navigate('/auth/login')}
      />
    </>
  );
};

export default ResetPasswordSuccess;
