import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoSearchResults } from '../../components/NoSearchResults';
import { ProductsList } from '../../components/ProductsList';
import { useFavourites } from '../../context/FavouritesContext';
import {
  slideRightAnimation,
  staggeredSlideRightAnimation,
} from '../../utils/animations';
import {
  getFilteredProducts,
  getTranslatedPlural,
} from '../../utils/productsHelper';
import './FavouritesPage.scss';

export const FavouritesPage = () => {
  const { favourites } = useFavourites();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const displayedFavourites = useMemo(() => {
    return getFilteredProducts(favourites, query);
  }, [favourites, query]);
  const total = displayedFavourites.length;

  const { t } = useTranslation();

  return (
    <motion.div
      className="FavouritesPage"
      initial="hidden"
      whileInView="visible"
    >
      <Breadcrumbs category="favourites" />
      <AnimatePresence>
        {favourites.length ? (
          <>
            {query ? (
              <>
                {!total ? (
                  <NoSearchResults />
                ) : (
                  <>
                    <motion.p
                      className="FavouritesPage__text"
                      variants={slideRightAnimation}
                      initial="hidden"
                      animate="visible"
                      key={0}
                    >
                      {getTranslatedPlural('result', total)}
                    </motion.p>
                    <ProductsList products={displayedFavourites} />
                  </>
                )}
              </>
            ) : (
              <>
                <motion.h2
                  className="FavouritesPage__title"
                  variants={staggeredSlideRightAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1}
                  key={1}
                >
                  {t('favourites')}
                </motion.h2>
                <motion.p
                  className="FavouritesPage__text"
                  variants={staggeredSlideRightAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={2}
                  key={2}
                >
                  {getTranslatedPlural('item', total)}
                </motion.p>
                <ProductsList products={displayedFavourites} />
              </>
            )}
          </>
        ) : (
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={staggeredSlideRightAnimation}
            custom={1}
            key={3}
          >
            {t('favourites-empty')}
          </motion.h2>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
