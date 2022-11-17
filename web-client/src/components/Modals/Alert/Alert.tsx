import React from 'react';

import Styles from './Alert.module.css';

export const closeAlertModal = () => {
  const modal = document.getElementById(Styles.background);

  if (modal) {
    modal.style.display = 'none';
  }
};

export const showAlertModal = (message: string) => {
  const modal = document.getElementById(Styles.background);

  if (modal) {
    modal.style.display = 'flex';
  }

  const text = document.getElementById(Styles.text);

  if (text) {
    text.textContent = message;
  }
};

export const AlertModal = () => (
  <div id={`${Styles.background}`}>
    <div className={`${Styles.modal}`}>
      <div id={`${Styles.text}`} />
    </div>
  </div>
);
