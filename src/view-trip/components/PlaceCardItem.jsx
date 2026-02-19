// import React from 'react'
// import { Button } from '@/components/ui/button';
// import { FaMapLocation } from "react-icons/fa6";
// import { Link } from 'react-router-dom';

// const PlaceCardItem = ({place}) => {
//   return (
//     <Link to={"https://www.google.com/maps/search/?api=1&query="+place?.name } target='_blank'>
//     <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
//       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNj-Bd0ApCqhUcapLpTs0fR0E05B5dtkQzZQ&s" alt="" className='w-[130px] h-[130px]'/>
//       <div>
//         <h2 className='font-bold text-lg '>{place.name}</h2>
//         <p className='text-sm text-gray-500'>{place.description}</p>
//         <h2 className='mt-2'>🕝{place.timeToTravel}</h2>
//         <Button size="sm"><FaMapLocation /></Button>
//       </div>          
//     </div>
//     </ Link> 
//   )
// }

// export default PlaceCardItem

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { FaMapLocation } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { fetchWikiImage } from "../../service/wikiImage";

const PlaceCardItem = ({ place }) => {

  const [placeImage, setPlaceImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      if (!place?.name) return;

      const img = await fetchWikiImage(place.name);

      setPlaceImage(
        img 
      );
    };

    loadImage();
  }, [place]);

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.name}
      target='_blank'
    >
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>

        <img
          src={placeImage || "/placeholder.jpg"}
          alt={place?.name}
          className='w-[130px] h-[130px] object-cover rounded-lg'
        />

        <div>
          <h2 className='font-bold text-lg'>{place?.name}</h2>
          <p className='text-sm text-gray-500'>{place?.description}</p>
          <h2 className='mt-2'>🕝 {place?.timeToTravel}</h2>

          <Button size="sm">
            <FaMapLocation />
          </Button>
        </div>

      </div>
    </Link>
  )
}

export default PlaceCardItem