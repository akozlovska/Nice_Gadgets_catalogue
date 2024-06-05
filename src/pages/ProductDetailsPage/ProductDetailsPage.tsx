/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { motion } from 'framer-motion';
import {
  slideLeftAnimation,
  slideRightAnimation,
} from '../../utils/animations';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import * as productsService from '../../services/productsService';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { BackLink } from '../../components/BackLink';
import { CartButton } from '../../components/CartButton';
import { FavouritesButton } from '../../components/FavouritesButton';
import { ProductDetailsImages } from '../../components/ProductDetailsImages';
import { SuggestedProducts } from '../../components/SuggestedProducts';
import './ProductDetailsPage.scss';

export const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();

  const { t } = useTranslation();

  useEffect(() => {
    if (productId) {
      productsService.getProductById(+productId).then(setProduct);
    }
  }, [productId]);

  useEffect(() => {
    if (product) {
      productsService
        .getProductDetails(product.category, product.itemId)
        .then(productDetails => {
          if (productDetails) {
            setDetails(productDetails);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [product]);

  return (
    <article className="ProductDetailsPage" key={productId}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!details || !product ? (
            <>
              <BackLink />
              <motion.h2
                variants={slideRightAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {t('product-not-found')}
              </motion.h2>
            </>
          ) : (
            <>
              <Breadcrumbs category={product.category} product={details.name} />

              <BackLink />

              <motion.h2
                className="ProductDetailsPage__title"
                variants={slideRightAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {details.name}
              </motion.h2>

              <motion.div
                className="ProductDetailsPage__content"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="ProductDetailsPage__wrapper">
                  <ProductDetailsImages
                    images={details.images}
                    name={details.name}
                  />

                  <motion.div
                    className="ProductDetailsPage__info"
                    variants={slideLeftAnimation}
                  >
                    <div className="ProductDetailsPage__variants-wrapper">
                      <div className="ProductDetailsPage__variants">
                        <p className="ProductDetailsPage__variants-name">
                          {t('available-colors')}
                          <span className="ProductDetailsPage__info-id">
                            {`ID: ${product.id}`}
                          </span>
                        </p>
                        <div className="ProductDetailsPage__variants-container">
                          {details.colorsAvailable.map(color => (
                            <button
                              key={color}
                              className={cn(
                                'ProductDetailsPage__color-button',
                                {
                                  'ProductDetailsPage__color-button--selected':
                                    color === details.color,
                                },
                              )}
                            >
                              <div
                                className="ProductDetailsPage__color-button-fill"
                                style={{ backgroundColor: color }}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="ProductDetailsPage__variants">
                        <p className="ProductDetailsPage__variants-name">
                          {t('select-capacity')}
                        </p>
                        <div className="ProductDetailsPage__variants-container">
                          {details.capacityAvailable.map(capacity => (
                            <button
                              key={capacity}
                              className={cn(
                                'ProductDetailsPage__capacity-button',
                                {
                                  'ProductDetailsPage__capacity-button--selected':
                                    capacity === details.capacity,
                                },
                              )}
                            >
                              {capacity}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="ProductDetailsPage__prices">
                      <h2 className="ProductDetailsPage__new-price">
                        {`$${product.price}`}
                      </h2>

                      {product.price !== product.fullPrice && (
                        <h2 className="ProductDetailsPage__old-price">{`$${product.fullPrice}`}</h2>
                      )}
                    </div>

                    <div className="ProductDetailsPage__buttons">
                      <div className="ProductDetailsPage__add-button">
                        <CartButton product={product} />
                      </div>

                      <div className="ProductDetailsPage__favourites-button">
                        <FavouritesButton product={product} />
                      </div>
                    </div>

                    <div className="ProductDetailsPage__details">
                      <div className="ProductDetailsPage__detail">
                        <p className="ProductDetailsPage__detail-name">
                          {t('screen')}
                        </p>
                        <p className="ProductDetailsPage__detail-text">
                          {details.screen}
                        </p>
                      </div>

                      <div className="ProductDetailsPage__detail">
                        <p className="ProductDetailsPage__detail-name">
                          {t('resolution')}
                        </p>
                        <p className="ProductDetailsPage__detail-text">
                          {details.resolution}
                        </p>
                      </div>

                      <div className="ProductDetailsPage__detail">
                        <p className="ProductDetailsPage__detail-name">
                          {t('processor')}
                        </p>
                        <p className="ProductDetailsPage__detail-text">
                          {details.processor}
                        </p>
                      </div>

                      <div className="ProductDetailsPage__detail">
                        <p className="ProductDetailsPage__detail-name">
                          {t('ram')}
                        </p>
                        <p className="ProductDetailsPage__detail-text">
                          {details.ram}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="ProductDetailsPage__wrapper ProductDetailsPage__wrapper--2"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="ProductDetailsPage__about"
                    variants={slideRightAnimation}
                  >
                    <h3 className="ProductDetailsPage__about-title">
                      {t('about')}
                    </h3>
                    <div className="ProductDetailsPage__about-wrapper">
                      {details.description.map(({ title, text }) => (
                        <div key={title}>
                          <h4 className="ProductDetailsPage__about-subtitle">
                            {title}
                          </h4>
                          <div className="ProductDetailsPage__about-text-wrapper">
                            {text.map((textPart, i) => (
                              <p
                                key={i}
                                className="ProductDetailsPage__about-text"
                              >
                                {textPart}
                              </p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="ProductDetailsPage__specs"
                    variants={slideLeftAnimation}
                  >
                    <h3 className="ProductDetailsPage__specs-title">
                      {t('tech-specs')}
                    </h3>
                    <div className="ProductDetailsPage__specs-wrapper">
                      <div className="ProductDetailsPage__spec">
                        <p className="ProductDetailsPage__spec-name">
                          {t('screen')}
                        </p>
                        <p>{product.screen}</p>
                      </div>

                      <div className="ProductDetailsPage__spec">
                        <p className="ProductDetailsPage__spec-name">
                          {t('resolution')}
                        </p>
                        <p>{details.resolution}</p>
                      </div>

                      <div className="ProductDetailsPage__spec">
                        <p className="ProductDetailsPage__spec-name">
                          {t('processor')}
                        </p>
                        <p>{details.resolution}</p>
                      </div>

                      <div className="ProductDetailsPage__spec">
                        <p className="ProductDetailsPage__spec-name">
                          {t('ram')}
                        </p>
                        <p>{details.ram}</p>
                      </div>

                      <div className="ProductDetailsPage__spec">
                        <p className="ProductDetailsPage__spec-name">
                          {t('built-in-memory')}
                        </p>
                        <p>{details.capacity}</p>
                      </div>

                      {details.camera && (
                        <div className="ProductDetailsPage__spec">
                          <p className="ProductDetailsPage__spec-name">
                            {t('camera')}
                          </p>
                          <p>{details.camera}</p>
                        </div>
                      )}

                      {details.zoom && (
                        <div className="ProductDetailsPage__spec">
                          <p className="ProductDetailsPage__spec-name">
                            {t('zoom')}
                          </p>
                          <p>{details.zoom}</p>
                        </div>
                      )}

                      <div className="ProductDetailsPage__spec">
                        <p className="ProductDetailsPage__spec-name">
                          {t('cell')}
                        </p>
                        <p>{details.cell.join(', ')}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              <SuggestedProducts productId={productId} />
            </>
          )}
        </>
      )}
    </article>
  );
};
