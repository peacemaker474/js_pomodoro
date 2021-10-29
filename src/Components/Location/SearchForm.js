import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import searchImage from 'assets/search.png';
import { kakaoSearch } from 'services/kakaoMap';

const LayerForm = styled.div`
    width: 100%;
    height: 25%;
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

const SearchForm = () => {
    const [searchKeyword, setSearchKeyword] = useState();
    const search = useRef(null);

    useEffect(() => {
        kakaoSearch(searchKeyword);
    }, [searchKeyword])

    const handleSearchKeyword = evt => {
        evt.preventDefault();
        setSearchKeyword(search.current.value);
    }

    return (
        <LayerForm>
            <FoodListsTitle> MyFoodMap</FoodListsTitle>
            <FoodSearchForm onSubmit={handleSearchKeyword}>
                <FoodSearchInput placeholder="맛집 검색하기" type="text" ref={search}/>
                <FoodSearchButton type="submit">
                    <SearchIcon src={searchImage}/>
                </FoodSearchButton>
            </FoodSearchForm>
        </LayerForm>
    )
};

export default SearchForm;