import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { slideRightAnimation } from '../utils/animations';

export const NoSearchResults: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.h2
      variants={slideRightAnimation}
      initial="hidden"
      whileInView="visible"
    >
      {t('no-search-results')}
    </motion.h2>
  );
};
