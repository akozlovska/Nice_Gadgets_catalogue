import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Product } from '../../types/Product';
import {
  slideLeftAnimation,
  slideRightAnimation,
} from '../../utils/animations';
import { ProductsSlider } from '../ProductsSlider';
import * as productsService from '../../services/productsService';
import './SuggestedProducts.scss';

type Props = {
  productId?: string;
};

export const SuggestedProducts: React.FC<Props> = ({ productId }) => {
  const { t } = useTranslation();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (productId) {
      productsService
        .getSuggestedProducts(+productId)
        .then(setSuggestedProducts);
    }
  }, [productId]);

  return (
    <motion.div
      className="SuggestedProducts"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        className="SuggestedProducts__title"
        variants={slideRightAnimation}
      >
        {t('suggested')}
      </motion.h2>

      <motion.div variants={slideLeftAnimation}>
        <ProductsSlider products={suggestedProducts} />
      </motion.div>
    </motion.div>
  );
};
