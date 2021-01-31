import React, { Component } from "react";
import classes from "./kindredAttributes.module.css";
import PropTypes from "prop-types";

class KindredAttributes extends Component {
  render() {
    let attributes = null;
    switch (this.props.type) {
      case "str":
        attributes = <div className={classes.BreadBottom}></div>;
        break;
      case "dex":
        attributes = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case "sta":
        attributes = <div className={classes.Meat}></div>;
        break;
      case "cha":
        attributes = <div className={classes.Cheese}></div>;
        break;
      case "man":
        attributes = <div className={classes.Bacon}></div>;
        break;
      case "com":
        attributes = <div className={classes.Salad}></div>;
        break;
      
    }
    return attributes;
  }
}

KindredAttributes.propTypes = {
  type: PropTypes.string.isRequired,
};

export default KindredAttributes;
