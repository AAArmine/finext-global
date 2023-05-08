import { useEffect } from 'react';
import spinner from 'assets/images/spinner.gif';

const Loader = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#F1F2F3]">
      <img src={spinner} />
    </div>
  );
};

export default Loader;
