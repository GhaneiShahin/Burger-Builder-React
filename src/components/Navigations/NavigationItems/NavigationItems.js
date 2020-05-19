import React from "react";
// import { Link } from "react-router-dom";

import classes from "./NavigationItems.css";
import { NavLink } from "react-router-dom";

const NavItems = (props) => {
  return (
    <ul className={classes.NavItems}>
      <li>
        <NavLink activeClassName={classes.active} to="/" exact>Burger Builder</NavLink>
      </li>
      <li>
        <NavLink activeClassName={classes.active} to="/orders" exact>Orders</NavLink>
      </li>
    </ul>
  );
};

export default NavItems;
