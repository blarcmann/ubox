import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import Home from './screens/home';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="**" component={Home} />
        </Switch>
      </Router>
    );
  }
};