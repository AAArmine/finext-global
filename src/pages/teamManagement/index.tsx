import Title from '../../components/Title';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from './TeamManagement.module.scss';
import Users from './Users';
import { useState } from 'react';
import Invitations from './Invitations';
import Button from 'components/Button';
import AddTeamMember from './AddTeamMember';
import { useLocation } from 'react-router-dom';
import EmptyTeam from './EmptyTeam';

const TeamManagement = () => {
  const [visible, setVisible] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const empty = params.get('empty');
  return (
    <div className={styles.tabContainer}>
      {empty ? (
        <div>
          <EmptyTeam openInvitePopup={() => setVisible(true)} />
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <Title
              text="Team Management"
              color="green"
              className="pr-3 border-light-800"
            />
            <Button
              type="default"
              size="lg"
              color="light-green"
              textSize="text-sm"
              onClick={() => setVisible(true)}
            >
              Invite a team member
            </Button>
          </div>
          <Tabs className="pt-9">
            <TabList>
              <Tab key="invitations">
                <div>Invitations</div>
              </Tab>
              <Tab key="users">
                <div>Users</div>
              </Tab>
            </TabList>
            <TabPanel key="invitationsPanel">
              <Invitations />
            </TabPanel>
            <TabPanel key="usersPanel">
              <Users />
            </TabPanel>
          </Tabs>
        </>
      )}
      <AddTeamMember visible={visible} onCancel={() => setVisible(false)} />
    </div>
  );
};

export default TeamManagement;
