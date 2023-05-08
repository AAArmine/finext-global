import { useEffect, useState } from 'react';
import styles from './AuthLayout.module.scss';
import RegisterStepIcon from 'assets/images/RegisterStepIcon';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import useAsyncEffect from 'hooks/useAsyncEffect';
import { getOfficerList } from 'services/auth';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { LocationState } from 'types/general';

const data = [
  {
    title: 'Company Profile',
    link: '/auth/register-company',
    width: 'w-20',
    index: 1
  },
  {
    title: 'Organisation Officers',
    link: '/auth/register-organization',
    width: 'w-28',
    index: 2
  },
  {
    title: 'Required Documents',
    link: '/auth/register-documents',
    width: 'w-24',
    index: 3
  }
];

const Stepper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [officersInfo, setOfficersInfo] = useState<number>();
  const emailSubmitted = (location.state as LocationState)?.email;
  const companyInfo = useSelector((state: RootState) => state.authUserInfo);

  const handleNavigate = (item: typeof data[0]) => {
    if (
      step > item.index ||
      ((item.index === 2 || item.index === 3) && officersInfo) ||
      (item.index === 2 && companyInfo?.data?.return[0]?.fullName)
    ) {
      setStep(item.index);
      navigate(item.link, { state: { email: emailSubmitted } });
    }
  };

  useAsyncEffect(async () => {
    setStep(
      location.pathname === '/auth/register-company'
        ? 1
        : location.pathname === '/auth/register-organization'
        ? 2
        : 3
    );
    try {
      const companyId = companyInfo?.data?.return[0]?.id;
      const officersList = await getOfficerList({ cstID: companyId });
      const activeOfficers = officersList?.data.return.filter((item: any) => {
        return item.teamMember.role !== '';
      });
      setOfficersInfo(activeOfficers.length - 1);
    } catch (err) {
      console.log(err);
    }
  }, [location.pathname]);

  useEffect(() => {
    const index = data.find((item) => item.link == location.pathname)?.index;
    if (index) {
      setStep(index);
    }
  }, [officersInfo]);
  return (
    <div
      className={classNames(
        'flex justify-between w-96 mx-auto',
        styles.stepperContainer
      )}
    >
      {data.map((item) => {
        return (
          <div
            className={classNames(
              {
                'pointer-events-auto cursor-pointer':
                  step > item.index ||
                  ((item.index === 2 || item.index === 3) && officersInfo) ||
                  (item.index === 2 && companyInfo?.data?.return[0]?.fullName)
              },
              'pointer-events-none  flex items-center'
            )}
            key={item.link}
            onClick={() => handleNavigate(item)}
          >
            <span
              className={classNames({
                'text-green': step == item.index,
                'text-light': step !== item.index,
                [`font-bold text-base ${item.width}`]: true
              })}
            >
              {item.title}
            </span>
            <RegisterStepIcon active={step == item.index} />
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
