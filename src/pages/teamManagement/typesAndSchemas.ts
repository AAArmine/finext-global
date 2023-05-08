import { REQUIRED_TEXT, VALID_EMAIL_TEXT } from 'constants/global';
import * as yup from 'yup';
import { SelectValueType } from 'types/general';

export type UserRow = {
  fullName: string;
  email: string;
  position: string;
  role: string;
  status: string;
  key: string;
};

export type InvitationRow = {
  date: string;
  email: string;
  status: string;
  role: string;
  key: string;
};

export const EditUserSchema = yup.object().shape({
  id: yup.object().required(REQUIRED_TEXT)
});
export type EditUserForm = {
  id: string;
};

export type AddMemberProps = {
  visible: boolean;
  onCancel: () => void;
};

export type EmptyTeamProps = {
  openInvitePopup: () => void;
};

export type TeamMember = {
  email: string;
  role: SelectValueType<string>;
};

export type TeamMembers = {
  teamMembers: TeamMember[];
};
export const AddTeamMemberSchema = yup.object().shape({
  teamMembers: yup.array().of(
    yup.object().shape({
      email: yup.string().email(VALID_EMAIL_TEXT).required(REQUIRED_TEXT),
      role: yup.object().required(REQUIRED_TEXT)
    })
  )
});
