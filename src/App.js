import Layout from "./hoc/Layouts/Layout";
import React from 'react'
import KindredBuilder from "./containers/KindredBuilder/KindredBuilder";
import Saved from './containers/Saved/Saved'

function App() {
  return (
    <div>
      <Layout>
        <KindredBuilder/>
        <Saved/>
      </Layout>
    </div>
  );
}

export default App;
