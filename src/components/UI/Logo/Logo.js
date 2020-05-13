import React from "react";

import MyLogo from "../../../assets/img/burger-logo.png";
import classes from "./Logo.css";

const Logo = (props) => {
  return (
    <div
      className={classes.Logo}
      style={{ height: props.height, marginBottom: props.marginB }}
    >
      <img src={MyLogo} alt="Logo" />
    </div>
  );
};

export default Logo;
