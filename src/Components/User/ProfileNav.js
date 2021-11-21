import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LayerUserNav = styled.nav`
    width: 30%;
    height: 100%;
`;

const UserNavLists = styled.ul`
    width: 80%;
    height: 50%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

const UserNavList = styled.li`
    width: 100%;
    height: 20%;
`;

const UserLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 2.1rem;
    display: block;
    padding-top: 20px;
    text-align: right;
`;

const ProfileNav = ({userInfo}) => {
    return (
        <LayerUserNav>
            <UserNavLists>
                <UserNavList>
                    <UserLink to={`/user/${userInfo?.uid}/overview`}> 사용자 정보 </UserLink>
                </UserNavList>
                <UserNavList>
                    <UserLink to={`/user/${userInfo?.uid}/modify`}>프로필 수정</UserLink>
                </UserNavList>
                <UserNavList>
                    <UserLink to={`/user/${userInfo?.uid}/changepwd`}> 비밀번호 변경 </UserLink>
                </UserNavList>
                <UserNavList>
                    <UserLink to={`/user/${userInfo?.uid}/removeid`}> 회원탈퇴 </UserLink>
                </UserNavList>
            </UserNavLists>
        </LayerUserNav>
    )
};

export default ProfileNav;