import React from 'react';
import { useSelector } from 'react-redux';

import { ReduxState } from 'redux/store';
import { LoggedOutNavBar } from 'components/NavBar';

export const NavBar = () => {
  const user = useSelector((state: ReduxState) => state.user);
  let navbar: React.ReactNode;

  if (user.id) {
    navbar = <div>You are {user.id}</div>
  } else {
    navbar = <LoggedOutNavBar />;
  }

  return (
    <React.Fragment>
      {navbar}
    </React.Fragment>
  );
};
