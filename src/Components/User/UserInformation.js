import React, { useContext } from 'react';
import { ListContext } from 'Routers/Router';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LayerInfo = styled.section`
    width: 50%;
    height: 70%;
    border: 3px solid #FACAC0;
    border-radius: 10px;
    position: relative;
`;

const InfoTitle = styled.h1`
    font-size: 2.4rem;
    padding: 30px 0 20px 30px;
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
    bottom: 5%;
    left: ${(props) => props.left};
    font-size: 1.5rem;
    width: 100px;
    height: 40px;
    text-align: center;
    background-color: #FEDCCC;
    border-radius: 5px;
`;

const UserInformaiton = () => {
    const {userInfo} = useContext(ListContext);

    return (
        <Container>
            <LayerInfo>
                <InfoTitle> 내 정보 수정 </InfoTitle>
                <UserForm>
                    <Label> 이름 </Label>
                    <UserInput type="text" placeholder={userInfo.displayName} />
                    <Label> 이메일 주소 </Label>
                    <UserInput type="email" value={userInfo.email} disabled/>
                    <UserBtn type="submit" left="17%"> 완료 </UserBtn>
                    <UserBtn type="button" left="65%"> 회원탈퇴 </UserBtn>
                </UserForm>
            </LayerInfo>
        </Container>
    )
};

export default UserInformaiton;