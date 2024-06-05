import { SortType } from '../types/SortType';
import { Product } from '../types/Product';
import i18n from '../i18n';

export function getPageNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export function getDisplayedProducts(
  allProducts: Product[],
  perPage: string,
  currentPage: number,
) {
  if (perPage === 'all') {
    return [...allProducts];
  }

  const startIndex = +perPage * currentPage - +perPage;
  const endIndex = +perPage * currentPage;

  return [...allProducts].slice(startIndex, endIndex);
}

export function getFilteredProducts(
  allProducts: Product[],
  query: string,
  sortType?: string,
) {
  let filtered = [...allProducts];

  if (query) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (sortType) {
    switch (sortType) {
      case SortType.Alphabetically:
        filtered.sort((product1, product2) =>
          product1.name.localeCompare(product2.name),
        );
        break;

      case SortType.Cheapest:
        filtered.sort((product1, product2) => product1.price - product2.price);
        break;

      default:
      case SortType.Newest:
        filtered.sort((product1, product2) => product2.year - product1.year);
    }
  }

  return filtered;
}

export const getTranslatedPlural = (word: string, items: number) => {
  const stringified = items.toString();
  const lastDigit = +stringified[stringified.length - 1];

  if (items === 1 || lastDigit === 1) {
    return `${items} ${i18n.t(word)}`;
  }

  if (items < 5 || lastDigit < 5) {
    return `${items} ${i18n.t(`${word}s-234`)}`;
  }

  return `${items} ${i18n.t(`${word}s`)}`;
};
