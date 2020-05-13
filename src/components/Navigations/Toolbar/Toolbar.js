import React from "react";

import classes from "./Toolbar.css";
import Logo from "../../Layout/Logo/Logo";
import NavItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked}/>
      <Logo height="80%" />
      <nav className={classes.DesktopOnly}>
        <NavItems />
      </nav>
    </header>
  );
};

export default Toolbar;
