import { NavLink } from "react-router-dom";

import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={css.containerNav}>
      <nav className={css.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? css.active : css.link)}
        >
          Home
        </NavLink>

        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? css.active : css.link)}
        >
          Movies
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
