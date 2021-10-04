import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Container = styled.div`
    width: 500px;
    height: 500px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid black;
`;

const LoginBox = styled.div`
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40%;
    gap: 20px;
`;
const Id = styled.input``;
const Label = styled.label`
    flex-direction: row;
    font-size: 1.5rem;
`;
const PassWord = styled.input``;
const LoginBtn = styled.button``;
const LoginUl = styled.ul``;
const LoginMenu = styled.li``;

const Login = () => (
    <Container>
        <LoginBox>
            <LoginTitle>로그인</LoginTitle>
            <Form>
                <Label>아이디</Label>
                <Id type="text" placeholder="아이디를 입력하세요."/>
                <Label>비밀번호</Label>
                <PassWord type="password"/>
                <LoginBtn>로그인</LoginBtn>
            </Form>
            <LoginUl>
                <LoginMenu>
                    <Link to="/join"> 회원가입 </Link>
                </LoginMenu>
            </LoginUl>
        </LoginBox>
    </Container>  
);

export default Login;