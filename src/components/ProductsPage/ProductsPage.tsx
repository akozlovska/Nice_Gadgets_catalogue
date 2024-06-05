import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  staggeredSlideRightAnimation,
  slideUpAnimation,
} from '../../utils/animations';
import { Product } from '../../types/Product';
import { QueryParams } from '../../types/QueryParams';
import {
  getDisplayedProducts,
  getFilteredProducts,
  getTranslatedPlural,
} from '../../utils/productsHelper';
import { ProductsList } from '../ProductsList';
import { NoSearchResults } from '../NoSearchResults';
import { Pagination } from '../Pagination';
import './ProductsPage.scss';
import { FilterDropdowns } from '../FilterDropdowns';

type Props = {
  products: Product[];
  category: string;
};

export const ProductsPage: React.FC<Props> = ({ products, category }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const total = filteredProducts.length;

  const [searchParams] = useSearchParams();
  const sortType = searchParams.get(QueryParams.Sort) || 'age';
  const currentPage = +(searchParams.get(QueryParams.Page) || 1);
  const perPage = searchParams.get(QueryParams.PerPage) || '16';
  const query = searchParams.get(QueryParams.Query) || '';

  const displayedProducts = useMemo(() => {
    return getDisplayedProducts(filteredProducts, perPage, currentPage);
  }, [filteredProducts, perPage, currentPage]);

  const { t } = useTranslation();

  useEffect(() => {
    setFilteredProducts(getFilteredProducts(products, query, sortType));
  }, [products, sortType, query]);

  useEffect(() => {
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (query && !filteredProducts.length) {
    return <NoSearchResults />;
  }

  return (
    <motion.div
      className="ProductsPage"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <AnimatePresence>
        {query ? (
          <motion.p
            className="ProductsPage__subtitle"
            variants={staggeredSlideRightAnimation}
            initial="hidden"
            animate="visible"
            custom={1}
            key={1}
          >
            {`${total} ${
              total === 1
                ? t('result')
                : total < 5
                  ? t('results-234')
                  : t('results')
            }`}
          </motion.p>
        ) : (
          <>
            <motion.h1
              variants={staggeredSlideRightAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="ProductsPage__title"
              key={2}
            >
              {t(category)}
            </motion.h1>
            <motion.p
              variants={staggeredSlideRightAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="ProductsPage__subtitle"
              key={3}
            >
              {getTranslatedPlural('item', products.length)}
            </motion.p>
          </>
        )}
      </AnimatePresence>

      <motion.div
        className="ProductsPage__dropdowns"
        variants={staggeredSlideRightAnimation}
        custom={3}
      >
        <FilterDropdowns />
      </motion.div>

      <div className="ProductsPage__list">
        <ProductsList products={displayedProducts} />
      </div>

      {total > 4 && (
        <motion.div variants={slideUpAnimation}>
          <Pagination total={total} />
        </motion.div>
      )}
    </motion.div>
  );
};
