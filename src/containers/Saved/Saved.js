import React, { Component } from "react";
import KindredSummary from "../../components/Overview/KindredSummary/KindredSummary";

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
    for (let param of query.entries()){
        attributes[param[0]] = +param[1]
    }
    this.setState({attributes: attributes})
  }
  savedCancelledHandler = () => {
    this.props.history.goBack();
  };
  savedContinueHandler = () => {
    this.props.history.replace("/saved/saveData");
  };
  render() {
    return (
      <KindredSummary
        attributes={this.state.attributes}
        savedCancelled={this.savedCancelledHandler}
        savedContinue={this.savedContinueHandler}
      />
    );
  }
}

export default Saved;
