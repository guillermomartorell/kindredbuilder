import React, { useState } from "react";
// import classes from "./BuildControl.module.css";
import { BsFillDropletFill } from "react-icons/bs";

const BuildControl = props => {
  const [pointRating, setPointRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(1);
  return (
    <div>
      {[...Array(5)].map((_, i) => {
        const pointValue = i + 1;
        return (
          <label key={i}>
            <input
              style={{ display: "none" }}
              type="radio"
              name="point"
              value={pointRating}
              onClick={() => {
                setPointRating(pointValue);
              }}
            />
            <BsFillDropletFill
              color={
                pointValue <= (hoverRating || pointRating) ? " #8a0303" : "grey"
              }
              onMouseEnter={() => setHoverRating(pointValue)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => props.passedPointValue(pointValue)}
              size={20}
            />
          </label>
        );
      })}
    </div>
  );
};

export default BuildControl;
