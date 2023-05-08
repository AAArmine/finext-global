import successRegisterGif from 'assets/images/successRegister.gif';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import styles from './RegistrationComplete.module.scss';

const { Text } = Typography;

const RegistrationComplete = () => {
  const navigate = useNavigate();
  return (
    <>
      <Text className="text-sm text-secondary font-bold block w-3/5 m-auto mt-8">
        Our team will take some time to check the details you have provided and
        get back to you within 72 hours.
      </Text>
      <Text className="text-sm text-secondary font-bold block w-3/5 m-auto">
        Meanwhile, feel free to browse our website for some interesting content!
      </Text>
      <div className="mt-10 mb-12 flex justify-center">
        <img src={successRegisterGif} className={styles.gif} />
      </div>
      <Text className="text-sm text-secondary font-bold block w-3/5 m-auto mb-6">
        If you would like to change or add any details in the registration form
        you just completed, follow the link in your email.
      </Text>
      <Button
        type="default"
        color="light-green"
        text="Finext Global Website"
        className="m-auto mt-4 mb-20"
        size="lg"
        onClick={() => navigate('')}
      />
    </>
  );
};

export default RegistrationComplete;
