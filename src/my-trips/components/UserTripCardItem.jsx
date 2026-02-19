import React from "react";
import { fetchWikiImage } from "../../service/wikiImage";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
  const [locationImage, setLocationImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      if (!trip?.userSelection?.location?.label) return;

      const img = await fetchWikiImage(trip.userSelection.location.label);

      setLocationImage(img);
    };

    loadImage();
  }, [trip]);

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all hover:shadow-md cursor-pointer w-full">
        <img src={locationImage || "/placeholder.jpg"} className="object-cover rounded-xl h-[180px] sm:h-[200px] md:h-[220px] w-full"/>
        <div className="mt-3 px-1 sm:px-2">
          <h2
            className="font-bold text-base sm:text-lg md:text-xl
        "
          >
            {trip?.userSelection?.label}
          </h2>
          <h2 className="text-xs sm:text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
