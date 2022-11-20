import { Card } from 'components/Card/Card';
import React from 'react';

import Styles from './index.module.css';

const Index = () => (
  <React.Fragment>
    <div id={`${Styles.header}`}>
      <h1 id={`${Styles.h1}`}>Philippine Science High School - Main Campus</h1>
      <h2>Intellectual Property Rights</h2>
      <h4>Everything you need to know about protecting your research and works</h4>
    </div>
    <div id={`${Styles.content}`}>
      <h2>Be informed and Know your IP Rights</h2>
      <div id={`${Styles.cards}`}>
        <Card src='/img/o_ip.png'   href='/info/overview' />
        <Card src='/img/can_i2.png' href='/info/how' />
        <Card src='/img/limit2.png' href='/info/limits' />
        <Card src='/img/cycle.png'  href='/info/cycle' />
      </div>
    </div>
  </React.Fragment>
)

export default Index;
