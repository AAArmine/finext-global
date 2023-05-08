import { useState } from 'react';
import Title from 'components/Title';
import DataItem from 'components/DataItem/DataItem';
import countryList from 'react-select-country-list';
import { getSingleOfficer, userInfo } from 'services/auth';
import useAsyncEffect from 'hooks/useAsyncEffect';
import { CompanyInfoPropsType } from './types';

const CompanyInformation: React.FC<CompanyInfoPropsType> = ({
  companyInfo
}) => {
  const [personalInfo, setPersonalInfo] = useState<any>();
  const nationalCountry = countryList().data.find(
    (countryItem) => countryItem.value === companyInfo?.nationalCountry
  );
  const country = countryList().data.find(
    (countryItem) => countryItem.value === companyInfo?.country
  );

  useAsyncEffect(async () => {
    try {
      const userData = await userInfo();
      const mobile = userData.data.return.userinfo.mobile;
      const personalInfo = await getSingleOfficer(
        companyInfo.id,
        companyInfo.userEmail
      );
      setPersonalInfo({ ...personalInfo.data.return, mobile });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="flex justify-start items-top pb-3 border-b border-light-800">
        <Title
          text="Company  Information"
          color="green"
          className="pr-3 border-r border-light-800"
        />
        <Title text={companyInfo.fullName} className="ml-3" />
      </div>
      <div className="flex flex-wrap pt-3">
        <DataItem
          title="Company Registration Number"
          data={companyInfo.nationalID}
        />
        <DataItem
          title="Country of Incorporation"
          data={nationalCountry?.label}
        />
        <DataItem title="Company Website" data={companyInfo.webSite} />
        {companyInfo.orgStockInfo.isStockListed && (
          <>
            <DataItem
              title="Name of the Stock Exchange"
              data={companyInfo.bdocs[0].stockName}
            />
            <DataItem
              title="Name of the Parent Company"
              data={companyInfo.bdocs[0].parentOrgName}
            />
            <DataItem
              title="Registration Number"
              data={companyInfo.bdocs[0].parentOrgID}
            />
          </>
        )}
        {companyInfo.orgStockInfo.acceptCards && (
          <DataItem
            title="Merchant Category Code (MCC)"
            data={companyInfo.bdocs[0].mcc}
          />
        )}
      </div>
      <div className="flex flex-wrap justify-start items-top mt-5 py-3 border-t border-light-800">
        <DataItem
          title="Contact Person (Full Name)"
          data={personalInfo?.fullName}
        />
        <DataItem
          title="Role in the Company"
          data={personalInfo?.id_info.position}
        />
        <DataItem title="Phone Number" data={personalInfo?.mobile} />
        <DataItem title="Email" data={personalInfo?.email} />
        <DataItem
          title="Head Office Address"
          data={`${companyInfo.street}, ${companyInfo.city}, ${country?.label}`}
        />
      </div>
    </>
  );
};

export default CompanyInformation;
