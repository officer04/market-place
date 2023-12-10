import { Link } from 'react-router-dom';

import styles from './../../styles/Product.module.css';

import { ROUTES } from '../../utils/routes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../features/user/userSlice';

const SIZES = [4, 4.5, 5];

const Product = ( item ) => {
  const { title, images, price, description } = item;
  const dispath = useDispatch();
  const [currentImage, setCurrentImage] = useState();
  const [currentSize, setcurrentSize] = useState();

  useEffect(() => {
    if (!images.length) return;

    setCurrentImage(images[0]);
  }, [images]);

  const addToCart = () => {
    dispath(addItemToCart(item));
  };

  return (
    <section className={styles.product}>
      <div className={styles.images}>
        <div className={styles.current} style={{ backgroundImage: `url(${currentImage})` }} />
        <div className={styles['images-list']}>
          {images.map((image, i) => (
            <div
              key={i}
              className={styles.image}
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => {
                setCurrentImage(image);
              }}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$</div>
        <div className={styles.color}>
          <span>Color:</span> Green
        </div>
        <div className={styles.sizes}>
          <span>Sizes:</span>
        </div>
        <div className={styles.list}>
          {SIZES.map((size) => (
            <div
              key={size}
              className={`${styles.size} ${currentSize == size ? styles.active : ''}`}
              onClick={() => {
                setcurrentSize(size);
              }}
            >
              {size}
            </div>
          ))}
        </div>

        <p className={styles.description}> {description}</p>

        <div className={styles.actions}>
          <button onClick={addToCart} className={styles.add} disabled={!currentSize}>
            Add to cart
          </button>
          <button className={styles.favorite}>Add to favorites</button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.purchase}>19 people purc </div>
          <Link to={ROUTES.HOME}>Return to store</Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
