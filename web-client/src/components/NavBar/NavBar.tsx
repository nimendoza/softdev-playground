import { closeLoginModal, LoginModal, showLoginModal } from 'components/Modals/Login/Login';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clear, UserState } from 'redux/user';

import Styles from './NavBar.module.css';
import LoginStyles from 'components/Modals/Login/Login.module.css';

const onLoginClick = () => {
  const background = document.getElementById(LoginStyles.background);
  if (background) {
    if (background.style.display == 'none') {
      showLoginModal();
    } else {
      closeLoginModal();
    }
  }
};

export const NavBar = () => {
  const [text, setText] = useState('Login');
  const [logout, setLogout] = useState(<li></li>);

  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: {user: UserState}) => state.user);

  useEffect(() => {
    console.log('Checking...');
    console.log(user);
    if (user.id) {
      setText('Profile');
      setLogout(<li><a onClick={() => {
        dispatch(clear());
        router.reload();
      }}>Logout</a></li>)
    }
  }, [user]);

  return (
    <div>
      <div id={`${Styles.navbar}`}>
        <a href='/' className={`${Styles.logo}`}>
          <img src='/img/pshslogo.png' className={`${Styles.logo}`} />
        </a>
        <ul className={`${Styles.navlist}`}>
          <li><a href='/'>Home</a></li>
          <li><a href='/about'>About</a></li>
          <li><a href='/contact'>Contact</a></li>
          <li><a onClick={() => {
            if (text == 'Login') {
              onLoginClick();
            } else {
              router.push(`/profile/${user.id}`)
            }
          }}>{text}</a></li>
          {logout}
        </ul>
      </div>
      <LoginModal />
    </div>
  )
};