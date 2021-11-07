import { getFirestore, collection, getDocs} from './firebase';

const db = getFirestore();

// 세션 스토리지를 활용한 인증 지속성

export const isAuthorized = {
    setSessionStorage: (keyName, value) => sessionStorage.setItem(keyName, value),
    getAuthorized: () => sessionStorage.getItem("isAuthorized"),
    getProfile: () => sessionStorage.getItem("userProfile"),
    removeProfile: () => sessionStorage.removeItem("userProfile"),
}

// 데이터베이스에서 사용자 데이터를 가지고 오는 함수
export const getUserData = async () => {
    const querySnapshot = await getDocs(collection(db, "user"));
    let userInfo = [];
    querySnapshot.forEach((doc) => {
        userInfo.push(doc.data());
    });
    
    return userInfo;
};

// 사용자 데이터에서 이메일만 모아서 따로 배열로 만드는 함수
export const getEmailLists = async () => {
    let emailLists = [];

    await getUserData()
    .then(userInfo => {
        userInfo.forEach(info => {
            emailLists.push(info.email);
        });
    });
    return emailLists;
};

// 이름, 이메일, 암호 확인을 위한 정규표현식
export const regex = {
    name: /^[가-힣]{2,5}$/,
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
};