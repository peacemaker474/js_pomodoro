import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Routes/Login';
import Join from '../Routes/Join';

export default () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/join" exact component={Join} />
        </Switch>
    </Router>
);