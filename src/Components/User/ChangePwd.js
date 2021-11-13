import React from 'react';
import styled from 'styled-components';

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

    return (
        <LayerInfo>
            <InfoTitle> 비밀번호 변경하기 </InfoTitle>
            <UserForm>
                <UserInput type="password" placeholder="현재 비밀번호" />
                <UserInput type="password" placeholder="새 비밀번호" />
                <UserInput type="password" placeholder="새 비밀번호 확인" />
                <UserBtn type="submit"> 확인 </UserBtn>
            </UserForm>
        </LayerInfo>
    )
};

export default ChangePwd;
