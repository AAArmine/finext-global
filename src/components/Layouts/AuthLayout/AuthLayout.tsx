import { Layout } from 'antd';
import styles from './AuthLayout.module.scss';
import { Outlet } from 'react-router-dom';
import HeaderContainer from './Header';
import ContentContainer from './ContentContainer';
import Stepper from './Stepper';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import ToastContent from 'components/ToastContent';
import { toast } from 'react-toastify';
import useDidMountEffect from 'hooks/useDidMount';
import { ERROR } from 'constants/notifications';
import { toastMsg } from 'redux/slices/notificationsSlice';
import { useLocation } from 'react-router-dom';
import Loader from 'components/Loader';
import classNames from 'classnames';

const { Header, Content } = Layout;

const AuthLayout: React.FC = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.notifications);
  const loading = useSelector((state: RootState) => state.loading);

  useDidMountEffect(() => {
    notification.visibility &&
      toast(
        <ToastContent
          error={notification.type === ERROR}
          text={notification.text}
        />,
        {
          className: notification.type,
          onClose: () => {
            dispatch(
              toastMsg({
                visibility: false,
                type: '',
                text: ''
              })
            );
          }
        }
      );
  }, [notification.visibility]);

  return (
    <>
      {loading.visibility && <Loader />}
      <Layout className={classNames(styles.homeContainer, 'min-h-screen')}>
        <ToastContainer
          className="w-auto mt-24"
          position="top-center"
          autoClose={8000}
          hideProgressBar={true}
          pauseOnHover
        />
        <Header className={styles.headerContainer}>
          <HeaderContainer />
        </Header>
        <Content className="flex justify-center flex-col">
          <ContentContainer>
            <Outlet />
          </ContentContainer>
          {(pathName === '/auth/register-company' ||
            pathName === '/auth/register-organization' ||
            pathName === '/auth/register-documents') && <Stepper />}
        </Content>
      </Layout>
    </>
  );
};

export default AuthLayout;
