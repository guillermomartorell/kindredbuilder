import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import KindredSummary from "../../components/Overview/KindredSummary/KindredSummary";
import SavedData from "./SavedData/SavedData";
// import * as actions from '../../store/actions/index'

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
      const savedRedirect = this.props.saved ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {savedRedirect}
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
    saved: state.save.saved
  };
};


export default connect(mapStateToProps)(Saved);
