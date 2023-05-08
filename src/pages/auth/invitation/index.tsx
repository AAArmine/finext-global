import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import Title from 'components/Title';
import InvitationSplash from 'assets/images/InvitationSplash';

const { Text } = Typography;

const Invitation = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <Title text="Congratulations, Name Surname!" sizeClass="text-[23px]" />
      <Text className="text-sm text-secondary font-bold block w-3/5 m-auto mt-8">
        You have been added to [Company Name] in the role of Authorizer!
      </Text>
      <Text className="text-sm text-secondary font-bold block w-3/5 m-auto mb-8">
        Please, set a strong password for your account in the next step.
      </Text>
      <InvitationSplash />
      <Text className="text-sm text-secondary font-bold block w-3/5 m-auto mt-8">
        We are sure you will enjoy your experience with Finext Global Systems.
      </Text>
      <Text className="text-sm text-secondary font-bold block w-3/5 m-auto mb-8">
        Feel free to ask any questions you will have in the live chat in the
        corner!
      </Text>
      <Button
        type="default"
        color="light-green"
        text="Next"
        className="m-auto mt-4 mb-10"
        size="sm"
        onClick={() => navigate('/auth/register-after-invitation')}
      />
    </div>
  );
};

export default Invitation;
