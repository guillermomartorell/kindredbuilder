import React from "react";
import classes from "./BuildControl.module.css";

const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabledMin}
    >
      Less
    </button>
    <button
      className={classes.More}
      disabled={props.disabledMax}
      onClick={props.added}
    >
      More
    </button>
  </div>
);

export default buildControl;
