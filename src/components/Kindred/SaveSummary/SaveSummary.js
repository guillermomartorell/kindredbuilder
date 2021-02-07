import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

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
      <Button btnType="Danger" clicked={props.savingCanceld}>
        SPARE
      </Button>
      <Button btnType="Success" clicked={props.savingContinue}>
        EMBRACE
      </Button>
    </Auxiliary>
  );
};

export default saveSummary;
