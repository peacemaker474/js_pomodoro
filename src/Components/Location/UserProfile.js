import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListContext } from 'Routers/Router';
import styled from 'styled-components';
import userIcon from 'assets/userIcon.jpeg';

const LayerProfile = styled.div`
    width: 40px;
    height: 40px;
    position: absolute;
    top: 2%;
    right: 1%;
    z-index: 1;
    background-image: url(${userIcon});
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
`;

const LayerUserInfo = styled.div`
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

const Image = styled.img`
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

const UserInfo = ({userName}) => (
    <>
        <LayerUserInfo>
            <LayerUser>
                <Image src={userIcon} alt="Profile_Image"/>
            </LayerUser>
            <LayerUser>
                <UserName>{userName}</UserName>
                <UserEditLink to="/users"> 프로필 수정 </UserEditLink>
            </LayerUser>
            <LogOutButton type="submit"> 로그아웃 </LogOutButton>
        </LayerUserInfo>
    </>
)

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(false);
    const [userName, setUserName] = useState();
    const {userInfo} = useContext(ListContext);

    const handleUserModal = evt => {
        setUserProfile(!userProfile);
    }

    const getUserName = () => {
        userInfo.forEach(item => {
            if (!item.includes("@")){
                setUserName(item);
            }
        });
    }

    useEffect(() => {
        getUserName();
    }, [])

    return (
        <>
            <LayerProfile onClick={handleUserModal} />
            {userProfile && <UserInfo userName={userName}/>}
        </>
    )
}

export default UserProfile;