import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import { clsx } from 'clsx';

const activeClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function Navigation(){
  return (
    <nav className={css.nav}>
      <NavLink className={activeClass} to="/" end>
        Home
      </NavLink>
      <NavLink className={activeClass} to="/movies" end>
        Movies
      </NavLink>
    </nav>
  );
};

