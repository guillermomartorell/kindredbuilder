import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Kindred Builder</NavigationItem>
    <NavigationItem link="/saves">Saved</NavigationItem>
    <NavigationItem link="/auth">Authenticate</NavigationItem>
  </ul>
);
export default navigationItems;
