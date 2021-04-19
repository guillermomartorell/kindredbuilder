import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import atrDesc from "../KindredAttributes/attributes";

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
  const [hoverValue, setHoverValue] = useState(1);
  const [hoverTitle, setHoverTitle] = useState(null);
  const [hoverDesc, setHoverDesc] = useState(null);

  const atEntries = Object.entries(atrDesc);
  // let atValue = atEntries.map((at, i) => {
  //   return props.type === atEntries[i][0] ? atEntries[i][1][props.val] : null;
  // });
  // let atTitle = atEntries.map((at, i) => {
  //   return props.type === atEntries[i][0] ? atEntries[i][1][0] : null;
  // });
  const hoverValueHandler = (value, type) => {
    setHoverValue(value);
    let atTitle = atEntries.map((at, i) => {
      return type === atEntries[i][0] ? atEntries[i][1][0] : null;
    });
    let atValue = atEntries.map((at, i) => {
      return type === atEntries[i][0] ? atEntries[i][1][value] : null;
    });
    setHoverTitle(atTitle);
    setHoverDesc(atValue);
  };
  return (
    <div className={classes.BuildControlsWrapper}>
      {/* <p>
        Current Availabe Points: <strong>{props.availablePoints}</strong>
      </p> */}
      <div className={classes.BuildControlsContainer}>
        {controls.map(ctrl => (
          <div
            onClick={() => props.attributeValue(ctrl.type, pointValue)}
            key={ctrl.label}
          >
            <strong>{ctrl.label}</strong>
            <BuildControl
              passedPointValue={pointValue => setPointValue(pointValue)}
              atr={props.atr}
              type={ctrl.type}
              passedHoverValue={(hoverValue, type) =>
                hoverValueHandler(hoverValue, type)
              }
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
      {/* <p>Hover Value: {hoverValue}</p> */}
      <p>----</p>
      <strong>{hoverTitle}</strong>
      <p>{hoverDesc}</p>
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
