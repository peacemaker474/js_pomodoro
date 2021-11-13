import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { getFirestore, doc, arrayUnion, updateDoc } from "services/firebase";
import { getDoc, deleteDoc } from "firebase/firestore";
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

function ListItem({ data, index, getLists }) {
  const markLists = useRef(getLists && getLists.map(() => React.createRef()));
  const { userInfo } = useContext(ListContext);
  const [isCheck, setIsCheck] = useState(false);

  const handleZoomMark = (evt) => {
    console.log(evt.target.id);
  };

  const addMyFoodList = async (evt) => {
    const db = getFirestore();
    setIsCheck(!isCheck);

    const getUserDB = doc(db, "user", userInfo.displayName);
    const data = await getDoc(getUserDB);

    await getLists.forEach((data) => {
      if (data.id === evt.target.id) {
        console.log(data);
        console.log(evt.target.id);
        console.log(data.id);
        updateDoc(getUserDB, {
          lists: arrayUnion(data),
        });
      }
    });
  };

  const delMyFoodList = async (evt) => {
    const db = getFirestore();
    setIsCheck(!isCheck);

    const getUserDB = doc(db, "user", userInfo.displayName);
    // console.log(getUserDB);
    const data = await getDoc(getUserDB);

    delete data.data().lists[-1];
    console.log(data.data().lists);
    console.log(data.data().lists[0] === null);
    console.log(data.data().lists[0] === undefined);
    console.log(data.data().lists[1] === null);
    console.log(data.data().lists[1] === undefined);

    // console.log(evt.target.id);
    console.log(Object.keys(data.data().lists).length);

    // await Object.keys(data.lists).forEach((i) => {
    //   //   if (data.id === evt.target.id) {
    //   //     console.log(data);
    //   //   }
    //   console.log(data[i]);
    // });
  };

  return (
    <FoodList key={data.id}>
      <StoreIndex> {index} </StoreIndex>
      <FoodStoreContents>
        <StoreName onClick={handleZoomMark}>
          <StoreLink> {data.place_name} </StoreLink>
        </StoreName>
        <StoreAddress> {data.road_address_name} </StoreAddress>
        <StoreCallNumber> {data.phone} </StoreCallNumber>
      </FoodStoreContents>
      <BookMark
        id={data.id}
        src={isCheck ? bookMark : bookMarkBorder}
        alt="BookMark"
        onClick={isCheck ? delMyFoodList : addMyFoodList}
        ref={markLists}
      />
    </FoodList>
  );
}
export default ListItem;
