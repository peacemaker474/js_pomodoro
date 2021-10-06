import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Container = styled.main`
    width: 500px;
    height: 500px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid black;
`;

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;
const LoginTitle = styled.h1`
    width: 100%;
    height: 30%;
    font-size: 2.3rem;
    line-height: 150px;
    text-align: center;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40%;
    gap: 20px;
`;
const LoginId = styled.input``;
const Label = styled.label`
    flex-direction: row;
    font-size: 1.5rem;
`;
const LoginPwd = styled.input``;
const LoginBtn = styled.button``;
const SubLists = styled.ul`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
`;
const List = styled.li``;
const SLink = styled(Link)`
    text-decoration: none;
    color: rgb(10, 10, 10);
    font-size: 1.3rem;
`;

const Login = () => (
    <Container>
        <LoginWrapper>
            <LoginTitle>로그인</LoginTitle>
            <LoginForm>
                <Label>아이디</Label>
                <LoginId type="text" placeholder="아이디를 입력하세요."/>
                <Label>비밀번호</Label>
                <LoginPwd type="password"/>
                <LoginBtn>로그인</LoginBtn>
            </LoginForm>
            <SubLists>
                <List>
                    <SLink to="/"> 아이디 찾기 </SLink>
                </List>
                <List>
                    <SLink to="/"> 비밀번호 찾기 </SLink>
                </List>
                <List>
                    <SLink to="/sign"> 회원가입 </SLink>
                </List>
            </SubLists>
        </LoginWrapper>
    </Container>  
);

export default Login;