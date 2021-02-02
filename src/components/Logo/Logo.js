import React from "react";
import burgerLogo from "../../assets/images/vtmLogo.png";
import classes from "./Logo.module.css";

const logo = props => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="KindredBuilder" />
  </div>
);
export default logo
