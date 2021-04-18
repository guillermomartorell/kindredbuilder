import React from "react";
import PropTypes from "prop-types";
import att from "./attributes.js";

const KindredAttributes = props => {
  
  const atEntries = Object.entries(att);
  console.log(atEntries)
  let atValue = atEntries.map((at,i) => {
    return props.type === atEntries[i][0] ?  atEntries[i][1][props.val] : null
  })
  let atTitle = atEntries.map((at,i) => {
    return props.type === atEntries[i][0] ?  atEntries[i][1][0]: null
  })
  console.log(atTitle)
  
  // let atName;
  // let atValue;
  // switch (props.type) {
  //   case "str":
  //     atName = att.str[0];
  //     atValue = att.str[props.val];
  //     break;
  //   case "dex":
  //     atName = att.dex[0];
  //     atValue = att.dex[props.val];
  //     break;
  //   case "sta":
  //     atName = att.sta[0];
  //     atValue = att.sta[props.val];
  //     break;
  //   default:
  //     return null;
  // }
  let attributes = (
    <div>
      <strong>{atTitle}:</strong>
      <div>{atValue }</div>
    </div>
  );
  return attributes;
};

KindredAttributes.propTypes = {
  type: PropTypes.string.isRequired,
};

export default KindredAttributes;
