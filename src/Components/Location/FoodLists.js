import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchForm from './SearchForm';
import List from './List';
import { kakaoSearch } from 'services/kakaoMap';

const LayerFood = styled.aside`
    width: 25%;
    height: 100%;
`;

const FoodLists = () => {
    const [searchKeyword, setSearchKeyword] = useState();
    const [getLists, setGetLists] = useState();

    useEffect(() => {
        kakaoSearch(searchKeyword, setGetLists);
    }, [searchKeyword]);

    return (
        <>
            <LayerFood>
                <SearchForm setSearchKeyword={setSearchKeyword}/>
                <List getLists={getLists}/>
            </LayerFood>
        </>
    )
}

export default FoodLists;