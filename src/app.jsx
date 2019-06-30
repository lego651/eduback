import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Home from 'page/home/index.jsx';
import Layout from 'component/layout/index.jsx'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/product" component={Home}/>
            <Route exact path="/product-category" component={Home}/>
          </Switch>
        </Layout>
      </Router>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('app')
);
