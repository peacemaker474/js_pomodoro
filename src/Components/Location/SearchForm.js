import React, { useRef } from "react";
import styled from "styled-components";
import searchImage from "assets/search.png";

const LayerForm = styled.div`
  width: 100%;
  background-color: #48dbfb;
`;

const FoodListsTitle = styled.h2`
  font-size: 2.2rem;
  width: 65%;
  height: 40%;
  margin: 0 auto;
  padding-top: 30px;
  box-sizing: border-box;
  color: white;
`;

const FoodSearchForm = styled.form`
  width: 80%;
  height: 20%;
  margin: 5px auto;
  display: flex;
  background-color: white;
  border-radius: 5px;
`;

const FoodSearchInput = styled.input`
  all: unset;
  width: 80%;
  height: 100%;
  font-size: 1.4rem;
  padding-left: 10px;
`;

const FoodSearchButton = styled.button`
  all: unset;
  width: 20%;
  height: 100%;
`;

const SearchIcon = styled.img`
  width: 60%;
  height: 70%;
  margin-left: 10px;
`;

const NavFoodList = styled.div`
  width: 80%;
  height: 53px;
  margin: 5px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;
`;

const NavButton = styled.button`
  &:hover {
    background-color: #1f8ea3;
  }
  width: 57px;
  height: 33px;
  border-radius: 5px;
`;

const SearchForm = ({ setSearchKeyword, clickNav }) => {
  const search = useRef(null);

  const handleSearchKeyword = (evt) => {
    evt.preventDefault();
    setSearchKeyword(search.current.value);
  };

  const clickButton = (evt) => {
    clickNav(evt);
  };

  return (
    <LayerForm>
      <FoodListsTitle> MyFoodMap </FoodListsTitle>
      <FoodSearchForm onSubmit={handleSearchKeyword}>
        <FoodSearchInput placeholder="맛집 검색하기" type="text" ref={search} />
        <FoodSearchButton type="submit">
          <SearchIcon src={searchImage} />
        </FoodSearchButton>
      </FoodSearchForm>
      <NavFoodList>
        <NavButton id={"search"} onClick={clickButton}>
          검색
        </NavButton>
        <NavButton id={"my"} onClick={clickButton}>
          My
        </NavButton>
      </NavFoodList>
    </LayerForm>
  );
};

export default SearchForm;
