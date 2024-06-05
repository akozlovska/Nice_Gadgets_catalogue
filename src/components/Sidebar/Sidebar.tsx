import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouritesContext';
import { Navbar } from '../Navbar';

type Props = {
  isSidebarOpen: boolean;
};

export const Sidebar: React.FC<Props> = ({ isSidebarOpen }) => {
  const { totalQuantity } = useCart();
  const { favourites } = useFavourites();

  return (
    <aside className="Sidebar">
      <div
        className={cn('Sidebar__window', {
          'Sidebar__window--visible': isSidebarOpen,
        })}
      >
        <Navbar />

        <div className="Sidebar__buttons">
          <NavLink
            to="favorites"
            className={({ isActive }) =>
              cn('icon icon--favourites', {
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
              cn('icon icon--cart Sidebar__button', {
                'icon--active': isActive,
              })
            }
          >
            {!!totalQuantity && (
              <span className="icon__quantity">{totalQuantity}</span>
            )}
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
