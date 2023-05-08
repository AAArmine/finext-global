import React from 'react';
import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import UserLayout from 'components/Layouts/UserLayout';
import Dashboard from 'pages/dashboard';
import UserManagement, { AddUser, EditUser } from 'pages/userManagement';
import MyWallet from 'pages/wallet';
import Beneficiaries from 'pages/beneficiaries';
import BeneficiaryDetails from 'pages/beneficiaries/BeneficiaryDetails';
import UserPermissions from 'pages/userManagement/UserPermissions';
import AddOrEditBeneficiary from 'pages/beneficiaries/AddOrEditBeneficiary';
import BeneficiariesForApproval from 'pages/beneficiariesForApproval';
import CreateTransaction from 'pages/createTransaction';
import TransactionsForApproval from 'pages/transactionsForApproval';
import EmailSubmit from 'pages/resetPassword/emailSubmit';
import CreateNewPassword from 'pages/resetPassword/createNewPass';
import EmailSent from 'pages/resetPassword/emailSent';
import ResetPasswordSuccess from 'pages/resetPassword/resetPasswordSuccess';
import AuthLayout from 'components/Layouts/AuthLayout';
import Login from 'pages/auth/login';
import VerifyLogin from 'pages/auth/verifyLogin';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import RegisterCompany from 'pages/auth/registerCompany';
import RegisterOrganization from 'pages/auth/registerOrganization';
import RegisterUser from 'pages/auth/registerUser';
import VerifyRegisterUser from 'pages/auth/verifyRegisterUser';
import RegisterDocuments from 'pages/auth/registerDocuments';
import RegistrationComplete from 'pages/auth/registrationComplete';
import CompanyProfile from 'pages/companyProfile';
import TeamManagement from 'pages/teamManagement';
import Invitation from 'pages/auth/invitation';
import RegisterByInvitaion from 'pages/auth/registerByInvitation';

const Routes: React.FC = (): JSX.Element => {
  return (
    <>
      <ReactRoutes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/" element={<UserLayout withoutSidebar={true} />}>
          <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
        </Route>
        <Route path="" element={<UserLayout singleContainer={false} />}>
          <Route
            path="profile"
            element={<PrivateRoute component={CompanyProfile} />}
          />
        </Route>
        <Route path="" element={<UserLayout singleContainer={false} />}>
          <Route
            path="beneficiaries/details"
            element={<PrivateRoute component={BeneficiaryDetails} />}
          />
        </Route>
        <Route path="" element={<UserLayout />}>
          <Route path="user-management">
            <Route
              path=""
              element={<PrivateRoute component={UserManagement} />}
            />
            <Route path="add" element={<PrivateRoute component={AddUser} />} />
            <Route
              path="edit"
              element={<PrivateRoute component={EditUser} />}
            />
            <Route
              path="permissions"
              element={<PrivateRoute component={UserPermissions} />}
            />
          </Route>
          <Route
            path="wallet"
            element={<PrivateRoute component={MyWallet} />}
          />
          <Route path="beneficiaries">
            <Route
              path=""
              element={<PrivateRoute component={Beneficiaries} />}
            />
            <Route
              path="add"
              element={<PrivateRoute component={AddOrEditBeneficiary} />}
            />
            <Route
              path="edit"
              element={<PrivateRoute component={AddOrEditBeneficiary} edit />}
            />
          </Route>
          <Route
            path="create-transaction"
            element={<PrivateRoute component={CreateTransaction} />}
          />
          <Route path="/awaiting-approvals">
            <Route
              path="beneficiaries"
              element={<PrivateRoute component={BeneficiariesForApproval} />}
            />
            <Route
              path="transactions"
              element={<PrivateRoute component={TransactionsForApproval} />}
            />
          </Route>
          <Route
            path="team-management"
            element={<PrivateRoute component={TeamManagement} />}
          />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<PublicRoute component={Login} />} />
          <Route
            path="verify"
            element={<PrivateRoute component={VerifyLogin} />}
          />
          <Route
            path="email-submit"
            element={<PublicRoute component={EmailSubmit} />}
          />
          <Route
            path="email-sent"
            element={<PublicRoute component={EmailSent} />}
          />
          <Route
            path="create-password"
            element={<PublicRoute component={CreateNewPassword} />}
          />
          <Route
            path="success"
            element={<PublicRoute component={ResetPasswordSuccess} />}
          />
          <Route
            path="register-company"
            element={<PrivateRoute component={RegisterCompany} />}
          />
          <Route
            path="register-organization"
            element={<PrivateRoute component={RegisterOrganization} />}
          />
          <Route
            path="register-documents"
            element={<PrivateRoute component={RegisterDocuments} />}
          />
          <Route
            path="registration-complete"
            element={<PrivateRoute component={RegistrationComplete} />}
          />
          <Route
            path="register-user"
            element={<PublicRoute component={RegisterUser} />}
          />
          <Route
            path="register-user-verify"
            element={<PublicRoute component={VerifyRegisterUser} />}
          />
          <Route
            path="invitation"
            element={<PublicRoute component={Invitation} />}
          />
          <Route
            path="register-after-invitation"
            element={<PublicRoute component={RegisterByInvitaion} />}
          />
        </Route>
        <Route path="*" element={<>Not Found</>} />
      </ReactRoutes>
    </>
  );
};

export default Routes;
