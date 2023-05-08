import CompanyInformation from './CompanyInformation';
import OrganizationOfficers from './OrganizationOfficers';
import Documents from './Documents';
import styles from './CompanyProfile.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import classNames from 'classnames';

const CompanyProfile: React.FC = () => {
  const companyData = useSelector((state: RootState) => state.authUserInfo);
  return (
    <>
      <div className={styles.contentContainer}>
        <CompanyInformation companyInfo={companyData} />
      </div>
      <div className={styles.contentContainer}>
        <OrganizationOfficers companyInfo={companyData} />
      </div>
      <div className={classNames(styles.contentContainer, 'mb-5')}>
        <Documents />
      </div>
    </>
  );
};

export default CompanyProfile;
