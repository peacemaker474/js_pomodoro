import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { auth, deleteUser, deleteDoc, doc, getFirestore } from 'services/firebase';
import { isAuthorized } from 'services/store';
import { ListContext } from 'Routers/Router';

const Container = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 2.4rem;
    width: 80%;
    margin: 20px auto;
`;

const DeleteText = styled.p`
    font-size: 1.8rem;
    width: 80%;
    margin: 0 auto;
`;

const RemoveBtn = styled.button`
    all: unset;
    width: 80px;
    height: 30px;
    font-size: 1.6rem;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    background-color: #FACAC0;
    margin: 20px 0 0 100px;
    align-self: flex-start;
`;

const UserDelete = () => {
    const history = useHistory();
    const {userInfo} = useContext(ListContext);

    const handleRemoveId = async (evt) => {
        evt.preventDefault();
        const db = getFirestore();
        const user = auth.currentUser;

        if(window.confirm("MyFood에서 계정을 삭제하시겠습니까?")){
            await deleteUser(user)
            .then(() => {
                deleteDoc(doc(db, "user", userInfo.email));
                isAuthorized.setSessionStorage("isAuthorized", false);
                history.push("/");
            })
            .catch(() => {
                console.log("에러발생");
            })
        }
    }

    return (
        <Container>
            <Title> 회원 탈퇴 </Title>
            <DeleteText> 
                무엇인가를 채우고 싶은데, 채우고 싶은 문구가 마땅히 없네요.
                아니면 회원 탈퇴 부분을 따로 만들까 생각중입니다.
            </DeleteText>
            <RemoveBtn type="submit" onClick={handleRemoveId}> 회원탈퇴 </RemoveBtn>
        </Container>
    )
}

export default UserDelete;