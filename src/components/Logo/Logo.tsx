import { NavLink } from 'react-router-dom';
import './Logo.scss';

export const Logo = () => (
  <NavLink to="/" className="Logo">
    <img src="./logo.svg" alt="Logo" className="Logo__image" />
  </NavLink>
);
