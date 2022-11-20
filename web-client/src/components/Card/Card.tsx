import React from "react";

import Styles from './Card.module.css';

type CardProps = {
  src: string;
  href: string;
};

export const Card = (props: CardProps) => (
  <div className={`${Styles.card}`}>
    <img src={props.src} /> <br />
    <a href={props.href}><button>See details</button></a>
  </div>
);