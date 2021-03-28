import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

const Logout = props => {
  const { onLogut } = props;
  useEffect(() => {
    onLogut();
  }, [onLogut]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogut: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
