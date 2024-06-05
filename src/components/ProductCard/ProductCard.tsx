/* eslint-disable react/display-name */
import React, { forwardRef, Ref } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { CartButton } from '../CartButton';
import { FavouritesButton } from '../FavouritesButton';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = forwardRef(
  ({ product }, ref: Ref<HTMLAnchorElement> | undefined) => {
    const { t } = useTranslation();

    return (
      <Link
        to={`/${product.category}/${product.id}`}
        className="ProductCard"
        ref={ref}
      >
        <div className="ProductCard__content">
          <div className="ProductCard__image-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="ProductCard__image"
            />
          </div>

          <p className="ProductCard__title">{product.name}</p>

          <div className="ProductCard__prices">
            <p className="ProductCard__new-price">{`$${product.price}`}</p>

            {product.price !== product.fullPrice && (
              <p className="ProductCard__old-price">
                {`$${product.fullPrice}`}
              </p>
            )}
          </div>

          <div className="ProductCard__details">
            <div className="ProductCard__detail">
              <p className="ProductCard__detail-name">{t('screen')}</p>
              <p className="ProductCard__detail-text">
                {product.screen || '-'}
              </p>
            </div>

            <div className="ProductCard__detail">
              <p className="ProductCard__detail-name">{t('capacity')}</p>
              <p className="ProductCard__detail-text">
                {product.capacity || '-'}
              </p>
            </div>

            <div className="ProductCard__detail">
              <p className="ProductCard__detail-name">{t('ram')}</p>
              <p className="ProductCard__detail-text">{product.ram || '-'}</p>
            </div>
          </div>

          <div className="ProductCard__buttons">
            <div className="ProductCard__add-button">
              <CartButton product={product} />
            </div>

            <div className="ProductCard__favourites-button">
              <FavouritesButton product={product} />
            </div>
          </div>
        </div>
      </Link>
    );
  },
);

export const MProductCard = motion(ProductCard);
