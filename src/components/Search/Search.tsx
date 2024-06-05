import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { QueryParams } from '../../types/QueryParams';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import './Search.scss';

export const Search: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation().pathname.slice(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(QueryParams.Query) || '';

  const [inputValue, setInputValue] = useState(query);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      setSearchWith({ query: newQuery || null, page: '1' });
    }, 1000),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    applyQuery(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    setSearchWith({ query: null, page: '1' });
  };

  return (
    <form className="Search" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        placeholder={
          i18n.language === 'ua'
            ? t('search-in')
            : `${t('search-in')} ${location}...`
        }
        className="Search__input"
        value={inputValue}
        onChange={handleChange}
      />

      {query ? (
        <button
          type="button"
          className="Search__icon Search__icon--close"
          aria-label="Clear"
          onClick={handleClear}
        />
      ) : (
        <span className="Search__icon Search__icon--search" />
      )}
    </form>
  );
};
