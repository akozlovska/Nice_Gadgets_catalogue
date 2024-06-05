import React, { useMemo } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/Product';
import { addToCart, deleteFromCart } from '../../utils/cartHelper';
import './CartButton.scss';

type Props = {
  product: Product;
};

export const CartButton: React.FC<Props> = ({ product }) => {
  const { cart, setCart } = useCart();
  const { t } = useTranslation();

  const isInCart = useMemo(() => {
    return !!cart.find(item => item.product.id === product.id);
  }, [cart]);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isInCart) {
      setCart(addToCart(cart, product));
    } else {
      const itemId = cart.find(item => item.product.id === product.id)?.id;

      if (itemId !== undefined) {
        setCart(deleteFromCart(cart, itemId));
      }
    }
  };

  return (
    <button
      type="button"
      className={cn('CartButton', {
        'CartButton--added': isInCart,
      })}
      onClick={handleAdd}
    >
      {isInCart ? <>{t('added-to-cart')}</> : <>{t('add-to-cart')}</>}
    </button>
  );
};
