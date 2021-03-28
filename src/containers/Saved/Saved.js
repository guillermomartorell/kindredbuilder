import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import KindredSummary from "../../components/Overview/KindredSummary/KindredSummary";
import SavedData from "./SavedData/SavedData";

const Saved = props => {
  const savedCancelledHandler = () => {
    props.history.goBack();
  };
  const savedContinueHandler = () => {
    props.history.replace("/saved/save-data");
  };

  let summary = <Redirect to="/" />;
  if (props.atr) {
    const savedRedirect = props.saved ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {savedRedirect}
        <KindredSummary
          attributes={props.atr}
          savedCancelled={savedCancelledHandler}
          savedContinue={savedContinueHandler}
        />
        <Route
          path={props.match.path + "/save-data"}
          component={SavedData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = state => {
  return {
    atr: state.kindredBuilder.attributes,
    saved: state.save.saved,
  };
};

export default connect(mapStateToProps)(Saved);
