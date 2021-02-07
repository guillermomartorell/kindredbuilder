import Layout from "./hoc/Layouts/Layout";
import React from 'react'
import KindredBuilder from "./containers/KindredBuilder/KindredBuilder";


function App() {
  return (
    <div>
      <Layout>
        <KindredBuilder/>
      </Layout>
    </div>
  );
}

export default App;
