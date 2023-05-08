import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { store } from 'redux/store';
import { NOTIFICATIONS } from 'constants/notifications';

interface Props extends RouteProps {
  component: React.FC<{ [componentProps: string]: any }>;
  [componentProps: string]: any;
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  ...componentProps
}) => {
  const { token } = store.getState().auth;
  return token ? (
    <Component {...componentProps} />
  ) : (
    <Navigate
      to="/auth/login"
      state={{ authError: NOTIFICATIONS.AUTH_ERROR }}
    />
  );
};

export default PrivateRoute;
