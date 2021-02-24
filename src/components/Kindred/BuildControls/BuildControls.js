import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Strength", type: "str" },
  { label: "Dexterity", type: "dex" },
  { label: "Stamina", type: "sta" },
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Availabe Points: <strong>{props.availablePoints}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.attributesAdded(ctrl.type)}
        removed={() => props.attributesRemoved(ctrl.type)}
        disabledMin={props.disabledMin[ctrl.type]}
        disabledMax={props.disabledMax[ctrl.type]}
      />
    ))}
    <button className={classes.SaveButton}
    disabled={!props.savable}
    onClick={props.saving}>{props.isAuth ? "SAVE NOW" : "Log In to Save"}</button>
  </div>
);

export default buildControls;
