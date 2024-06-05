import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouritesContext';
import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import { Search } from '../Search';
import './Header.scss';

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { totalQuantity } = useCart();
  const { favourites } = useFavourites();

  const location = useLocation();
  const isSearch = useMemo(() => {
    return (
      location.pathname === '/phones' ||
      location.pathname === '/tablets' ||
      location.pathname === '/accessories' ||
      location.pathname === '/favorites'
    );
  }, [location.pathname]);

  const [isSmallSearch, setIsSmallSearch] = useState(false);

  const handleSearch = () => {
    setIsSmallSearch(currState => !currState);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    setIsSidebarOpen(false);
    setIsSmallSearch(false);
    document.body.scrollTo({ top: 0 });
  }, [location.pathname]);

  useEffect(() => {
    if (isSmallSearch) {
      const search = document.querySelector('.Search__input') as HTMLElement;

      search.focus();
    }
  }, [isSmallSearch]);

  return (
    <header className="header">
      <div className="header__wrapper header__wrapper--left">
        <div className="header__logo">
          <Logo />
        </div>

        <div className="header__nav">
          <Navbar />
        </div>
      </div>

      <div className="header__wrapper">
        {!!isSearch && (
          <>
            <div className="search">
              <Search key={location.pathname} />
            </div>
            <button
              type="button"
              aria-label="Search"
              className="icon icon--search"
              onClick={handleSearch}
            />
          </>
        )}

        <div className="header__buttons-desktop">
          <NavLink
            to="favorites"
            className={({ isActive }) =>
              cn('icon icon--favourites header__button', {
                'icon--active': isActive,
              })
            }
          >
            {!!favourites.length && (
              <span className="icon__quantity">{favourites.length}</span>
            )}
          </NavLink>
          <NavLink
            to="cart"
            className={({ isActive }) =>
              cn('icon icon--cart header__button', {
                'icon--active': isActive,
              })
            }
          >
            {!!totalQuantity && (
              <span className="icon__quantity">{totalQuantity}</span>
            )}
          </NavLink>
        </div>

        <div className="header__buttons-mobile">
          <button
            className={cn('icon icon--menu', {
              'icon--close': isSidebarOpen,
            })}
            type="button"
            aria-label="menu"
            onClick={() => setIsSidebarOpen(currState => !currState)}
          />
        </div>

        <TransitionGroup>
          {isSmallSearch && (
            <CSSTransition key={0} timeout={300} classNames="search-small">
              <div className="search search--small">
                <Search />
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    </header>
  );
};
