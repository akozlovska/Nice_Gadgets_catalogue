import React from 'react';
import { MProductCard } from '../ProductCard';
import { Product } from '../../types/Product';
import { cardAnimation } from '../../utils/animations';
import './ProductsList.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="ProductsList">
      {products.map((product, index) => (
        <MProductCard
          key={product.id}
          product={product}
          variants={cardAnimation}
          custom={index + 1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
      ))}
    </div>
  );
};
