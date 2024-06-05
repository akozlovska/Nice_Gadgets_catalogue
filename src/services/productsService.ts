import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import { client } from '../utils/fetchClient';

export const getProducts = () => {
  return client.get<Product[]>('/products.json');
};

export const getProductById = (productId: number) => {
  return client
    .get<Product[]>('/products.json')
    .then(
      products => products.find(product => product.id === productId) || null,
    );
};

export const getProductDetails = (category: string, productId: string) => {
  return client
    .get<ProductDetails[]>(`/${category}.json`)
    .then(products => products.find(product => product.id === productId));
};

export const getHotPriceProducts = () => {
  return client.get<Product[]>('/products.json').then(products =>
    products.sort((prod1, prod2) => {
      return prod2.fullPrice - prod2.price - (prod1.fullPrice - prod1.price);
    }),
  );
};

export const getBrandNewProducts = () => {
  return client
    .get<Product[]>('/products.json')
    .then(products =>
      products.sort(
        (product1, product2) => product2.fullPrice - product1.fullPrice,
      ),
    );
};

export const getSuggestedProducts = (currentProductId?: number) => {
  return client.get<Product[]>('/products.json').then(products =>
    products
      .filter(product => product.id !== currentProductId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 12),
  );
};

export const getPhones = () => {
  return client
    .get<Product[]>('/products.json')
    .then(products =>
      products.filter(product => product.category === 'phones'),
    );
};

export const getTablets = () => {
  return client
    .get<Product[]>('/products.json')
    .then(products =>
      products.filter(product => product.category === 'tablets'),
    );
};

export const getAccessories = () => {
  return client
    .get<Product[]>('/products.json')
    .then(products =>
      products.filter(product => product.category === 'accessories'),
    );
};
