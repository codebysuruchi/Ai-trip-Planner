// import React from "react";
// import { Button } from "@/components/ui/button";
// import { CiShare2 } from "react-icons/ci";

// const InfoSection = ({ trip }) => {
//   return (
//     <div>
//       <img
//         src="https://images.unsplash.com/photo-1530103043960-ef38714abb15?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWVzdGhldGljfGVufDB8fDB8fHww"
//         className="h-[340px] w-full object-cover rounded-xl"
//       />

//       <div className="flex justify-between items-center">
//         <div className="my-5 flex flex-col gap-2">
//           <h2 className="font-bold text-2xl">
//             {trip?.userSelection?.location?.label}
//           </h2>
//           <div className="flex gap-5">
//             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
//               🗓️ {trip.userSelection?.noOfDays} Days
//             </h2>
//             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
//               💰 {trip.userSelection?.budget} Budget
//             </h2>
//             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
//               🥂 Number of traveler: {trip.userSelection?.traveler}{" "}
//             </h2>
//           </div>
//         </div>

//         <Button className="bg-gray-200 p-3 rounded-full hover:bg-zinc-700 transition">
//           <CiShare2 className="text-white " />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default InfoSection;

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CiShare2 } from "react-icons/ci";
import { fetchWikiImage } from "../../service/wikiImage";

const InfoSection = ({ trip }) => {

  const [locationImage, setLocationImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      if (!trip?.userSelection?.location?.label) return;

      const img = await fetchWikiImage(
        trip.userSelection.location.label
      );

      setLocationImage(
        img 
      );
    };

    loadImage();
  }, [trip]);

  return (
    <div>
      <img
        src={locationImage || "/placeholder.jpg"}
        className="h-[220px] sm:h-[280px] md:h-[340px] w-full object-cover rounded-xl"
        alt="Trip Location"
      />

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-xl sm:text-2xl md:text-3xl">
            {trip?.userSelection?.location?.label}
          </h2>

          <div className="flex flex-wrap gap-3 md:gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
              🗓️ {trip?.userSelection?.noOfDays} Days
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
              💰 {trip?.userSelection?.budget} Budget
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base">
              🥂 Number of traveler: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>

        <Button className="bg-gray-200 p-3 rounded-full hover:bg-zinc-700 transition self-start md:self-auto">
          <CiShare2 className="text-white" />
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;