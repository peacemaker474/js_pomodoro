import React, { useEffect } from "react";
import styled from "styled-components";
import kakaoMap from "services/kakaoMap";
import UserProfile from "./UserProfile";
import { Redirect } from "react-router-dom";

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  z-index: 0;
`;

const FoodLists = styled.aside`
  width: 25%;
  height: 100%;
`;
const Map = styled.div`
  width: 74.9%;
  height: 100%;
`;

const Location = () => {
  useEffect(() => {
    kakaoMap();
  }, []);

  return (
    <>
      <Container>
        <FoodLists />
        <Map id="map" />
        <UserProfile />
      </Container>
    </>
  );
};

export default Location;
