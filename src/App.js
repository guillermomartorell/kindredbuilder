import Layout from "./components/Layouts/Layout";
import React from 'react'
import KindredBuilder from "./containers/KindredBuilder";


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
