import React, {useRef, useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, setDoc, getFirestore, doc } from 'services/firebase';
import {ListContext} from 'Routers/Router';
import styled from 'styled-components';
import isEmpty from 'lodash';
import { regex } from 'services/store';
import mainImage from 'assets/mainImage.jpg';

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
    const check_email = useRef(null);
    const check_name = useRef(null);
    const check_password = useRef(null);
    const check_rePwd = useRef(null);
    const history = useHistory();
    const {emailData} = useContext(ListContext);

    // 이메일 중복 체크를 위해 사용할 함수
    const checkOverlapEmail = () => {
        const findEmail = emailData.filter(email => email === check_email.current.value);
        return findEmail;
    }
    
    const onSubmit = async (evt) => {
        evt.preventDefault();
        /* 
            이름, 이메일, 비밀번호 확인하는 영역으로 모두 통과될 시, useState의 값을 변경한다.
            전체적인 정규표현식은 전역 변수로 빼서 사용한다.
        */
        if (isEmpty(check_name.current.value) && !regex.name.test(check_name.current.value)) {
            alert("이름은 2~5글자만 입력해주세요.");
            check_name.current.value = "";
            check_name.current.focus();
        }
        if (isEmpty(check_email.current.value) && !regex.email.test(check_email.current.value)) {
            alert("이메일 형식에 맞게 다시 입력해주세요.");
            check_email.current.value = "";
            check_email.current.focus();
        }
        if (isEmpty(check_password.current.value) && !regex.password.test(check_password.current.value)) {
            alert("8자리 이상의 영문, 숫자, 특수문자가 반드시 1개라도 포함되어야 합니다.");
            check_password.current.value = "";
            check_password.current.focus();
        }
        if (check_password.current.value !== check_rePwd.current.value) {
            alert("비밀번호가 서로 일치하지 않습니다. 다시 입력해주세요.");
            check_rePwd.current.value = "";
            check_rePwd.current.focus();
        }
        if (checkOverlapEmail().length === 1) {
            alert("이메일이 이미 있으니, 다시 입력해주세요.");
            check_email.current.value = "";
            check_email.current.focus();
        } else {
            setVaildEmail(true);
            setVaildName(true);
            setVaildPwd(true);
        }
        
        if (vaildName && vaildEmail && vaildPwd && (check_password.current.value === check_rePwd.current.value)){
            try {
                const db = getFirestore();
                // 데이터베이스에 추가하는 부분 (이름과 이메일)
                await setDoc(doc(db, "user", check_name.current.value), {
                    name : check_name.current.value,
                    email : check_email.current.value,
                });

                // 회원가입 하는 부분
                await createUserWithEmailAndPassword(auth, check_email.current.value, check_password.current.value)
                .then((userCredential) => {
                    history.push("/");
                });
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
                        <SignInput type="text" placeholder="이름을 입력해주세요." ref={check_name}/>
                        <Label>이메일</Label>
                        <SignInput type="email" placeholder="이메일을 입력해주세요." ref={check_email}/>
                        <Label>비밀번호</Label>
                        <SignInput type="password" placeholder="비밀번호를 입력해주세요." ref={check_password}/>
                        <Label>비밀번호 재입력</Label>
                        <SignInput type="password" placeholder="비밀번호를 다시 입력해주세요." ref={check_rePwd}/>
                        <SignBtn type="submit">회원가입</SignBtn>
                    </SignForm>
                </SignWrapper>
            </Container>
        </BackImage>
    )
};

export default Sign;
