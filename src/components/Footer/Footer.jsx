import React from 'react'
import { Link } from 'react-router-dom'

import logo from './../../images/logo.svg'

import { ROUTES } from '../../utils/routes'

import styles from './../../styles/Footer.module.css'

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={logo} alt="stuff" />
        </Link>
      </div>

      <div className={styles.rights}>
        Developed by{' '}
        
        <a href="/tereshkov" target="_blank" rel="noreferrer">
          Tereshkov
        </a>
      </div>

      <div className={styles.socials}>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`}></use>
          </svg>
        </a>

        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`}></use>
          </svg>
        </a>

        <a href="https://youtube.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`}></use>
          </svg>
        </a>
      </div>
    </section>
  )
}

export default Footer