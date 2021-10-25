import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "services/firebase";
import { ListContext } from "Routers/Router";
import FindModal from "./FindPwdModal";
import mainImage from "assets/mainImage.jpg";
import { isEmpty } from "lodash";
import { regex } from "services/store";

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
`;

const RightWrapper = styled.div`
  width: 50%;
  height: 100%;
  background-image: url(${mainImage});
  background-size: cover;
  background-repeat: no-repeat;
`;
const MainTitle = styled.h1`
  width: 100%;
  height: 20%;
  font-size: 6.4rem;
  line-height: 150px;
  text-align: center;
  color: #ffa931;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  gap: 20px;
`;

const LoginInput = styled.input`
  width: 55%;
  height: 50px;
  border-radius: 5px;
  border: 1px solid black;
  padding-left: 15px;
  box-sizing: border-box;
`;

const Label = styled.label`
  width: 55%;
  flex-direction: row;
  font-size: 1.5rem;
`;

const LoginBtn = styled.button`
  width: 55%;
  height: 50px;
  border-radius: 5px;
  border: none;
  background-color: #ffa931;
  font-size: 1.5rem;
`;

const SubLists = styled.ul`
  width: 55%;
  height: 10%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 15px;
  border-top: 1px solid rgba(128, 128, 128, 0.5);
`;

const List = styled.li``;

const SignLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.color};
  font-size: 1.3rem;
  &:not(:first-child) {
    margin-left: 5px;
  }
`;

const FindPwd = styled.button`
  all: unset;
  width: 55%;
  text-decoration: none;
  text-align: right;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${(props) => props.color};
`;

const Login = () => {
  const [findPwdModal, setFindPwdModal] = useState(false);
  const [vaildLogin, setVaildLogin] = useState(false);
  const [vaildPassword, setVaildPassword] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const { emailData, userInfo, setUserInfo } = useContext(ListContext);
  const history = useHistory();

  // 이메일이 있는 지 없는지 확인하는 함수
  const checkEmail = () => {
    const findEmail = emailData.filter((item) => item === email.current.value);
    return findEmail;
  };
  // 이메일을 기준으로 유저에 대한 정보를 저장하는 함수
  const getUserInfo = () => {
    userInfo.forEach((info) => {
      if (info.email === email.current.value) {
        setUserInfo(info);
        console.log(info);
        return;
      }
    });
  };

  const handleFindPwdModal = (evt) => {
    evt.preventDefault();
    setFindPwdModal(!findPwdModal);
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    /*
        이메일과 비밀번호 형식 확인하고,
        이메일이 존재하는지 확인
    */
    if (
      isEmpty(email.current.value) &&
      !regex.email.test(email.current.value)
    ) {
      email.current.value = "";
      email.current.focus();
      alert("올바른 이메일 형식을 입력하지 않았습니다.");
      return;
    }
    if (checkEmail().length !== 1) {
      email.current.value = "";
      email.current.focus();
      alert("해당 이메일은 존재하지 않습니다.");
      return;
    }
    if (
      isEmpty(password.current.value) &&
      regex.password.test(password.current.value)
    ) {
      password.current.value = "";
      password.current.focus();
      alert("비밀번호는 특수문자를 포함한 8자리 이상입니다.");
      return;
    } else {
      setVaildLogin(true);
      setVaildPassword(true);
    }

    if (vaildLogin && vaildPassword) {
      try {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            console.log(userCredential);
            getUserInfo();
            alert("로그인을 하였습니다.");
            history.push("/home");
          })
          .catch((err) => {
            console.log(err);
            password.current.value = "";
            password.current.focus();
            alert("비밀번호가 틀렸습니다.");
            setVaildPassword(false);
          });
      } catch (err) {
        console.log(err);
        alert("서버와의 통신이 올바르지 않습니다.");
      }
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={onSubmit}>
        <MainTitle>My Food Map</MainTitle>
        <Label>이메일</Label>
        <LoginInput
          type="text"
          placeholder="이메일을 입력하세요."
          ref={email}
        />
        <Label>비밀번호</Label>
        <LoginInput
          type="password"
          placeholder="비밀번호를 입력하세요"
          ref={password}
        />
        <FindPwd
          type="button"
          color="rgb(10,10,10)"
          onClick={handleFindPwdModal}
        >
          비밀번호를 잃어버리셨나요?
        </FindPwd>
        <LoginBtn>로그인</LoginBtn>
        <SubLists>
          <List>
            <SignLink to="/sign" color="rgb(10, 10, 10)">
              계정이 없으신가요?
            </SignLink>
            <SignLink to="/sign" color="#FFA931">
              회원가입
            </SignLink>
          </List>
        </SubLists>
      </LoginForm>
      <RightWrapper />
      {findPwdModal && <FindModal setFindPwdModal={setFindPwdModal} />}
    </Container>
  );
};

export default Login;
