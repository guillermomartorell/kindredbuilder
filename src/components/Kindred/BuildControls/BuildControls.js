import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Strength", type: "str" },
  { label: "Dexterity", type: "dex" },
  { label: "Stamina", type: "sta" },
  { label: "Charisma", type: "cha" },
  { label: "Manipulation", type: "man" },
  { label: "Composure", type: "com" },
  { label: "Intelligence", type: "int" },
  { label: "Wits", type: "wit" },
  { label: "Resolve", type: "res" },
];

const BuildControls = props => {
  const [pointValue, setPointValue] = useState(1);
  // const atType = Object.entries(props.atr);
  // console.log(atType);
  return (
    <div className={classes.BuildControlsWrapper}>
      <p>
        Current Availabe Points: <strong>{props.availablePoints}</strong>
      </p>
      <div className={classes.BuildControlsContainer}>
        {controls.map(ctrl => (
          <div
            onClick={() => props.attributeValue(ctrl.type, pointValue)}
            key={ctrl.label}
          >
            <strong>{ctrl.label}</strong>
            <BuildControl
              passedPointValue={pointValue => setPointValue(pointValue)}

              // added={() => props.attributesAdded(ctrl.type)}
              // removed={() => props.attributesRemoved(ctrl.type)}
              // attributeValue={ () => props.attributeValue(ctrl.type, pointValue)}
              // disabledMin={props.disabledMin[ctrl.type]}
              // disabledMax={props.disabledMax[ctrl.type]}
            />
          </div>
        ))}
      </div>
      <button
        className={classes.SaveButton}
        disabled={props.savable}
        onClick={props.saving}
      >
        {props.isAuth ? "SAVE NOW" : "Log In to Save"}
      </button>
      <p>Point is : {pointValue}</p>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    atr: state.kindredBuilder.attributes,
  };
};

export default connect(mapStateToProps, null)(BuildControls);

// export default BuildControls;
