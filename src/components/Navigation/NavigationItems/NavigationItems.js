import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Kindred Builder</NavigationItem>
    {!props.isAuth ? null : (
      <NavigationItem link="/saves">Saved</NavigationItem>
    )}
    {!props.isAuth ? (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);
export default navigationItems;
