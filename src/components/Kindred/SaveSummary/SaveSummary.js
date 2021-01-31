import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
const saveSummary = props => {
  const attributesSummary = Object.keys(props.attributes).map(atKey => {
    return (
      <li key={atKey}>
        <span>{atKey}</span>: {props.attributes[atKey]}
      </li>
    );
  });
  return (
    <Auxiliary>
      <h3>Your Kindred</h3>
      <p>This predator of the night has the following attributes:</p>
      <ul>{attributesSummary}</ul>
      <p>Do you want to save this creature?</p>
      <button>EMBRACE</button>
      <button>SPARE</button>
    </Auxiliary>
  );
};
export default saveSummary;
