import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.nav`
    width: 100%;
    height: 10%;
`;

const NavLists = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const NavList = styled.li`
    width: 20%;
    height: 60%;
`;

const MainLink = styled(Link)`
    text-decoration: none;
    color: #F0CF61;
    font-size: 3.8rem;
    display: block;
    padding: 5px 0 0 20px;
    box-sizing: border-box;
`;

const Header = () => {
    return (
        <NavBar>
            <NavLists>
                <NavList>
                    <MainLink to="/home"> MyFoodMap </MainLink>
                </NavList>
            </NavLists>
        </NavBar>
    )
};

export default Header;