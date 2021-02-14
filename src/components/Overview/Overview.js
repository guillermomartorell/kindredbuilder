import React from "react";
import classes from "./Overview.module.css";
const overview = props => {
  const attributes = [];

  for (let atr in props.attributes) {
    attributes.push({
      name: atr,
      amount: props.attributes[atr],
    });
  }

  const attributesOutput = attributes.map(atr => {
    return (
      <span
        key={atr.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {atr.name} ({atr.amount})
      </span>
    );
  });
  return (
    <div className={classes.Overview}>
      <p>Attributes: {attributesOutput}</p>
    </div>
  );
};
export default overview;
