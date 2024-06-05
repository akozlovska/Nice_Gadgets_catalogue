import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { PerPageOptions } from '../../types/PerPageOptions';
import { QueryParams } from '../../types/QueryParams';
import { SortOptions } from '../../types/SortOptions';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import { Dropdown } from '../Dropdown';
import './FilterDropdowns.scss';

export const FilterDropdowns = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortType = searchParams.get(QueryParams.Sort) || 'age';
  const perPage = searchParams.get(QueryParams.PerPage) || '16';
  const { t } = useTranslation();

  const perPageOptions: PerPageOptions = {
    '4': '4',
    '8': '8',
    '16': '16',
    all: t('all'),
  };

  const sortOptions: SortOptions = {
    age: t('newest'),
    name: t('alphabetically'),
    price: t('cheapest'),
  };

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handlePerPage = (newPerPage: string) => {
    if (perPage !== newPerPage) {
      setSearchWith({ perPage: newPerPage, page: '1' });
    }
  };

  const handleSort = (newSortType: string) => {
    if (sortType !== newSortType) {
      setSearchWith({ sort: newSortType, page: '1' });
    }
  };

  return (
    <>
      <div
        className="FilterDropdowns__dropdown 
        FilterDropdowns__dropdown--sort"
      >
        {t('sort-by')}

        <Dropdown
          options={sortOptions}
          chosenOption={sortOptions[sortType as keyof typeof sortOptions]}
          handleOption={handleSort}
        />
      </div>

      <div
        className="FilterDropdowns__dropdown 
        FilterDropdowns__dropdown--page"
      >
        {t('items-on-page')}

        <Dropdown
          options={perPageOptions}
          chosenOption={perPageOptions[perPage as keyof typeof perPageOptions]}
          handleOption={handlePerPage}
        />
      </div>
    </>
  );
};
