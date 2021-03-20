import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import Home from './screens/home';
import Login from './screens/auth/login';
import Register from './screens/auth/register';

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="**" component={Home} />
        </Switch>
      </Router>
    );
  }
};