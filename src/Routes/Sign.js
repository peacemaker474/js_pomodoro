import React, {useRef, useState} from 'react';
import { auth, createUserWithEmailAndPassword } from '../services/firebase';
import styled from 'styled-components';
import isEmpty from 'lodash';
import mainImage from '../assets/mainImage.jpg';

const nameRegex = /^[가-힣]{2,5}$/; // 이름 2~5글자로 제한하는 정규표현식
const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 확인하는 정규표현식
const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/; // 비밀번호 영문, 숫자, 특수문자, 8자리 이상 정규표현식

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
    const [vaildEmail, setVaildEmail] = useState(false);
    const [vaildName, setVaildName] = useState(false);
    const [vaildPwd, setVaildPwd] = useState(false);
    const emailCheck = useRef(null);
    const nameCheck = useRef(null);
    const pwdCheck = useRef(null);
    const rePwdCheck = useRef(null);
    
    const onSubmit = async (evt) => {
        evt.preventDefault();
        /* 
            이름, 이메일, 비밀번호 확인하는 영역으로 모두 통과될 시, useState의 값을 변경한다.
            전체적인 정규표현식은 전역 변수로 빼서 사용한다.
        */
        if (isEmpty(nameCheck.current.value) && !nameRegex.test(nameCheck.current.value)) {
            alert("이름은 2~5글자만 입력해주세요.");
            nameCheck.current.value = "";
            nameCheck.current.focus();
        }
        if (isEmpty(emailCheck.current.value) && !emailRegex.test(emailCheck.current.value)) {
            alert("이메일 형식에 맞게 다시 입력해주세요.");
            emailCheck.current.value = "";
            emailCheck.current.focus();
        }
        if (isEmpty(pwdCheck.current.value) && !pwdRegex.test(pwdCheck.current.value)) {
            alert("8자리 이상의 영문, 숫자, 특수문자가 반드시 1개라도 포함되어야 합니다.");
            pwdCheck.current.value = "";
            pwdCheck.current.focus();
        }
        if (pwdCheck.current.value !== rePwdCheck.current.value) {
            alert("비밀번호가 서로 일치하지 않습니다. 다시 입력해주세요.");
            rePwdCheck.current.value = "";
            rePwdCheck.current.focus();
        } else {
            setVaildEmail(true);
            setVaildName(true);
            setVaildPwd(true);
        }
        
        if (vaildName && vaildEmail && vaildPwd && (pwdCheck.current.value === rePwdCheck.current.value)){
            try {
                await createUserWithEmailAndPassword(auth, emailCheck.current.value, pwdCheck.current.value)
                .then((userCredential) => {
                    console.log(userCredential);
                })
            } catch (error) {
                console.log(error);
            }
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
                        <SignBtn type="submit">회원가입</SignBtn>
                    </SignForm>
                </SignWrapper>
            </Container>
        </BackImage>
    )
};

export default Sign;