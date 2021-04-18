import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import KindredBuilder from "./containers/KindredBuilder/KindredBuilder";
import Layout from "./hoc/Layouts/Layout";
// import Saved from "./containers/Saved/Saved";
// import Saves from "./containers/Saves/Saves";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const Saves = React.lazy(() => {
  return import("./containers/Saves/Saves");
});
const Saved = React.lazy(() => {
  return import("./containers/Saved/Saved");
});
const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const App = props => {
  const {onTryAutoSignup} = props;
  useEffect( () => {
  onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" render={props=> <Auth {...props} />} />
      <Route path="/" exact component={KindredBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/saved" render={props=> <Saved {...props} />} />
        <Route path="/saves" component={props=> <Saves {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={props=> <Auth {...props} />} />
        <Route path="/" exact component={KindredBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </>
  );
};
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
