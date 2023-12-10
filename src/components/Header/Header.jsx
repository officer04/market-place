import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from './../../utils/routes';
import logo from './../../images/logo.svg';
import avatar from './../../images/avatar.jpg';

import styles from './../../styles/Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../../features/user/userSlice';
import { useGetProductsQuery } from '../../features/api/apiSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { currentUser } = useSelector(({ user }) => user);
  const [values, setValues] = useState({ name: 'Guest', avatar: avatar });
  const { data, isLoading } = useGetProductsQuery({ title: searchValue });

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  const handleChange = ({ target: { value } }) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={logo} alt="stuff" />
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div className={styles.avatar} style={{ backgroundImage: `url(${values.avatar})` }}></div>
          <div className={styles.username}>{values.name}</div>
        </div>
      </div>

      <form className={styles.form}>
        <div className={styles.icon}>
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`}></use>
          </svg>
        </div>
        <div styles={styles.input}>
          <input
            type="search"
            name="search"
            placeholder="Search for anything..."
            value={searchValue}
            onChange={handleChange}
          />
        </div>

        {searchValue && (
          <div className={styles.box}>
            {isLoading
              ? 'Loading'
              : !data.length
              ? 'No results'
              : data.map(({ title, images, id }) => {
                  return (
                    <Link
                      key={id}
                      className={styles.item}
                      to={`/products/${id}`}
                      onClick={() => setSearchValue('')}
                    >
                      <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${images[0]})` }}
                      />
                      <div className={styles.title}>{title}</div>
                    </Link>
                  );
                })}
          </div>
        )}
      </form>

      <div className={styles.account}>
        <Link to={ROUTES.HOME} className={styles.favorites}>
          <svg className={styles['icon-fav']}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`}></use>
          </svg>
        </Link>

        <Link to={ROUTES.CART} className={styles.cart}>
          <svg className={styles['icon-cart']}>
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`}></use>
          </svg>
          <span className={styles.count}>2</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
