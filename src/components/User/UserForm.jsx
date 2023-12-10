import { useDispatch, useSelector } from 'react-redux';

import UserSignupForm from './UserSignupForm';

import styles from './../../styles/User.module.css';
import { toggleForm, toggleFormType } from '../../features/user/userSlice';
import UserLogin from './UserLogin';

const UserForm = () => {
  const dispatch = useDispatch();
  const { showForm, formType } = useSelector((state) => state.user);
  const closeForm = () => dispatch(toggleForm(false));

  const toggleCurrentFormType = (type) => {
    dispatch(toggleFormType(type));
  };

  return showForm ? (
    <>
      <div className={styles.overlay} onClick={closeForm} />
      {formType === 'signup' ? (
        <UserSignupForm toggleCurrentFormType={toggleCurrentFormType} closeForm={closeForm} />
      ) : (
        <UserLogin toggleCurrentFormType={toggleCurrentFormType} closeForm={closeForm} />
      )}
    </>
  ) : (
    <></>
  );
};

export default UserForm;
