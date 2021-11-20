import React, { useRef } from "react";
import styled from "styled-components";
import ListItem from "./ListItem";
import PageNumber from "./StorePagination";

const FoodLists = styled.ul`
  width: 100%;
  height: 75%;
  display: grid;
  grid-gap: 5px;
  overflow: scroll;
`;

const StoreList = ({ getLists, setPage }) => {
  const scrollTop = useRef(null);

  const handleRequestPage = (evt) => {
    setPage(parseInt(evt.target.id));
    scrollTop.current.scrollTo(0, scrollTop.current.pageYOffset);
  };
  return (
    <FoodLists ref={scrollTop}>
      {getLists &&
        getLists.map((data, index) => (
          <ListItem key={data.id} itemData={data} index={index}></ListItem>
        ))}

      {getLists !== undefined ? (
        <PageNumber handleRequestPage={handleRequestPage} />
      ) : null}
    </FoodLists>
  );
};

export default StoreList;
