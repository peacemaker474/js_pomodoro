import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { getFirestore, doc, arrayUnion, updateDoc } from "services/firebase";
import { getDoc, arrayRemove } from "firebase/firestore";
import { ListContext } from "Routers/Router";
import bookMark from "assets/bookmark.svg";
import bookMarkBorder from "assets/bookmark-border.svg";

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
  width: 25px;
  height: 25px;
  position: absolute;
  right: 10%;
  top: 20%;
  z-index: 1;
`;

function ListItem({ itemData, index }) {
  const { userInfo } = useContext(ListContext);
  const [isCheck, setIsCheck] = useState(false);
  const db = getFirestore();
  const getUserDB = doc(db, "user", userInfo.email);

  const handleZoomMark = (evt) => {
    console.log(evt.target.id);
  };

  const checkMyFoodList = async () => {
    const userData = await getDoc(getUserDB);

    if (userData.data().lists !== undefined) {
      Object.keys(userData.data().lists).forEach((i) => {
        if (userData.data().lists[i].id === itemData.id) {
          setIsCheck(true);
        }
      });
    }
  };

  useEffect(() => {
    console.log("useEffect");
    checkMyFoodList();
  }, []);

  const addMyFoodList = async () => {
    setIsCheck(true);
    await updateDoc(getUserDB, {
      lists: arrayUnion(itemData),
    });
    console.log("맛집 데이터 추가");
  };

  const delMyFoodList = async (evt) => {
    setIsCheck(false);

    const userData = await getDoc(getUserDB);

    Object.keys(userData.data().lists).forEach((i) => {
      if (userData.data().lists[i].id === evt.target.id) {
        updateDoc(getUserDB, {
          lists: arrayRemove(userData.data().lists[i]),
        });
        console.log("맛집 데이터 삭제");
      }
    });
  };

  return (
    <FoodList key={itemData.id}>
      <StoreIndex> {index} </StoreIndex>
      <FoodStoreContents>
        <StoreName onClick={handleZoomMark}>
          <StoreLink> {itemData.place_name} </StoreLink>
        </StoreName>
        <StoreAddress> {itemData.road_address_name} </StoreAddress>
        <StoreCallNumber> {itemData.phone} </StoreCallNumber>
      </FoodStoreContents>
      <BookMark
        id={itemData.id}
        src={isCheck ? bookMark : bookMarkBorder}
        alt="BookMark"
        onClick={isCheck ? delMyFoodList : addMyFoodList}
      />
    </FoodList>
  );
}
export default ListItem;
