import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import atObj from "../KindredAttributes/attributesObject";

const BuildControls = props => {
  const [pointValue, setPointValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [hoverTitle, setHoverTitle] = useState(null);
  const [hoverDesc, setHoverDesc] = useState(null);

  const hoverValueHandler = (value, type) => {
    setHoverValue(hoverValue);
    const atTitle = atObj.map(ctrl => {
      return type === ctrl.type ? ctrl.label : null;
    });
    const atValue = atObj.map(ctrl => {
     return type === ctrl.type ? ctrl.val[value - 1] : null;
    });
    setHoverTitle(atTitle);
    setHoverDesc(atValue);
  };
  return (
    <div className={classes.BuildControlsWrapper}>
      <div className={classes.BuildControlsContainer}>
        {atObj.map(ctrl => (
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
      <p>
        <br />
        ----
        <br />
      </p>
      <button
        className={classes.SaveButton}
        disabled={props.savable}
        onClick={props.saving}
      >
        {props.isAuth ? "SAVE NOW" : "Log In to Save"}
      </button>
      <p>
        <br />
        ----
        <br />
      </p>
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
