import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader';
import { NoResults } from '../components/NoResults';
import { ProductsPage } from '../components/ProductsPage';
import * as productsService from '../services/productsService';
import { Product } from '../types/Product';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const category = 'tablets';
  const { t } = useTranslation();

  useEffect(() => {
    productsService
      .getTablets()
      .then(setTablets)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="tablets">
      <Breadcrumbs category={category} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {tablets.length ? (
            <ProductsPage products={tablets} category={category} />
          ) : (
            <NoResults category={t('tablets')} />
          )}
        </>
      )}
    </div>
  );
};
