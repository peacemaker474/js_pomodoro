import React, { useEffect } from "react";
import styled from 'styled-components';
import UserProfile from "./UserProfile";
import FindFoodLists from "./FindFoodLists";
import { kakaoMap } from "services/kakaoMap";

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display:flex;
  position: relative;
  z-index: 0;
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
        <FindFoodLists />
        <Map id="map" />
        <UserProfile />
      </Container>
    </>
  );
};

export default Location;
