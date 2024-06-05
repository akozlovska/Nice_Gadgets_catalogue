import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import {
  slideLeftAnimation,
  slideRightAnimation,
  staggeredSlideRightAnimation,
} from '../../utils/animations';
import { useCart } from '../../context/CartContext';
import { BackLink } from '../../components/BackLink';
import { CartItem } from '../../components/CartItem';
import { Modal } from '../../components/Modal';
import { getCartTotal } from '../../utils/cartHelper';
import './CartPage.scss';
import { getTranslatedPlural } from '../../utils/productsHelper';

export const CartPage: React.FC = () => {
  const { cart, totalQuantity } = useCart();
  const total = useMemo(() => {
    return getCartTotal(cart);
  }, [cart]);

  const [isModalActive, setIsModalActive] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isModalActive) {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }
  }, [isModalActive]);

  return (
    <motion.div
      className="CartPage"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <BackLink />
      <AnimatePresence>
        {cart.length ? (
          <>
            <motion.h2
              className="CartPage__title"
              variants={slideRightAnimation}
            >
              {t('cart')}
            </motion.h2>

            <div className="CartPage__wrapper">
              <motion.div
                className="CartPage__items"
                variants={slideRightAnimation}
              >
                {cart.map(item => (
                  <CartItem item={item} key={item.id} />
                ))}
              </motion.div>

              <motion.div
                className="CartPage__total"
                variants={slideLeftAnimation}
              >
                <h2 className="CartPage__total-price">{`$${total}`}</h2>

                <p className="CartPage__total-text">
                  {`${t('total')} ${getTranslatedPlural('item', totalQuantity)}`}
                </p>

                <button
                  type="button"
                  className="CartPage__checkout"
                  onClick={() => setIsModalActive(true)}
                >
                  {t('checkout')}
                </button>

                <Modal
                  isModalActive={isModalActive}
                  setIsModalActive={setIsModalActive}
                />
              </motion.div>
            </div>
          </>
        ) : (
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={staggeredSlideRightAnimation}
            custom={1}
            key={1}
          >
            {t('cart-empty')}
          </motion.h2>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
