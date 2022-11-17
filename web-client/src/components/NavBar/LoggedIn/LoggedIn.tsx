import React from 'react';
import { useDispatch } from 'react-redux';

import Styles from './LoggedIn.module.css';
import { clear } from 'redux/user';

const logout = () => {
  useDispatch()(clear);
};

export const LoggedInNavBar = () => (
  <React.Fragment>
    <div className={`${Styles.navbar}`}>
      <div className={`${Styles.navbarReverse}`}>
        <button type='button' onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  </React.Fragment>
);
