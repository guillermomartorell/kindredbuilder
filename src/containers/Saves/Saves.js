import React, { useEffect } from "react";
import { connect } from "react-redux";

import Overview from "../../components/Overview/Overview";
import axios from "../../axios-saved";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const Saves = props => {
  const { onFetchSaves, token, userId } = props;
  useEffect(() => {
    onFetchSaves(token, userId);
  }, [onFetchSaves, token, userId]);

  let saves = <Spinner />;
  if (!props.loading) {
    saves = props.saves.map(save => (
      <Overview key={save.id} attributes={save.attributes} />
    ));
  }
  return <div>{saves}</div>;
};

const mapStateToProps = state => {
  return {
    saves: state.save.saves,
    loading: state.save.loading,
    saved: state.save.saved,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchSaves: (token, userId) =>
      dispatch(actions.fetchSaves(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Saves, axios));
