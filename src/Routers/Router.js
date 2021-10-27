import React, { createContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { getUserData, getEmailLists } from "services/store";
import Login from "Components/Login/Login";
import Sign from "Components/Sign/Sign";
import Location from "Components/Location/Location";

export const ListContext = createContext("");

export default () => {
  // 이메일을 중복 확인해야 하기 때문에 useState로 값을 관리하기 위해 사용
  const [emailData, setEmailData] = useState();
  // 사용자 프로필에 대한 정보 저장을 위해 useState 사용
  const [userInfo, setUserInfo] = useState(); 

  // 컴포넌트가 렌더링이 됐을 때, 한번만 데이터를 받아오면 되기 때문에 useEffect를 사용
  useEffect(() => {
    getEmailLists().then((data) => setEmailData(data));
    getUserData().then((data) => setUserInfo(data));
  }, []);

  const store = {
    emailData,
    setUserInfo,
    userInfo,
  };
  
 let isAuthorized = sessionStorage.getItem("isAuthorized")

  return (
    <Router>
      {!isAuthorized ? <Redirect to ="/" /> : <Redirect to="/home" />}
      <Switch>
        <ListContext.Provider value={store}>
          <Route path="/" exact component={Login} />
          <Route path="/sign" exact component={Sign} />
          <Route
            path="/home"
            exact
            component={Location}
          />
        </ListContext.Provider>
      </Switch>
    </Router>
  );
};
