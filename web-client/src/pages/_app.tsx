import React from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';

import 'styles/main.css';
import store from 'redux/store';
import { NavBar } from 'components/NavBar/NavBar';
import { Body } from 'components/Body/Body';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Body>
      <Component {...pageProps} />
    </Body>
    <NavBar />
  </Provider>
);

export default App;
