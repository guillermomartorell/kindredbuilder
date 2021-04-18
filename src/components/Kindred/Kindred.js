import React from "react";
import classes from "./Kindred.module.css";
import KindredAttributes from "./KindredAttributes/kindredAttributes";

const kindred = props => {
  let transformedAttributes = Object.entries(props.attributes).map(ar => {
    return (
      <KindredAttributes key={Math.random() * 5} val={ar[1]} type={ar[0]} />
    );
  });

  // const reducedAttributes = Object.keys(props.attributes);
  // .map(atKey => {
  //   return [...Array(props.attributes[atKey])].map((_, at) => {
  //     return <KindredAttributes key={atKey + at} type={atKey} />;
  //   });
  // }).reduce((arr, el) => {
  //   return arr.concat(el);
  // }, []);
  if (Object.keys(props.attributes).length === 0) {
    transformedAttributes = <p>Please add attributes</p>;
  }
  return <div className={classes.Kindred}>{transformedAttributes}</div>;
};
export default kindred;
