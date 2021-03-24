import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthHOC from './hoc/auth';


import Home from './screens/home'
import Login from './screens/auth/login'
import Register from './screens/auth/register'
import UploadVideo from './screens/uploadvideo'
import VideoDetails from './screens/videodetails'
import Subscriptions from './screens/subscriptions'

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={AuthHOC(Home, null)} />
          <Route path="/login" component={AuthHOC(Login, false)} />
          <Route path="/register" component={AuthHOC(Register, false)} />
          <Route path="/video/upload" component={AuthHOC(UploadVideo, true)} />
          <Route path="/video/:id" component={AuthHOC(VideoDetails, null)} />
          <Route path="/subscriptions" component={AuthHOC(Subscriptions, null)} />
          <Route path="**" component={Home} />
        </Switch>
      </Router>
    );
  }
};