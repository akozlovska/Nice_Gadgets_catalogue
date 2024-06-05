import React from 'react';
import { useCart } from '../../context/CartContext';
import { CartProduct } from '../../types/CartProduct';
import { changeQuantity, deleteFromCart } from '../../utils/cartHelper';
import './CartItem.scss';

type Props = {
  item: CartProduct;
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const { cart, setCart } = useCart();

  return (
    <div className="CartItem">
      <div className="CartItem__wrapper">
        <button
          type="button"
          className="CartItem__delete"
          aria-label="Delete"
          onClick={() => setCart(deleteFromCart(cart, item.id))}
        />

        <div className="CartItem__image-wrapper">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="CartItem__image"
          />
        </div>

        <p className="CartItem__name">{item.product.name}</p>
      </div>

      <div className="CartItem__wrapper CartItem__wrapper--right">
        <div className="CartItem__amount">
          <button
            type="button"
            aria-label="Minus 1"
            className="button button--minus"
            disabled={item.quantity === 1}
            onClick={() => setCart(changeQuantity(cart, item, 'minus'))}
          />

          <p className="CartItem__amount-number">{item.quantity}</p>

          <button
            type="button"
            aria-label="Plus 1"
            className="button button--plus"
            onClick={() => setCart(changeQuantity(cart, item, 'plus'))}
          />
        </div>

        <h3 className="CartItem__price">{`$${item.product.price}`}</h3>
      </div>
    </div>
  );
};
