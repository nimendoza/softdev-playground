import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';

import 'styles/main.css';
import store from 'redux/store';
import { Body } from 'components/Body/Body';
import { NavBar } from 'components/NavBar/NavBar';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <NavBar />
    <Body>
      <Component {...pageProps} />
    </Body>
  </Provider>
);

export default App;
