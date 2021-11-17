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
    font-size: 2.9rem;
    width: 80%;
    margin: 20px auto;
    text-align: center;
`;

const Text = styled.p`
    font-size: 1.8rem;
    width: 80%;
    margin: 0 auto;
`;

const RemoveBtn = styled.button`
    all: unset;
    width: 80px;
    height: 30px;
    font-size: 1.8rem;
    border: 1px solid black;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    color: orange;
`;

const UserDelete = () => {
    const history = useHistory();
    const {userInfo, setCheckDelete} = useContext(ListContext);

    const handleRemoveId = async (evt) => {
        evt.preventDefault();
        const db = getFirestore();
        const user = auth.currentUser;

        if(window.confirm("정말로 탈퇴를 하시겠습니까?")){
            await deleteUser(user)
            .then(() => {
                deleteDoc(doc(db, "user", userInfo.email));
                isAuthorized.setSessionStorage("isAuthorized", false);
                setCheckDelete(true);
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
            <Text> 
                지금까지 저희 맛집 리스트를 이용해주셔서 정말 감사합니다.
                떠나기 전 마지막으로, 다시 한 번만 생각해주시면 정말 감사하겠습니다.
            </Text>
            <RemoveBtn type="submit" onClick={handleRemoveId}> 회원탈퇴 </RemoveBtn>
        </Container>
    )
}

export default UserDelete;