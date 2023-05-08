import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title';
import AddUser from './AddUser';
import EditUser from './EditUser';
import UserTable from './UserTable';

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-start items-center">
        <Title text="Users" color="green" />
        <span
          className="icon-plus ml-5 text-3xl cursor-pointer text-green"
          onClick={() => navigate('/user-management/add')}
        />
      </div>
      <UserTable />
    </>
  );
};

export { AddUser, EditUser };

export default UserManagement;
