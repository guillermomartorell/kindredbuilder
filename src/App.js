import Layout from "./hoc/Layouts/Layout";
import React from "react";
import KindredBuilder from "./containers/KindredBuilder/KindredBuilder";
import Saved from "./containers/Saved/Saved";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/saved" component={Saved} />
          <Route path="/" exact component={KindredBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
