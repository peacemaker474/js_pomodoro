import { useContext } from "react";
import { getFirestore, doc } from "services/firebase";
import { getDoc } from "firebase/firestore";
import { ListContext } from "Routers/Router";

const MyList = () => {
  const { userInfo } = useContext(ListContext);
  const db = getFirestore();
  const getUserDB = doc(db, "user", userInfo.email);
  const myData = [];

  const getMyFoodList = async () => {
    const userData = await getDoc(getUserDB);
    const foodData = userData.data().lists;
    Object.keys(foodData).forEach((data) => {
      console.log(foodData[data]);
      myData.push(foodData[data]);
    });
  };

  return <ul></ul>;
};

export default MyList;
