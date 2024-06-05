import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { slideUpAnimation } from '../../utils/animations';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <motion.h2
      className="NotFoundPage"
      variants={slideUpAnimation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {t('page-not-found')}
    </motion.h2>
  );
};
