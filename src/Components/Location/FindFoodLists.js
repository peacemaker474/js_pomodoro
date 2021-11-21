import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchForm from "./SearchForm";
import StoreList from "./StoreList";
import MyList from "./MyList";
import { kakaoSearch } from "services/kakaoMap";

const LayerFood = styled.aside`
  width: 25%;
  height: 100%;
`;

const FindFoodLists = () => {
  const [searchKeyword, setSearchKeyword] = useState();
  const [getLists, setGetLists] = useState();
  const [page, setPage] = useState(1);
  const [isSearch, setIsSearch] = useState("search");

  useEffect(() => {
    kakaoSearch(searchKeyword, setGetLists, page);
  }, [searchKeyword, page]);

  const clickNav = (evt) => {
    setIsSearch(evt.target.id);
  };

  return (
    <>
      <LayerFood>
        <SearchForm setSearchKeyword={setSearchKeyword} clickNav={clickNav} />
        {isSearch === "search" ? (
          <StoreList getLists={getLists} setPage={setPage} />
        ) : (
          <MyList />
        )}
      </LayerFood>
    </>
  );
};

export default FindFoodLists;
