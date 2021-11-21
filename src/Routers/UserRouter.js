import React, { useContext } from 'react';
import styled from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import { ListContext } from './Router';
import Header from 'Components/User/Header';
import ProfileNav from 'Components/User/ProfileNav';
import UserInformaiton from 'Components/User/UserInformation';
import UserModify from 'Components/User/UserModify';
import ChangePwd from 'Components/User/ChangePwd';
import UserDelete from 'Components/User/UserDelete';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`;

const Wrapper = styled.section`
    width: 100%;
    height: 90%;
    display: flex;
`;


const UserRouter = () => {
    const {userInfo} = useContext(ListContext);

    return (
        <>
            <Container>
                <Header />
                <Wrapper>
                    <ProfileNav userInfo={userInfo} />
                    <Switch>
                        <Route path={`/user/${userInfo?.uid}/overview`} exact component={UserInformaiton} />
                        <Route path={`/user/${userInfo?.uid}/modify`} exact component={UserModify} />
                        <Route path={`/user/${userInfo?.uid}/changepwd`} exact component={ChangePwd} />
                        <Route path={`/user/${userInfo?.uid}/removeid`} exact component={UserDelete} />
                    </Switch>
                </Wrapper>
            </Container>
        </>
    )
};

export default UserRouter;