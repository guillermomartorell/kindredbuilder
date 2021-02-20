import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import KindredSummary from "../../components/Overview/KindredSummary/KindredSummary";
import SavedData from "./SavedData/SavedData";

class Saved extends Component {
  savedCancelledHandler = () => {
    this.props.history.goBack();
  };
  savedContinueHandler = () => {
    this.props.history.replace("/saved/save-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.atr) {
      summary = (
        <div>
          <KindredSummary
            attributes={this.props.atr}
            savedCancelled={this.savedCancelledHandler}
            savedContinue={this.savedContinueHandler}
          />
          <Route
            path={this.props.match.path + "/save-data"}
            component={SavedData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    atr: state.kindredBuilder.attributes,
  };
};

export default connect(mapStateToProps)(Saved);
