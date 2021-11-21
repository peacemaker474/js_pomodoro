import React, {useRef} from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { regex } from 'services/store';
import {auth, sendPasswordResetEmail} from 'services/firebase';

const Container = styled.section`
    width: 500px;
    height: 300px;
    position: absolute;
    top: 35%;
    right: 7.5%;
    translate: transformY(-35%);
    background-color: white;
    border-radius: 5px;
`;

const FindTitle = styled.h2`
    font-size: 2.7rem;
    padding: 40px 0 0 25px;
`;

const FindForm = styled.form`
    width: 90%;
    height: 65%;
    margin: 0 auto;
    display:flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
`;

const FindLabel = styled.label`
    font-size: 1.5rem;
`;

const FindInput = styled.input`
    height: 40px;
    padding-left: 10px;
    box-sizing: border-box;
`;

const FindButton = styled.button`
    all: unset;
    width: 30%;
    height: 40px;
    text-align: center;
    font-size: 1.5rem;
    align-self: center;
    border-radius: 10px;
    line-height: 45px;
    background-color: #FFA931;
`;

const CloseButton = styled.button`
    all: unset;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 5%;
    right: 2%;
    font-size: 1.5rem;
    cursor: pointer;
`;

const FindModal = ({setFindPwdModal}) => {
    const email = useRef(null);

    const handleCloseModal = evt => {
        evt.preventDefault();
        setFindPwdModal(false);
    }

    const onSubmit = evt => {
        evt.preventDefault();

        if (isEmpty(email.current.value) && !regex.email.test(email.current.value)){
            alert("이메일 주소를 올바르게 입력하세요");
            email.current.value = "";
            email.current.focus();
            return ;
        }

        sendPasswordResetEmail(auth, email.current.value)
        .then(() => {
            alert("해당 이메일로 비밀번호 재설정 메일을 보냈습니다. 이메일을 확인해주세요.");
            setFindPwdModal(false);
        })
        .catch(err => {
            switch (err.code) {
                case "auth/user-not-found":
                    email.current.value = "";
                    email.current.focus();
                    alert("해당 이메일은 존재하지 않습니다.");
                    break;
                default:
                    break;
            }
        })
    }
    return (
        <>
            <Container>
                <FindTitle>비밀번호 찾기</FindTitle>
                <FindForm onSubmit={onSubmit}>
                    <FindLabel>비밀번호를 찾고자 하는 이메일을 입력해 주세요.</FindLabel>
                    <FindInput type="email" placeholder="이메일을 입력해주세요." ref={email}/>
                    <FindButton type="submit"> 비밀번호 찾기 </FindButton>
                </FindForm>
                <CloseButton onClick={handleCloseModal}>❌</CloseButton>
            </Container>
        </>
    )
}

export default FindModal;
