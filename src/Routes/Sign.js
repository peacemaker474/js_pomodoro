import React, {useContext, useRef, useState} from 'react';
import styled from 'styled-components';
import mainImage from '../assets/mainImage.jpg';
import { ListContext } from '../Components/Router';

const BackImage = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    z-index: 0;
    background-image: url(${mainImage});
    background-size: 100% 100%;
    background-repeat: no-repeat;
`;

const Container = styled.section`
    width: 50rem;
    height: 60rem;
    position: absolute;
    right: 2%;
    top:5%;
    border-radius: 10px;
    z-index: 1;
    color: white;
`;

const SignWrapper = styled.div`
    width: 95%;
    height: 100%;
    margin: 0 auto;
`;

const SignTitle = styled.h1`
    font-size: 3.2rem;
    width: 100%;
    height: 10%;
    text-align: center;
    line-height: 60px;
    padding-top: 10px;
    letter-spacing: 5px;
`;

const SignForm = styled.form`
    width: 90%;
    height: 85%;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

const Label = styled.label`
    width: 80%;
    display: block;
    font-size: 1.7rem;
    align-self: flex-start;
    margin: 0 auto;
    &:first-child{
        margin-top: 10px;
    }
`;

const SignInput = styled.input`
    all:unset;
    width: 80%;
    height: 35px;
    border: 1px solid rgba(255, 255, 255, .5);
    margin-bottom: 10px;
    border-radius: 5px;
    padding-left: 20px;
    box-sizing: border-box;
    ::placeholder{
        color: white;
    }
    font-size: 1.2rem;
`;

const SignBtn = styled.button`
    all:unset;
    width: 50%;
    height: 35px;
    text-align: center;
    background-color: #74b9ff;
    border-radius: 5px;
    color: white;
    font-size: 1.4rem;
`;

const Sign = () => {
    const {userData, setUserData} = useContext(ListContext);
    const [vaildEmail, setVaildEmail] = useState(false);
    const [vaildName, setVaildName] = useState(false);
    const [vaildPwd, setVaildPwd] = useState(false);
    const emailCheck = useRef(null);
    const nameCheck = useRef(null);
    const pwdCheck = useRef(null);
    const rePwdCheck = useRef(null);
    
    const onSubmit = evt => {
        evt.preventDefault();
        const nameRegex = /^[가-힣]{2,5}$/; // 이름 2~5글자로 제한하는 정규표현식
        const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 확인하는 정규표현식
        const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/; // 비밀번호 영문, 숫자, 특수문자, 8자리 이상 정규표현식
        
        nameRegex.test(nameCheck.current.value) ? setVaildName(true) : nameCheck.current.focus();
        emailRegex.test(emailCheck.current.value) ? setVaildEmail(true) : emailCheck.current.focus();
        pwdRegex.test(pwdCheck.current.value) ? setVaildPwd(true) : pwdCheck.current.focus();
        if (pwdCheck.current.value !== rePwdCheck.current.value) rePwdCheck.current.focus();
        if (vaildName && vaildEmail && vaildPwd && (pwdCheck.current.value === rePwdCheck.current.value)){
            let copy = {...userData};
            copy = {
                name: nameCheck.current.value,
                email: emailCheck.current.value,
                password: pwdCheck.current.value
            };
            setUserData(copy);
            console.log("확인"); // 데이터를 서버로 전송하면 됩니다.
        }
    }

    return (
        <BackImage>
            <Container>
                <SignWrapper>
                    <SignTitle>회원가입</SignTitle>
                    <SignForm onSubmit={onSubmit}>
                        <Label>이름</Label>
                        <SignInput type="text" placeholder="이름을 입력해주세요." ref={nameCheck}/>
                        <Label>이메일</Label>
                        <SignInput type="email" placeholder="이메일을 입력해주세요." ref={emailCheck}/>
                        <Label>비밀번호</Label>
                        <SignInput type="password" placeholder="비밀번호를 입력해주세요." ref={pwdCheck}/>
                        <Label>비밀번호 재입력</Label>
                        <SignInput type="password" placeholder="비밀번호를 다시 입력해주세요." ref={rePwdCheck}/>
                        <SignBtn>회원가입</SignBtn>
                    </SignForm>
                </SignWrapper>
            </Container>
        </BackImage>
    )
};

export default Sign;