import { useState } from 'react';
import styles from './../../styles/User.module.css';
import { useDispatch } from 'react-redux';
import { createUser, loginUser } from '../../features/user/userSlice';

const UserLogin = ({toggleCurrentFormType, closeForm}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isNotEmpty = Object.values(values).every((val) => val);

    if (!isNotEmpty) return;

    dispatch(loginUser(values));
    closeForm();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm}>
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}></use>
        </svg>
      </div>

      <div className={styles.title}>Log in</div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.group}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>
     
        <div className={styles.group}>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </div>
  

        <div className={styles.link} onClick={() => toggleCurrentFormType("signup")}>Create an account</div>

        <button type="submit" className={styles.submit}>
          login
        </button>
      </form>
    </div>
  )
}

export default UserLogin