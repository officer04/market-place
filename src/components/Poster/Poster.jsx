import React from 'react';

import bg from './../../images/computer.png';

import styles from './../../styles/Home.module.css';

const Poster = () => {
  return (
    <section className={styles.home}>
      <div className={styles.title}>BIG SALE 20%</div>
      <div className={styles.product}></div>
      <div className={styles.text}>
        <div className={styles.subtitle}>the bestseller of 2022</div>
        <h1 className={styles.head}>LENNON r2d2 with INVIDIA 5090 TI</h1>
        <button className={styles.button}>Shop now</button>
      </div>
      <div className={styles.image}>
        <img src={bg} alt="computer" />
      </div>
    </section>
  );
};

export default Poster;
