import { Layout } from 'antd';
import HeaderContainer from './Header';
import styles from './UserLayout.module.scss';
import Sidebar from './Sidebar';
import { UserLayoutPropsType } from './types';
import { Outlet } from 'react-router-dom';
import Loader from 'components/Loader';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import classNames from 'classnames';

const { Header, Sider, Content } = Layout;

const UserLayout: React.FC<UserLayoutPropsType> = ({
  withoutSidebar = false,
  singleContainer = true
}) => {
  const loading = useSelector((state: RootState) => state.loading);

  return (
    <>
      {loading.visibility && <Loader />}
      <Layout className={classNames(styles.homeContainer, 'min-h-screen')}>
        <Header className={styles.headerContainer}>
          <HeaderContainer />
        </Header>
        <Layout>
          {!withoutSidebar && (
            <Sider className={styles.sidebarContainer} width={276}>
              <Sidebar />
            </Sider>
          )}
          <Content
            className={`${singleContainer && styles.contentContainer} ${
              withoutSidebar && styles.contentWithoutSider
            }`}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default UserLayout;
