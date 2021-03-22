import React from 'react';
import { Router } from 'react-router-dom';
import Routes from './routes';
import history from './utils/history';
import Loading from './components/loading';

function App() {
  return (
    <Router history={history}>
      <Routes />
      <Loading />
    </Router>
  );
}

export default App;
