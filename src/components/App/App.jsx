import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategories } from '../../features/categories/categoriesSlice';

import AppRoutes from '../Routes/Routes';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import { getProducts } from '../../features/products/productsSlice';
import { getApis } from '../../features/apis/apisSlice';
import UserForm from '../User/UserForm';
import UserSignupForm from '../User/UserSignupForm';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div className="app">
      <Header />
      <UserForm/>
      {/* <UserSignupForm/> */}
      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
