import React from "react";
import classes from "./Kindred.module.css";
import KindredAttributes from "./KindredAttributes/kindredAttributes";

const kindred = props => {
  const transformedSTR = Object.keys(props.attributes).map(atKey => {
    return [...Array(props.attributes[atKey])].map((_, at) => {
      console.log(atKey)
      return <KindredAttributes key={atKey + at} type={atKey} />;
    });
  });
  return (
    <div className={classes.Kindred}>
      <div>STR: {transformedSTR}</div>
    </div>
  );
};
export default kindred;
