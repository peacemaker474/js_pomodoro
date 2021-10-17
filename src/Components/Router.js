import React, {createContext, useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import getData from './store';
import Login from '../Routes/Login';
import Sign from '../Routes/Sign';

export const ListContext = createContext("");

export default () => {
    // 이메일을 중복 확인해야 하기 때문에 useState로 값을 관리하기 위해 사용
    const [emailData, setEmailData] = useState({});

    // 컴포넌트가 렌더링이 됐을 때, 한번만 데이터를 받아오면 되기 때문에 useEffect를 사용
    useEffect(() => {
        getData().then((data) => setEmailData(data));
    }, []);

    const store = {
        emailData,
    };

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