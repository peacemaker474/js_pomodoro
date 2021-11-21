import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { auth, updatePassword, signInWithEmailAndPassword } from 'services/firebase';
import { isAuthorized, regex } from 'services/store';
import { ListContext } from 'Routers/Router';
import { useHistory } from 'react-router';

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
    const oldPassword = useRef(null);
    const newPassword = useRef(null);
    const confirmPassword = useRef(null);
    const history = useHistory();

    const handleChangePwd = evt => {
        evt.preventDefault();
        const user = auth.currentUser;
        signInWithEmailAndPassword(auth, userInfo.email, oldPassword.current.value)
        .then(() => {
            if (!regex.password.test(newPassword.current.value)){
                newPassword.current.value = "";
                newPassword.current.focus();
                alert("8자리 이상의 영문, 숫자, 특수문자가 반드시 1개라도 포함되어야 합니다.");
                return ;
            }
            if (newPassword.current.value !== confirmPassword.current.value) {
                confirmPassword.current.value = "";
                confirmPassword.current.focus();
                alert("비밀번호가 서로 일치하지 않습니다. 다시 입력해주세요.");
                return ;
            } else {
                updatePassword(user, newPassword.current.value)
                .then(() => {
                    isAuthorized.setSessionStorage("isAuthorized", false);
                    isAuthorized.removeProfile();
                    history.push("/");
                })
                .catch((err) => console.log(err))
            }
        })
        .catch((err) => {
            switch (err.code) {
                case "auth/internal-error":
                    oldPassword.current.value = "";
                    oldPassword.current.focus();
                    alert("8자리 이상의 영문, 숫자, 특수문자가 반드시 1개라도 포함되어야 합니다.");
                    break;
                case "auth/wrong-password":
                    oldPassword.current.value = "";
                    oldPassword.current.focus();
                    alert("현재 비밀번호와 맞지 않습니다.");
                    break;
                default:
                    console.log(err);
                    break;
            }
        })
    }

    return (
        <LayerInfo>
            <InfoTitle> 비밀번호 변경하기 </InfoTitle>
            <UserForm onSubmit={handleChangePwd}>
                <UserInput type="password" placeholder="현재 비밀번호" ref={oldPassword} />
                <UserInput type="password" placeholder="새 비밀번호" ref={newPassword} />
                <UserInput type="password" placeholder="새 비밀번호 확인" ref={confirmPassword} />
                <UserBtn type="submit"> 확인 </UserBtn>
            </UserForm>
        </LayerInfo>
    )
};

export default ChangePwd;
