import TeamManagementLanding from 'assets/images/TeamManagementLanding';
import Button from 'components/Button';
import Title from 'components/Title';
import { EmptyTeamProps } from './typesAndSchemas';

const EmptyTeam: React.FC<EmptyTeamProps> = ({ openInvitePopup }) => {
  return (
    <>
      <div className="flex justify-start items-center">
        <Title text="Team Management" color="green" />
      </div>
      <div className="flex mt-4 flex-col items-center">
        <Title text="You haven't added any team member yet." />
        <Button
          type="default"
          size="lg"
          color="light-green"
          textSize="text-sm"
          className="mt-7"
          onClick={openInvitePopup}
        >
          Invite a team member
        </Button>
      </div>
      <TeamManagementLanding className="mt-20 mx-auto" />
    </>
  );
};

export default EmptyTeam;
