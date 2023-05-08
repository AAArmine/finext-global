import { useRef, useState } from 'react';
import Title from 'components/Title';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './CompanyProfile.module.scss';
import classNames from 'classnames';
import { getOfficerList } from 'services/auth';
import { CompanyInfoPropsType } from './types';
import useAsyncEffect from 'hooks/useAsyncEffect';
import DataItem from 'components/DataItem/DataItem';
import countryList from 'react-select-country-list';
import moment from 'moment';

const OrganizationOfficers: React.FC<CompanyInfoPropsType> = ({
  companyInfo
}) => {
  const [scrollRightBtn, setScrollRightBtn] = useState<boolean>(false);
  const [scrollLeftBtn, setScrollLeftBtn] = useState<boolean>(false);
  const scrollElement = useRef<null | HTMLDivElement>(null);
  const [officersList, setOfficersList] = useState<any>();

  const scroll = (scrollOffset: number) => {
    if (scrollElement.current != null) {
      const scrollElWidth = scrollElement.current?.scrollWidth;
      const scrollElCont = scrollElement.current?.clientWidth;
      scrollElement.current.scrollLeft += scrollOffset;
      const scrollPosition = scrollElement.current?.scrollLeft;
      scrollElCont &&
      scrollElWidth &&
      scrollElWidth > scrollElCont &&
      scrollElWidth > scrollPosition + scrollElCont + 20
        ? setScrollRightBtn(true)
        : setScrollRightBtn(false);

      scrollElCont && scrollElWidth && scrollPosition > 0
        ? setScrollLeftBtn(true)
        : setScrollLeftBtn(false);
    }
  };
  useAsyncEffect(async () => {
    const officersList = await getOfficerList({
      cstID: companyInfo?.id
    });

    const activeOfficers = officersList?.data.return.filter((item: any) => {
      if (item.id !== companyInfo.userEmail) {
        return item.teamMember.role !== '';
      }
    });
    setOfficersList(activeOfficers);
    const scrollElWidth = scrollElement.current?.scrollWidth;
    const scrollElCont = scrollElement.current?.clientWidth;
    scrollElWidth &&
      scrollElCont &&
      scrollElWidth > scrollElCont &&
      setScrollRightBtn(true);
  }, []);

  const displayCountry = (countryAndNationality: string) => {
    const [countryValue] = countryAndNationality.split(' ');
    const country = countryList().data.find(
      (countryItem) => countryItem.value === countryValue
    );
    return country?.label;
  };

  const displayNationality = (countryAndNationality: string) => {
    const [, ...nationality] = countryAndNationality.split(' ');
    const natinality = nationality.join(' ');
    return natinality;
  };

  return (
    <>
      <div className="flex justify-start items-top pb-3 border-b border-light-800">
        <Title
          text="Organization Officers"
          color="green"
          className="pr-3 border-light-800"
        />
      </div>
      <div
        className={classNames(styles.tabContainer, 'h-80')}
        ref={scrollElement}
      >
        <Tabs>
          <TabList>
            <div className={styles.tabListContainer}>
              {officersList &&
                officersList.map((officer: any) => (
                  <Tab key={officer.id}>
                    <div>
                      {officer.fullName}
                      {officer.id_info.position === 'shareholder' && (
                        <span className="lighter"> {officer.id_info.note}</span>
                      )}
                    </div>
                  </Tab>
                ))}
            </div>
          </TabList>
          <div className="absolute left-4 top-[85px]">
            {scrollLeftBtn && (
              <span
                onClick={() => scroll(-40)}
                className="icon-arrow-left-circle text-2xl text-green mr-3 bg-white "
              />
            )}
          </div>
          <div className="absolute right-4 top-[85px]">
            {scrollRightBtn && (
              <span
                onClick={() => scroll(40)}
                className="icon-arrow-right-circle text-2xl text-green bg-white"
              />
            )}
          </div>
          <div className={styles.tabPanel}>
            {officersList &&
              officersList.map((officer: any) => (
                <TabPanel key={officer.id}>
                  <div
                    key={officer.id}
                    className={classNames(
                      styles.dataItemCont,
                      'flex flex-wrap pt-3 relative'
                    )}
                  >
                    <DataItem title="Street" data={officer.street} />
                    <DataItem title="City" data={officer.city} />
                    <DataItem title="State/Province" data={officer.state} />
                    <DataItem
                      title="Country"
                      data={displayCountry(officer.nationalCountry)}
                    />
                    <DataItem
                      title="ID Type"
                      data={
                        officer.id_info.type === 'passport' ? 'Passport' : 'ID'
                      }
                    />
                    <DataItem title="ID Number" data={officer.nationalID} />
                    <DataItem title="Issued by" data={officer.id_info.issuer} />
                    <DataItem
                      title="Date of Issue"
                      data={moment(officer.id_info.issueDate).format(
                        'YYYY-MM-DD'
                      )}
                    />
                    <DataItem
                      title="Expiration Date"
                      data={moment(officer.id_info.expDate).format(
                        'YYYY-MM-DD'
                      )}
                    />
                    <DataItem
                      title="Nationality"
                      data={displayNationality(officer.nationalCountry)}
                    />
                    <DataItem title="Phone Number" data={officer.mobile} />
                    <DataItem title="Email" data={officer.email} />
                  </div>
                </TabPanel>
              ))}
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default OrganizationOfficers;
