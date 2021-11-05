import React from 'react';
import styled from 'styled-components';

const ListUl = styled.ul`
    width: 100%;
    height: 75%;
    display: grid;
    grid-template-rows: repeat(15, 14%);
    grid-gap: 5px;
    overflow: scroll;
`;

const Listli = styled.li`
    width: 100%;
    height: 100%;
    display: flex;
`;

const ListOrder = styled.h1`
    width: 20%;
    height: 100%;
    font-size: 3.8rem;
    text-align: center;
    padding-top: 25px;
`;

const FoodContent = styled.div`
    width: 85%;
    height: 100%;
`;

const FoodName = styled.h3`
    font-size: 1.4rem;
    padding: 15px 0;
`;

const FoodLink = styled.a`
    text-decoration: none;
    color: black;
`;

const FoodAddress = styled.p`
    font-size: 1.3rem;
    padding-bottom: 5px;
`;

const FoodNumber = styled.span`
    font-size: 1.1rem;
`;

const List = ({getLists}) => {
    return (
        <>
            <ListUl>
                {getLists && getLists.map((data, index) => (
                    <Listli key={data.id}>
                        <ListOrder> {index} </ListOrder>
                        <FoodContent>
                            <FoodName>
                                <FoodLink href={data.place_url}> {data.place_name} </FoodLink>
                            </FoodName>
                            <FoodAddress> {data.road_address_name} </FoodAddress>
                            <FoodNumber> {data.phone} </FoodNumber>
                        </FoodContent>
                    </Listli>
                ))}
            </ListUl>
        </>
    );
};

export default List;