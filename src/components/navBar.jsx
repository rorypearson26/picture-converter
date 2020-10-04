import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <ul class="nav justify-content-center">
      <li class="nav-item">
        <NavLink class="nav-link" to="/about">
          About
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
