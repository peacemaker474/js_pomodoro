import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Routes/Login';
import Sign from '../Routes/Sign';

export default () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/sign" exact component={Sign}/>
            </Switch>
        </Router>
    );
};