import React from 'react';
import styled from 'styled-components';
import SearchForm from './SearchForm';

const LayerFood = styled.aside`
    width: 25%;
    height: 100%;
`;

const FoodLists = () => {
    return (
        <>
            <LayerFood>
                <SearchForm />
            </LayerFood>
        </>
    )
}

export default FoodLists;