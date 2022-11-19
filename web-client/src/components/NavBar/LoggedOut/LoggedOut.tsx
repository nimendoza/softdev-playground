import React from 'react';

import Styles from './LoggedOut.module.css';
import { LoginModal, showLoginModal } from 'components/Modals/Login/Login';
import { showSignupModal, SignupModal } from 'components/Modals/Signup/Signup';

export const LoggedOutNavBar = () => (
  <div>
    <div className={`${Styles.navbar}`}>
      <div className={`${Styles.navbarReverse}`}>
        <button type='button' onClick={showLoginModal}>
          Log in
        </button>
        <button type='button' onClick={showSignupModal}>
          Sign up
        </button>
      </div>
    </div>
    <LoginModal />
    <SignupModal />
  </div>
);
