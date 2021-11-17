import React, { createContext, useState, useEffect } from "react";
import { 
  BrowserRouter as Router, 
  Route, 
  Switch, 
  Redirect 
} from "react-router-dom";
import {getUserData, getEmailLists, isAuthorized} from "services/store";
import Login from "Components/Login/Login";
import Sign from "Components/Sign/Sign";
import Location from "Components/Location/Location";
import UserRouter from "./UserRouter";

export const ListContext = createContext("");

export default () => {
  // 이메일을 중복 확인해야 하기 때문에 useState로 값을 관리하기 위해 사용
  const [emailData, setEmailData] = useState();
  // 사용자 프로필에 대한 정보 저장을 위해 useState 사용
  const [userInfo, setUserInfo] = useState();
  // 회원가입 성공 유무를 확인
  const [checkSign, setCheckSign] = useState(false);
  // 계정 삭제 유무를 확인
  const [checkDelete, setCheckDelete] = useState(false);

  // 컴포넌트가 렌더링이 됐을 때, 한번만 데이터를 받아오면 되기 때문에 useEffect를 사용
  useEffect(() => {
    if (isAuthorized.getAuthorized() === "true") {
      setUserInfo(JSON.parse(isAuthorized.getProfile()));
    } else {
      getUserData().then(data => setUserInfo(data));
    }
  }, []);

  useEffect(() => {
    getEmailLists().then(data => setEmailData(data));
  }, [checkSign, checkDelete]);

  const store = {
    emailData,
    setUserInfo,
    userInfo,
    setCheckSign,
    setCheckDelete
  };

  return (
    <Router>
      {isAuthorized.getAuthorized() === "true" ? <Redirect to="/home" /> : <Redirect to="/" />}
      <Switch>
        <ListContext.Provider value={store}>
          <Route path="/" exact component={Login } />
          <Route path="/sign" exact component={Sign} />
          <Route path="/home" exact component={Location} />
          <Route path="/user/:id" component={UserRouter} />
        </ListContext.Provider>
      </Switch>
    </Router>
  );
};
