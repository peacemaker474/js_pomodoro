import React, {createContext, useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import getData from './store';
import Login from '../Routes/Login';
import Sign from '../Routes/Sign';

export const ListContext = createContext("");

export default () => {
    const [emailData, setEmailData] = useState({});

    useEffect(() => {
        getData().then((data) => setEmailData(data));
    }, []);

    const store = {
        emailData,
    }
    
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/sign" exact >
                    <ListContext.Provider value={store}>
                        <Sign />
                    </ListContext.Provider>
                </Route>
            </Switch>
        </Router>
    );
};