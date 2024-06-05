import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import './Navbar.scss';

function getClassName({ isActive }: { isActive: boolean }) {
  return cn('Navbar__link', {
    'Navbar__link--active': isActive,
  });
}

export const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="Navbar">
      <NavLink to="/" className={getClassName}>
        {t('home')}
      </NavLink>
      <NavLink to="/phones" className={getClassName}>
        {t('phones')}
      </NavLink>
      <NavLink to="/tablets" className={getClassName}>
        {t('tablets')}
      </NavLink>
      <NavLink to="/accessories" className={getClassName}>
        {t('accessories')}
      </NavLink>
    </nav>
  );
};
