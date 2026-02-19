import React, { useEffect,useState } from "react";
import { useNavigation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import UserTripCardItem from "./components/UserTripCardItem";

const MyTrips = () => {

    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  /**
   * use to Get All User Trips
   */

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
      navigation("/");
      return;
    }
    setUserTrips([]);
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };

  return <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 mt-10 max-w-7xl mx-auto ">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">My Trips</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {userTrips?.length>0?userTrips.map((trip, index) => (
            <UserTripCardItem trip={trip} key={index}  />
        )):
        [1,2,3,4,5].map((item,index)=>{
            <div key={index} className="h-[250px] w-full bg-slate-200 animate-purple rounded-xl">

            </div>
        })
        }
    </div>
  </div>;
};

export default MyTrips;
