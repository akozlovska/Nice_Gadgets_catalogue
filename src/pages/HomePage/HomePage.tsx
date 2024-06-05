import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MBanner } from '../../components/Banner';
import { ProductsSlider } from '../../components/ProductsSlider';
import * as productsService from '../../services/productsService';
import {
  categoryAnimation,
  slideLeftAnimation,
  slideRightAnimation,
  slideUpAnimation,
} from '../../utils/animations';
import { Product } from '../../types/Product';
import './HomePage.scss';
import { getTranslatedPlural } from '../../utils/productsHelper';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  const { t } = useTranslation();

  const [phones, tablets, accessories] = useMemo(() => {
    const phonesCount = products.filter(
      product => product.category === 'phones',
    ).length;
    const tabletsCount = products.filter(
      product => product.category === 'tablets',
    ).length;
    const accessoriesCount = products.filter(
      product => product.category === 'accessories',
    ).length;

    return [phonesCount, tabletsCount, accessoriesCount];
  }, [products]);

  useEffect(() => {
    productsService.getProducts().then(setProducts);

    productsService.getHotPriceProducts().then(setHotPriceProducts);

    productsService.getBrandNewProducts().then(setBrandNewProducts);
  }, []);

  return (
    <>
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: true }}
        className="HomePage__title"
        variants={slideRightAnimation}
      >
        {t('heading')}
      </motion.h1>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: true }}
        className="HomePage__section"
      >
        <MBanner variants={slideUpAnimation} />
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: true }}
        className="HomePage__section"
      >
        <motion.h2
          variants={slideRightAnimation}
          className="HomePage__section-title"
        >
          {t('prices')}
        </motion.h2>
        <motion.div variants={slideLeftAnimation}>
          <ProductsSlider products={hotPriceProducts} />
        </motion.div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: true }}
        className="HomePage__section"
      >
        <motion.h2
          variants={slideRightAnimation}
          className="HomePage__section-title"
        >
          {t('categories')}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3, once: true }}
          className="categories"
        >
          <motion.div
            custom={1}
            variants={categoryAnimation}
            className="categories__category"
          >
            <Link to="/phones" className="categories__link">
              <img
                src="./img/products/phones.png"
                alt="Mobile phones"
                className="categories__link-image"
              />

              <h4 className="categories__title">{t('mobile-phones')}</h4>
              <p className="categories__text">
                {getTranslatedPlural('item', phones)}
              </p>
            </Link>
          </motion.div>

          <motion.div
            custom={2}
            variants={categoryAnimation}
            className="categories__category"
          >
            <Link to="/tablets" className="categories__link">
              <img
                src="./img/products/tablets.png"
                alt="Tablets"
                className="categories__link-image"
              />

              <h4 className="categories__title">{t('tablets')}</h4>
              <p className="categories__text">
                {getTranslatedPlural('item', tablets)}
              </p>
            </Link>
          </motion.div>

          <motion.div
            custom={3}
            variants={categoryAnimation}
            className="categories__category"
          >
            <Link to="/accessories" className="categories__link">
              <img
                src="./img/products/accessories.png"
                alt="Accessories"
                className="categories__link-image"
              />

              <h4 className="categories__title">{t('accessories')}</h4>
              <p className="categories__text">
                {getTranslatedPlural('item', accessories)}
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3, once: true }}
        className="HomePage__section"
      >
        <motion.h2
          variants={slideRightAnimation}
          className="HomePage__section-title"
        >
          {t('new')}
        </motion.h2>
        <motion.div variants={slideLeftAnimation}>
          <ProductsSlider products={brandNewProducts} />
        </motion.div>
      </motion.section>
    </>
  );
};
