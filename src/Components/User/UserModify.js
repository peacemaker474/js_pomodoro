import React, { useContext } from 'react';
import { ListContext } from 'Routers/Router';
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
    gap: 15px;
`;

const UserInput = styled.input`
    all: unset;
    width: 90%;
    height: 8%;
    padding-left: 10px;
    font-size: 1.4rem;
    border: 2px solid #F3C9DD;
`;

const Label = styled.label`
    width: 90%;
    font-size: 1.7rem;
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

const UserModify = () => {
    const {userInfo} = useContext(ListContext);

    return (
        <LayerInfo>
            <InfoTitle> 내 정보 수정 </InfoTitle>
            <UserForm>
                <Label> 이름 </Label>
                <UserInput type="text" placeholder={userInfo.displayName} />
                <Label> 이메일 주소 </Label>
                <UserInput type="email" value={userInfo.email} disabled />
                <UserBtn type="submit"> 완료 </UserBtn>
            </UserForm>
        </LayerInfo>
    )
};

export default UserModify;