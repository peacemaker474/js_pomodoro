import React, {useState, createContext} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../Routes/Login';
import Sign from '../Routes/Sign';

export const ListContext = createContext("");

export default () => {
    const [userData, setUserData] = useState({
        name: "John",
        email: "",
        password: "",
    });
    const [signCheck, setSignCheck] = useState(false);
    
    const store = {
        userData,
        setUserData,
        signCheck,
        setSignCheck
    };

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/sign" exact>
                    <ListContext.Provider value={store}>
                        <Sign />
                    </ListContext.Provider>
                </Route>
            </Switch>
        </Router>
    );
};