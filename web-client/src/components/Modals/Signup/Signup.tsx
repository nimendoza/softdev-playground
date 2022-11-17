import React from "react";
import { AxiosError } from "axios";

import Styles from './Signup.module.css';
import { ServerAPI } from "types/openapi";
import { AppConfig } from "utils/AppConfig";
import { http, HttpResponse } from "utils/http";
import { showLoginModal } from "../Login/Login";
import { showAlertModal } from "../Alert/Alert";

const ErrorAreas = {
  Email: Styles.emailError,
  Username: Styles.usernameError,
  Password: Styles.passwordError,
  PasswordConfirm: Styles.passwordConfirmError
}

export const closeSignupModal = () => {
  const modal = document.getElementById(Styles.background);

  if (modal) {
    modal.style.display = 'none';
  }
};

export const showSignupModal = () => {
  const modal = document.getElementById(Styles.background);

  if (modal) {
    modal.style.display = 'flex';
  }
};

export const SignupModal = () => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');

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

  const onSignupClick = async () => {
    clearErrors();

    const payload: ServerAPI['RegisterUserPayload'] = { email, username, password, passwordConfirm };

    try {
      await http.post(`${AppConfig.server}/V1/users/register`, payload);

      showLoginModal();
    } catch (e: unknown) {
      if (e instanceof AxiosError && e.response) {
        if (e.response.status === 400) {
          const res: HttpResponse<ServerAPI['RegisterUserError']> = e.response;
  
          if (res.data.email) {
            showErrorArea(ErrorAreas.Email, res.data.email);
          }
  
          if (res.data.username) {
            showErrorArea(ErrorAreas.Username, res.data.username);
          }
  
          if (res.data.password) {
            showErrorArea(ErrorAreas.Password, res.data.password);
          }
  
          if (res.data.passwordConfirm) {
            showErrorArea(ErrorAreas.PasswordConfirm, res.data.passwordConfirm);
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
        <button className={`${Styles.close}`} onClick={closeSignupModal}>X</button>

        <div className={`${Styles.signup}`}>Sign up</div>
        
        <div className={`${Styles.email} ${Styles.input}`}>
          <input type='text' placeholder='E-mail address' value={email} onChange={(e) => {setEmail(e.target.value)}} />
        </div>
        <div id={ErrorAreas.Email} />

        <div className={`${Styles.input}`}>
          <input type='text' placeholder='Username' value={username} onChange={(e) => {setUsername(e.target.value)}} />
        </div>
        <div id={ErrorAreas.Username} />
        
        <div className={`${Styles.input}`}>
          <input type='password' placeholder='Password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
        </div>
        <div id={ErrorAreas.Password} />

        <div className={`${Styles.input}`}>
          <input type='password' placeholder='Password confirm' value={passwordConfirm} onChange={(e) => {setPasswordConfirm(e.target.value)}} />
        </div>
        <div id={ErrorAreas.PasswordConfirm} />

        <button className={`${Styles.button}`} onClick={onSignupClick}>Sign up</button>

        <div className={`${Styles.login}`}>
          Already have an account? <a onClick={() => {
            closeSignupModal();
            showLoginModal();
          }}>Log in!</a>
        </div>
      </div>
    </div>
  );
};
