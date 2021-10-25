import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ListContext } from 'Routers/Router';
import {auth, signOut} from 'services/firebase';
import userIcon from 'assets/userIcon.jpeg';

const LayerModal = styled.div`
    width: 300px;
    height: 100px;
    background-color: white;
    position: absolute;
    top: 8%;
    right: 1%;
    z-index: 1;
    border: 1px solid rgba(10, 10, 10, .35);
    border-radius: 10px;
    display: flex;
`;

const LayerUser = styled.div`
    width: 33%;
    height:80%;
`;

const UserImage = styled.img`
    width: 70%;
    height: 80%;
    margin: 10px 0 0 20px;
`;

const UserName = styled.h3`
    font-size: 1.7rem;
    margin: 20px 0 10px 0;
`;

const UserEditLink = styled(Link)`
    font-size: 1.2rem;
`;

const LogOutButton = styled.button`
    all:unset;
    width: 60px;
    height: 25px;
    position: absolute;
    top: 15%;
    right: 8%;
    font-size: 1.4rem;
    text-align: center;
    border:1px solid rgba(10, 10, 10, .35);
`;

const UserModal = () => {
    const {userInfo} = useContext(ListContext);
    const history = useHistory();

    const handleLogOut = evt => {
        auth.signOut();
        history.push("/");
    }

    return (
        <LayerModal>
            <LayerUser>
                <UserImage src={userIcon} alt="Profile_Image"/>
            </LayerUser>
            <LayerUser>
                <UserName>{userInfo.name}</UserName>
                <UserEditLink to="/users"> 프로필 수정 </UserEditLink>
            </LayerUser>
            <LogOutButton type="submit" onClick={handleLogOut}> 로그아웃 </LogOutButton>
        </LayerModal>
    )
}

export default UserModal;