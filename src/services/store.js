import { getFirestore, collection, getDocs } from './firebase';

const db = getFirestore();

// 데이터베이스에서 데이터를 가지고 오는 함수
const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "user"));
    let email = [];
    querySnapshot.forEach((doc) => {
        email.push(Object.values(doc.data()));
    });
    return email;
}

// 이름, 이메일, 암호 확인을 위한 정규표현식
export const regex = {
    name: /^[가-힣]{2,5}$/,
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
}

export default getData;