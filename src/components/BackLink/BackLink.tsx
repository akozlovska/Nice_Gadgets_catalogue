import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { slideRightAnimation } from '../../utils/animations';
import './BackLink.scss';

export const BackLink = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={slideRightAnimation}
      viewport={{ once: true }}
    >
      <button type="button" className="BackLink" onClick={() => navigate(-1)}>
        {t('back')}
      </button>
    </motion.div>
  );
};
