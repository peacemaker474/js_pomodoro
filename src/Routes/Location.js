/*global kakao*/
import React, { useEffect, useState } from "react";

const Location = () => {
  const [map, setMap] = useState(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOAPI_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window;
      kakao.maps.load(() => {
        let container = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
          level: 3,
        };

        const map = new kakao.maps.Map(container, options);
        setMap(map);
      });
    };
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
};

export default Location;
