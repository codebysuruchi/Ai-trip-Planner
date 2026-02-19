import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../service/firebaseConfig";  
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

const ViewTrip = () => {

    const {tripId}=useParams();
    const [trip, setTrip]=useState([]);

    useEffect(() => {
      tripId && GetTripData();
    }, [tripId])
    // used to get trip info from firestore

    const GetTripData=async ()=>{
        const docRef = doc(db, "AITrips", tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setTrip(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        //   toast("No trip found")
         }
    }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* Information section for the trip will be shown here */}
            <InfoSection trip={trip} />

        {/* Recommended hotels */}
            <Hotels trip={trip} />

        {/* Daily Plan */}
            <PlacesToVisit trip={trip} />

        {/* Footer */}
          <Footer trip={trip} />
    </div>
  )
}

export default ViewTrip
