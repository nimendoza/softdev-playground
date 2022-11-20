import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { set } from "redux/user";
import { ServerAPI } from "types/openapi";
import { server } from "utils/AppConfig";
import { http, HttpResponse } from "utils/http";
import { UserEnum } from "utils/UserEnum";

import Styles from './Login.module.css';

export const closeLoginModal = () => {
  const background = document.getElementById(Styles.background);
  if (background) {
    background.style.display = 'none';
  }
};

export const showLoginModal = () => {
  const background = document.getElementById(Styles.background);
  if (background) {
    background.style.display = 'flex';
  }
};

export const LoginModal = () => {
  const [email, setEmail] = useState('');
  const [pword, setPword] = useState('');

  const dispatch = useDispatch();

  const onLoginClick = async () => {
    const payload: ServerAPI['LoginPayload'] = { email, password: pword };
    try {
      const res: HttpResponse<ServerAPI['VerifiedUser']> = await http.put(`${server}/users`, payload);
      localStorage.setItem(UserEnum.Chit, res.data.jwt);
      dispatch(set(res.data.user));
      closeLoginModal();
    } catch (e) {
      alert('Something wrong was given to the server');
    }
  };

  return (
    <div id={`${Styles.background}`}>
      <div className={`${Styles.modal}`}>
        Email:    <input type='text' value={email} onChange={(e) => {setEmail(e.target.value)}} />
        Password: <input type='password' value={pword} onChange={(e) => {setPword(e.target.value)}} />
        <button className={`${Styles.button}`} type='button' onClick={onLoginClick}>Log in</button>
      </div>
    </div>
  );
};