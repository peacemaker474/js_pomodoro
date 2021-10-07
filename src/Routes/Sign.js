import React, {useContext} from 'react';
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
    const {userData, setUserData, signCheck, setSignCheck} = useContext(ListContext);
    
    const onSubmit = async (evt) => {
        evt.preventDefault();
        
        try {
            
        } catch (e) {
            console.log(e);
        } finally {

        }
    }

    return (
        <BackImage>
            <Container>
                <SignWrapper>
                    <SignTitle>회원가입</SignTitle>
                    <SignForm onSubmit={onSubmit}>
                        <Label>이름</Label>
                        <SignInput type="text" placeholder="이름을 입력해주세요." />
                        <Label>이메일</Label>
                        <SignInput type="email" placeholder="이메일을 입력해주세요." />
                        <Label>비밀번호</Label>
                        <SignInput type="password" placeholder="비밀번호를 입력해주세요." />
                        <Label>비밀번호 재입력</Label>
                        <SignInput type="password" placeholder="비밀번호를 다시 입력해주세요." />
                        <SignBtn>회원가입</SignBtn>
                    </SignForm>
                </SignWrapper>
            </Container>
        </BackImage>
    )
};

export default Sign;