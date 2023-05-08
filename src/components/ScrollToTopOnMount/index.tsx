import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = (props: any) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return <>{props.children}</>;
};

export default ScrollToTop;
