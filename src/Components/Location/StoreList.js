import React from "react";
import styled from "styled-components";
import ListItem from "./ListItem";

const FoodLists = styled.ul`
  width: 100%;
  height: 75%;
  display: grid;
  grid-gap: 5px;
  overflow: scroll;
`;

const StoreList = ({ getLists, setPage }) => {
  //   const markLists = useRef(getLists && getLists.map(() => React.createRef()));
  //   const scrollTop = useRef(null);
  //   const { userInfo } = useContext(ListContext);
  console.log("렌더링?");

  return (
    <FoodLists>
      {getLists &&
        getLists.map((data, index) => (
          <ListItem
            key={data.id}
            data={data}
            index={index}
            getLists={getLists}
          ></ListItem>
        ))}
      {/* {getLists !== undefined ? <PageNumber setPage={setPage} scrollTop={scrollTop} /> : null} */}
    </FoodLists>
  );
};

export default StoreList;
