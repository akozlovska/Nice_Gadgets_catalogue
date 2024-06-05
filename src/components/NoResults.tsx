import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggeredSlideRightAnimation } from '../utils/animations';

type Props = {
  category: string;
};

export const NoResults: React.FC<Props> = ({ category }) => {
  const { t } = useTranslation();

  return (
    <motion.h2
      initial="hidden"
      whileInView="visible"
      variants={staggeredSlideRightAnimation}
      custom={1}
      viewport={{ once: true }}
    >
      {`${category} ${t('not-found')}`}
    </motion.h2>
  );
};
