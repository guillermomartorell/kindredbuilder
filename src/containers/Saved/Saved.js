import React, { Component } from "react";
import KindredSummary from "../../components/Overview/KindredSummary/KindredSummary";
import SavedData from "./SavedData/SavedData";
import { Route } from "react-router-dom";

class Saved extends Component {
  state = {
    attributes: {
      str: 1,
      dex: 1,
      sta: 1,
    },
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const attributes = {};
    for (let param of query.entries()) {
      attributes[param[0]] = +param[1];
    }
    this.setState({ attributes: attributes });
  }
  savedCancelledHandler = () => {
    this.props.history.goBack();
  };
  savedContinueHandler = () => {
    this.props.history.replace("/saved/save-data");
  };
  render() {
    return (
      <div>
        <KindredSummary
          attributes={this.state.attributes}
          savedCancelled={this.savedCancelledHandler}
          savedContinue={this.savedContinueHandler}
        />
        <Route
          path={this.props.match.path + "/save-data"}
          render={props => (
            <SavedData attributes={this.state.attributes} {...props} />
          )}
        />
      </div>
    );
  }
}

export default Saved;
