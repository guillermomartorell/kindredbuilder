import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from './hoc/asyncComponent/asyncComponent'

import KindredBuilder from "./containers/KindredBuilder/KindredBuilder";
import Layout from "./hoc/Layouts/Layout";
// import Saved from "./containers/Saved/Saved";
// import Saves from "./containers/Saves/Saves";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const asyncSaves = asyncComponent(()=> { 
  return import ("./containers/Saves/Saves")
})
const asyncSaved = asyncComponent(()=> { 
  return import ("./containers/Saved/Saved")
})
const asyncAuth = asyncComponent(()=> { 
  return import ("./containers/Auth/Auth")
})

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={KindredBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/saved" component={asyncSaved} />
          <Route path="/saves" component={asyncSaves} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={KindredBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
