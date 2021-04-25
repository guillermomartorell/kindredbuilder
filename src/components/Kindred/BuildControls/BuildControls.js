import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import atObj from "../KindredAttributes/attributesObject";
import skObj from "../KindredAttributes/skillsObject";
import { getStatTitle, getStatValue } from "../../../shared/utility";

const BuildControls = props => {
  const [pointValue, setPointValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [hoverTitle, setHoverTitle] = useState(null);
  const [hoverDesc, setHoverDesc] = useState(null);

  const hoverValueHandler = (value, type, obj) => {
    setHoverValue(hoverValue);
    const atTitle = getStatTitle(obj, type);
    const atValue = getStatValue(obj, type, value);
    setHoverTitle(atTitle);
    setHoverDesc(atValue);
  };
  return (
    <>
      <div className={classes.BuildControlsWrapper}>
        <h4>Attributes</h4>
        <div className={classes.AttributesBuildControlsContainer}>
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
                  hoverValueHandler(hoverValue, type, atObj)
                }
              />
            </div>
          ))}
        </div>
        <div className={classes.BuildControlsWrapper}>
          <h4>Skills</h4>
          <div className={classes.SkillsBuildControlsContainer}>
            {skObj.map(ctrl => (
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
                    hoverValueHandler(hoverValue, type, skObj)
                  }
                />
              </div>
            ))}
          </div>
          <p>
            <br />
            ----
            <br />
          </p>
          <button className={classes.SaveButton} onClick={props.saving}>
            {props.isAuth ? "SAVE NOW" : "Log In to Save"}
          </button>
        </div>

        <div
          className={`${classes.BuildControlsWrapper} ${classes.statDisplay}`}
        >
          <p>
            <br />
            ----
            <br />
          </p>
          <strong>{hoverTitle}</strong>
          <p>{hoverDesc}</p>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    atr: state.kindredBuilder.attributes,
  };
};

export default connect(mapStateToProps, null)(BuildControls);
