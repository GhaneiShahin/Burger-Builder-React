import React, { Fragment, useState } from "react";

import classes from "./Layout.css";
import Toolbar from "../../components/Navigations/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigations/SideDrawer/SideDrawer";

const Layout = ({ children }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerCloseHnadler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => {
      return !prevState.showSideDrawer
    });
  };

  return (
    <Fragment>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={showSideDrawer} closed={sideDrawerCloseHnadler} />
      <main className={classes.layoutMain}>{children}</main>
    </Fragment>
  );
};

export default Layout;
