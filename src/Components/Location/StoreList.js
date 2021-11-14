import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { getFirestore, doc, arrayUnion, updateDoc } from "services/firebase";
import bookMark from 'assets/bookmark.svg';
import bookMarkBorder from "assets/bookmark-border.svg";
import { ListContext } from 'Routers/Router';
import PageNumber from './StorePage';

const FoodLists = styled.ul`
    width: 100%;
    height: 75%;
    display: grid;
    grid-template-rows: repeat(16, 14%);
    grid-gap: 5px;
    overflow: scroll;
`;

const FoodList = styled.li`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    z-index: 0;
`;

const StoreIndex = styled.h1`
    width: 20%;
    height: 100%;
    font-size: 3.8rem;
    text-align: center;
    padding-top: 25px;
`;

const FoodStoreContents = styled.div`
    width: 85%;
    height: 100%;
`;

const StoreName = styled.h3`
    font-size: 1.4rem;
    padding: 15px 0;
`;

const StoreLink = styled.a`
    text-decoration: none;
    color: black;
`;

const StoreAddress = styled.p`
    font-size: 1.3rem;
    padding-bottom: 5px;
`;

const StoreCallNumber = styled.span`
    font-size: 1.1rem;
`;

const BookMark = styled.img`
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10%;
    top: 20%;
    z-index: 1;
`;

const StoreList = ({getLists, setPage}) => {
    const markLists = useRef(getLists && getLists.map(() => React.createRef()));
    const scrollTop = useRef(null);
    const {userInfo} = useContext(ListContext);

    const handleZoomMark = evt => {
        console.log(evt);
    }

    const addMyFoodList = async (evt) => {
        const db = getFirestore();
        const getUserDB = doc(db, "user", userInfo.displayName);

        await getLists.forEach(data => {
            if (data.id === evt.target.id) {
                updateDoc(getUserDB, { 
                    lists: arrayUnion(data)
                });
            }
        });
        
    }

    return (
        <FoodLists ref={scrollTop}>
            {getLists && getLists.map((data, index) => (
                <FoodList key={data.id}>
                    <StoreIndex> {index} </StoreIndex>
                    <FoodStoreContents>
                        <StoreName onClick={handleZoomMark}>
                            <StoreLink> {data.place_name} </StoreLink>
                        </StoreName>
                        <StoreAddress> {data.road_address_name} </StoreAddress>
                        <StoreCallNumber> {data.phone} </StoreCallNumber>
                    </FoodStoreContents>
                    <BookMark id={data.id} src={bookMark} alt="BookMark" onClick={addMyFoodList} ref={markLists} />
                </FoodList>
            ))}
            {getLists !== undefined ? <PageNumber setPage={setPage} scrollTop={scrollTop} /> : null}
        </FoodLists>
    );
};

export default StoreList;