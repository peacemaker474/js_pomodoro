import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { auth, updatePassword, signInWithEmailAndPassword } from 'services/firebase';
import { regex } from 'services/store';
import { isEmpty } from 'lodash';
import { ListContext } from 'Routers/Router';

const LayerInfo = styled.section`
    width: 70%;
    height: 100%;
    // border: 3px solid #FACAC0;
    border-radius: 10px;
    position: relative;
`;

const InfoTitle = styled.h1`
    font-size: 2.4rem;
    padding: 30px 0 20px 60px;
`;

const UserForm = styled.form`
    width: 90%;
    height: 80%;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
`;

const UserInput = styled.input`
    all: unset;
    width: 90%;
    height: 8%;
    padding-left: 10px;
    font-size: 1.4rem;
    border: 2px solid #F3C9DD;
`;

const UserBtn = styled.button`
    all: unset;
    position: absolute;
    bottom: 50%;
    left: 7%;
    font-size: 1.5rem;
    width: 100px;
    height: 40px;
    text-align: center;
    background-color: #FEDCCC;
    border-radius: 5px;
`;

const ChangePwd = () => {
    const { userInfo } = useContext(ListContext);
    const currentPwd = useRef(null);
    const changePwd = useRef(null);
    const rePwd = useRef(null);

    const handleChangePwd = evt => {
        evt.preventDefault();
        const user = auth.currentUser;
        signInWithEmailAndPassword(auth, userInfo.email, currentPwd.current.value)
        .then(() => {
            if (isEmpty(changePwd.current.value) || !regex.password.test(changePwd.current.value)) {
                alert("8자리 이상의 영문, 숫자, 특수문자가 반드시 1개라도 포함되어야 합니다.");
                changePwd.current.value = "";
                changePwd.current.focus();
                return ;
            }
            if (changePwd.current.value !== rePwd.current.value) {
                alert("비밀번호가 서로 일치하지 않습니다. 다시 입력해주세요.");
                rePwd.current.value = "";
                rePwd.current.focus();
                return ;
            } else {
                updatePassword(user, changePwd.current.value)
                .then(() => console.log("성공"))
                .catch(() => console.log("실패"))
            }
        })
        .catch(() => {
            console.log("실패");
        })
    }

    return (
        <LayerInfo>
            <InfoTitle> 비밀번호 변경하기 </InfoTitle>
            <UserForm onSubmit={handleChangePwd}>
                <UserInput type="password" placeholder="현재 비밀번호" ref={currentPwd} />
                <UserInput type="password" placeholder="새 비밀번호" ref={changePwd} />
                <UserInput type="password" placeholder="새 비밀번호 확인" ref={rePwd} />
                <UserBtn type="submit"> 확인 </UserBtn>
            </UserForm>
        </LayerInfo>
    )
};

export default ChangePwd;
