import React, { Component } from "react";
import { connect } from "react-redux";

import Overview from "../../components/Overview/Overview";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-saved";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Saves extends Component {
  state = {
    saves: [],
    loading: true,
  };

  componentDidMount() {
    this.props.onFetchSaves(this.props.token);
  }

  render() {
    let saves = <Spinner />;
    if (!this.props.loading) {
      saves = this.props.saves.map(save => (
        <Overview key={save.id} attributes={save.attributes} />
      ));
    }
    return <div>
      {saves}
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    saves: state.save.saves,
    loading: state.save.loading,
    saved: state.save.saved,
    token: state.auth.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchSaves: (token) => dispatch(actions.fetchSaves(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Saves, axios));
