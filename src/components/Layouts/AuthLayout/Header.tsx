import logo from 'assets/images/logo.svg';

const Header = () => {
  return (
    <div className="flex items-center h-full">
      <div>
        <img src={logo} />
      </div>
    </div>
  );
};

export default Header;
