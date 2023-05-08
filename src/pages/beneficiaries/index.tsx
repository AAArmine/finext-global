import { useState } from 'react';
import Title from 'components/Title';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from './Beneficiaries.module.scss';
import { BENEFICIARY_STATUS } from './constants';
import BeneficiaryTable from './BeneficiaryTable';
import { Row, Col } from 'antd';
import { BeneficiaryStatus } from './typesAndSchemas';

const Beneficiaries: React.FC = () => {
  const navigate = useNavigate();
  const [beneficiaryStatus, setBeneficiaryStatus] =
    useState<BeneficiaryStatus>('Pending');

  return (
    <>
      <div className="flex justify-start items-center">
        <Title text="My Beneficiaries" color="green" />
        <span
          className="icon-plus ml-5 text-3xl cursor-pointer text-green"
          onClick={() => navigate('/beneficiaries/add')}
        ></span>
      </div>
      <Row className="relative top-20 z-10">
        <Filters />
      </Row>
      <Row className={styles.tabContainer}>
        <Tabs>
          <Col className="relative top-[-200px]">
            <TabList>
              {BENEFICIARY_STATUS.map((status) => (
                <Tab
                  key={status}
                  onClick={() => {
                    setBeneficiaryStatus(status);
                  }}
                >
                  <div key={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </div>
                </Tab>
              ))}
            </TabList>
          </Col>
          <Col className="relative top-[-50px]">
            {BENEFICIARY_STATUS.map((status) => (
              <TabPanel key={status}>
                <BeneficiaryTable beneficiaryStatus={beneficiaryStatus} />
              </TabPanel>
            ))}
          </Col>
        </Tabs>
      </Row>
    </>
  );
};

export default Beneficiaries;
