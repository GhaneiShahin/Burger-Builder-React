import React from "react";
// import { Link } from "react-router-dom";

import classes from "./NavigationItems.css";

const NavItems = (props) => {
  return (
    <ul className={classes.NavItems}>
      <li>
        <a className={props.active ? classes.active : null} href="/">
          Burger Builder
        </a>
      </li>
      <li>
        <a className={props.active ? classes.active : null} href="/">
          Checkout
        </a>
      </li>
    </ul>
  );
};

export default NavItems;
