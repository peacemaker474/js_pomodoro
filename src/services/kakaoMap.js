/*global kakao*/

const kakaoMap = () => {
    const container = document.getElementById("map");
    let options = {
        center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
        level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    let markerPosition = new kakao.maps.LatLng(
        37.365264512305174,
        127.10676860117488
    );
    let marker = new kakao.maps.Marker({
        position: markerPosition,
    });
    marker.setMap(map);
};

export default kakaoMap;