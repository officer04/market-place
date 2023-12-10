import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery } from '../../features/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getApis } from '../../features/apis/apisSlice';
import { ROUTES } from '../../utils/routes';
import Product from './Product';
import Products from './Products';
import { getRelatedProducts } from '../../features/products/productsSlice';

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {list, related } = useSelector(({ products }) => products);
  const { data, isLoading, isSuccess, isFetching } = useGetProductQuery({ id });

  useEffect(() => {
    // dispatch(getApis({ id }));
    if (!isLoading && !isSuccess && !isFetching) {
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isSuccess, isFetching]);

  // const { list } = useSelector(({ apis }) => apis);

  useEffect(() => {
    if (!data || !list.length) return
    if (data) {
      dispatch(getRelatedProducts(data.category.id));
    }
  }, [data, dispatch]);

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Related products" />
    </>
  );
};

export default SingleProduct;
