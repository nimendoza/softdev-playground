import React from 'react';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';

import Styles from './Login.module.css';
import { set } from 'redux/user';
import { ServerAPI } from 'types/openapi';
import { AppConfig } from 'utils/AppConfig';
import { http, HttpResponse } from 'utils/http';
import { UserConstants } from 'types/UserConstants';
import { showAlertModal } from 'components/Modals/Alert/Alert';
import { showSignupModal } from 'components/Modals/Signup/Signup';

const ErrorAreas = {
  Email: Styles.emailError,
  Password: Styles.passwordError
};

export const closeLoginModal = () => {
  const modal = document.getElementById(Styles.background);

  if (modal) {
    modal.style.display = 'none';
  }
};

export const showLoginModal = () => {
  const modal = document.getElementById(Styles.background);

  if (modal) {
    modal.style.display = 'flex';
  }
};

export const LoginModal = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();

  const clearErrors = () => {
    for (const id of Object.values(ErrorAreas)) {
      const area = document.getElementById(id);
      if (area) {
        area.style.display = 'none';
      }
    }
  };

  const showErrorArea = (id: string, value: string) => {
    const area = document.getElementById(id);
    if (area) {
      area.style.display = 'block';
      area.textContent = value;
    }
  };

  const onLoginClick = async () => {
    clearErrors();

    const payload: ServerAPI['LoginPayload'] = { email, password };

    try {
      const res: HttpResponse<ServerAPI['LoginUser']> = await http.put(`${AppConfig.server}/V1/users`, payload);
      localStorage.setItem(UserConstants.Token, res.data.jwt);
      dispatch(set(res.data.user));
      closeLoginModal();
    } catch (e: unknown) {
      if (e instanceof AxiosError && e.response) {
        if (e.response.status === 400) {
          const res: HttpResponse<ServerAPI['LoginError']> = e.response;
  
          if (res.data.email) {
            showErrorArea(ErrorAreas.Email, res.data.email);
          }
  
          if (res.data.password) {
            showErrorArea(ErrorAreas.Password, res.data.password);
          }
        } else if (e.response.status === 500) {
          showAlertModal('Something wrong happened in our servers');
        }
      }
    }
  };

  return (
    <div id={`${Styles.background}`}>
      <div className={`${Styles.modal}`}>
        <button className={`${Styles.close}`} type='button' onClick={closeLoginModal}>X</button>

        <div className={`${Styles.login}`}>Log in</div>

        <div className={`${Styles.email} ${Styles.input}`} >
          <input type='text' placeholder='E-mail address' value={email} onChange={(e) => {setEmail(e.target.value)}} />
        </div>
        <div id={ErrorAreas.Email} />

        <div className={`${Styles.input}`}>
          <input type='password' placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
        </div>
        <div id={ErrorAreas.Password} />

        <button className={`${Styles.button}`} type='button' onClick={onLoginClick}>Log in</button>

        {/* TODO implement this */}
        <div className={`${Styles.forgot}`} onClick={() => {alert('Under construction')}}><a>Forgot your password?</a></div>

        <div className={`${Styles.create}`}>
          Don't have an account? <a onClick={() => {
            closeLoginModal();
            showSignupModal();
          }}>Create one!</a>
        </div>
      </div>
    </div>
  );
};
