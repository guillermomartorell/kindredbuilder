import React from "react";
// import classes from "./kindredAttributes.module.css";
import PropTypes from "prop-types";
import * as att from "./attributes.js";

const KindredAttributes = props => {
  let atName;
  let atValue;
  let attributes;
  switch (props.type) {
    case "str":
      atName = att.str[0];
      atValue = att.str[props.val];
      break;
    case "dex":
      atName = att.dex[0];
      atValue = att.dex[props.val];
      break;
    case "sta":
      atName = att.sta[0];
      atValue = att.sta[props.val];
      break;
    default:
      return null;
  }
  attributes = (
    <div>
      <div>
        <strong>{atName}:</strong>
      </div>
      {atValue}
    </div>
  );
  return attributes;
};

KindredAttributes.propTypes = {
  type: PropTypes.string.isRequired,
};

export default KindredAttributes;
