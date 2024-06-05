import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { slideRightAnimation } from '../../utils/animations';
import './ProductDetailsImages.scss';

type Props = {
  images: string[];
  name: string;
};

export const ProductDetailsImages: React.FC<Props> = ({ images, name }) => {
  const [displayedImage, setDisplayedImage] = useState(0);

  useEffect(() => {
    setDisplayedImage(0);
  }, [name]);

  return (
    <motion.div className="ProductDetailsImages" variants={slideRightAnimation}>
      <div className="ProductDetailsImages__all-images">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={cn('ProductDetailsImages__image-wrapper', {
              'ProductDetailsImages__image-wrapper--selected':
                index === displayedImage,
            })}
            onClick={() => setDisplayedImage(index)}
          >
            <img
              src={image}
              alt={name}
              className="ProductDetailsImages__image"
            />
          </button>
        ))}
      </div>

      <div className="ProductDetailsImages__displayed-image-wrapper">
        <TransitionGroup component={null}>
          <CSSTransition key={displayedImage} timeout={300} classNames="slide">
            <img
              src={images[displayedImage]}
              alt={name}
              className="ProductDetailsImages__displayed-image"
            />
          </CSSTransition>
        </TransitionGroup>
      </div>
    </motion.div>
  );
};
