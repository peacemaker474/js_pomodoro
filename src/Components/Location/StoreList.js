import React from "react";
import styled from "styled-components";
import ListItem from "./ListItem";

const FoodLists = styled.ul`
  width: 100%;
  height: 75%;
  display: grid;
  grid-template-rows: repeat(15, 14%);
  grid-gap: 5px;
  overflow: scroll;
`;

const StoreList = ({ getLists }) => {
  return (
    <FoodLists>
      {getLists &&
        getLists.map((data, index) => (
          <ListItem data={data} index={index} getLists={getLists} />
        ))}
    </FoodLists>
  );
};

export default StoreList;
