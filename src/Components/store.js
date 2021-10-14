import { getFirestore, collection, getDocs } from '../services/firebase';

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

export default getData;