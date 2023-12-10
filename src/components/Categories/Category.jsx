import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';

import styles from './../../styles/Category.module.css';
import Products from '../Products/Products';
import { useSelector } from 'react-redux';

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);

  const defaultValues = {
    title: '',
    price_min: 0,
    price_max: 0,
  };

  const defaultParams = {
    categoryId: id,
    ...defaultValues,
  };

  const [cat, setCat] = useState('');
  const [params, setParams] = useState(defaultParams);
  const [values, setValues] = useState(defaultValues);

  console.log(params)
  useEffect(() => {
    if (!id) return;
    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  useEffect(() => {
    if (!id || !list.length) return

    const {name} = list.find((item) => item.id === id *1)

    setCat(name)
  }, [list, id])

  const { data, isLoading, isSuccess } = useGetProductsQuery(params);

  const handleChange = ({ target: { value, name } }) => {
    setParams({ ...values, [name]: value });
  };

  const handlSubmit = (e) => {
    e.preventDefault();

    setParams({ ...defaultParams, ...values });
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat}</h2>
      <form className={styles.filters} onSubmit={handlSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            placeholder="Product name"
            value={params.title}
            onChange={handleChange}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            placeholder="0"
            value={params.price_min}
            onChange={handleChange}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            placeholder=""
            value={params.price_max}
            onChange={handleChange}
          />
        </div>

        <button type="submit" hidden ></button>
      </form>

      {isLoading ? (
        <div className="placeholder">Loading...</div>
      ) : !isSuccess || !data.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button>Reset</button>
        </div>
      ) : (
        <Products title="" products={data} style={{ padding: 0 }} amount={5} />
      )}
    </section>
  );
};

export default Category;
