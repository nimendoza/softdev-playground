import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { ReduxState } from 'redux/store';
import { LoggedOutNavBar } from 'components/NavBar';

export const NavBar = () => {
  const user = useSelector((state: ReduxState) => state.user);
  const [show, setShow] = useState(<LoggedOutNavBar />)
  
  useEffect(() => {
    setShow(<div>You are {user.id}</div>);
  }, [user.id]);

  return (
    show
  )
};
