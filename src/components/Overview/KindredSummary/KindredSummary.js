import React from "react";

import Button from "../../UI/Button/Button";
import classes from './KindredSummary.module.css'

const kindredSummary = props => {
  return (
    <div className={classes.KindredSummary}>
      <h1>Enjoy UnLife!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        
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
