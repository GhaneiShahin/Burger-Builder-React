import React, { Fragment } from "react";

import classes from "./Layout.css";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={classes.layoutMain}>{children}</main>
    </Fragment>
  );
};

export default Layout;
