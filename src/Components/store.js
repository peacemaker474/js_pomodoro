import { getFirestore, collection, getDocs } from '../services/firebase';

const db = getFirestore();

const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "user"));
    let email = [];
    querySnapshot.forEach((doc) => {
        email.push(Object.values(doc.data()));
    });
    return email;
}

export default getData;