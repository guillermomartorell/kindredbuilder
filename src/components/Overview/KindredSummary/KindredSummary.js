import React from "react";

import Button from "../../UI/Button/Button";
import classes from "./KindredSummary.module.css";

const kindredSummary = props => {
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
    <div className={classes.KindredSummary}>
      <h1>Enjoy UnLife!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
      <p>Attributes: {attributesOutput}</p>
      
      </div>
      <Button btnType="Danger" clicked={props.savedCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.savedContinue}>
        EMBRACE
      </Button>
    </div>
  );
};

export default kindredSummary;
