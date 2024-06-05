import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { slideRightAnimation } from '../../utils/animations';
import './Breadcrumbs.scss';

type Props = {
  category: string;
  product?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ category, product }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="Breadcrumbs"
      initial="hidden"
      whileInView="visible"
      variants={slideRightAnimation}
      viewport={{ once: true }}
    >
      <Link to="/" className="Breadcrumbs__item Breadcrumbs__item--home" />

      {product ? (
        <>
          <Link to={`/${category}`} className="Breadcrumbs__item">
            {t(category)}
          </Link>
          <p className="Breadcrumbs__item Breadcrumbs__item--text">{product}</p>
        </>
      ) : (
        <p className="Breadcrumbs__item Breadcrumbs__item--text">
          {t(category)}
        </p>
      )}
    </motion.div>
  );
};
