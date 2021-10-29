import React, { useState } from 'react';
import styled from 'styled-components';
import userIcon from 'assets/userIcon.jpeg';
import UserModal from './UserModal';

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

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(false);

    const handleUserModal = evt => {
        setUserProfile(!userProfile);
    }

    return (
        <>
            <LayerProfile onClick={handleUserModal} />
            {userProfile && <UserModal />}
        </>
    )
}

export default UserProfile;