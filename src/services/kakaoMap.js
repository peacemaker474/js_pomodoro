/*global kakao*/

// 위치 정보를 내 기준으로 재설정
const getMyLocation = (map) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude,
        lon = position.coords.longitude;
      let location = new kakao.maps.LatLng(lat, lon);
      map.setCenter(location);
    });
  }
};

// 첫 로그인 후 지도 화면에 띄우기
export const kakaoMap = () => {
  const container = document.getElementById("map");
  let options = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 3,
  };
  // 지도를 생성합니다
  const map = new kakao.maps.Map(container, options);
  // 현재 위치로 재설정
  getMyLocation(map);
};

// 카카오톡 검색 후 마크 생성 영역
export const kakaoSearch = (search, setGetLists, page = 1) => {
    const infowindow = new kakao.maps.InfoWindow({zIndex:1});

  const container = document.getElementById("map");
  let options = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567),
    level: 3,
  };
  // 지도를 생성합니다
  const map = new kakao.maps.Map(container, options);

  const ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(search, placesSearchCB, {page}); 

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  function placesSearchCB(data, status) {
    if (status === kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      const bounds = new kakao.maps.LatLngBounds();
      setGetLists(data);
      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }
  }
  // 지도에 마커를 표시하는 함수입니다
  function displayMarker(place) {
    // 마커를 생성하고 지도에 표시합니다
    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, "mouseover", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent(
        `<div style="padding:5px;font-size:12px;"> ${place.place_name} </div>`
      );
      infowindow.open(map, marker);
    });
  }
};
