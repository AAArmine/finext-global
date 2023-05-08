import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { store } from 'redux/store';

interface Props extends RouteProps {
  restricted?: boolean;
  component: React.FC;
}

const PublicRoute: React.FC<Props> = ({
  component: Component,
  restricted = true
}) => {
  const { token } = store.getState().auth;
  return restricted && token ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Component />
  );
};

export default PublicRoute;
