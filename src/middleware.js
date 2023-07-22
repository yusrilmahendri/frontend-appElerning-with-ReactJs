import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';
import Login from './components/login';
import listVideoAdmin from './components/listVideoAdmin';

const Middleware = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/list-videoAdmin" component={listVideoAdmin} />
      </Switch>
    </Router>
  );
};

export default Middleware;
