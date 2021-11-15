import React, { useContext } from 'react';
import styled from 'styled-components';
import {Route, Link, Switch} from 'react-router-dom';
import { ListContext } from './Router';
import UserInformaiton from 'Components/User/UserInformation';
import UserModify from 'Components/User/UserModify';
import Header from 'Components/User/Header';
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

const UserRouter = () => {
    const {userInfo} = useContext(ListContext);

    return (
        <>
            <Container>
                <Header />
                <Wrapper>
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