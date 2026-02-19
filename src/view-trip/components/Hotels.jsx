import React from 'react'
import { Link } from 'react-router-dom';
import { fetchWikiImage } from "../../service/wikiImage";
import { useState,useEffect } from 'react';



const Hotels = ({trip}) => {
  const [hotelImages, setHotelImages] = useState({});

useEffect(() => {

    const loadImages = async () => {

      if (!trip?.tripData?.Hotels) return;

      const images = {};

      for (let hotel of trip.tripData.Hotels) {

        //  Fetch image using hotel name
        const img = await fetchWikiImage(hotel.name);

        // If wiki image found use it else fallback image
        images[hotel.name] =
          img ;

      }

      setHotelImages(images);
    };

    loadImages();

  }, [trip]);
  //   console.log("Full Trip Object:", trip);
  // console.log("Trip Data:", trip?.tripData);
  // console.log("Hotels Array:", trip?.tripData?.Hotels);

  return (
    <div className="w-full">
      <h2 className='font-bold text-lg sm:text-xl md:text-2xl mt-5'>Hotel Recommendation </h2>
      <div className='grid 
                      grid-cols-1 
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4 
                      xl:grid-cols-5 
                      gap-4 md:gap-5 
                      mt-3  '>
        {trip?.tripData?.Hotels?.map((hotel,index)=>{
          
            return (
            <Link key={index} to ={"https://www.google.com/maps/search/?api=1&query="+hotel?.name+","+hotel?.address} target='_blank' className="block">
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={hotelImages[hotel.name] || "/hotelImage.jpg"} className='rounded-xl h-40 sm:h-44 md:h-48 w-full object-cover'  alt={hotel.name}/>
                <div className='my-2 flex flex-col gap-1 sm:gap-2'>
                  <h2 className='font-medium text-sm sm:text-base truncate'>{hotel?.name}</h2>
                  <h2 className='font-medium text-xs sm:text-sm text-gray-500 truncate'>📍{hotel?.address}</h2>
                  <h2 className='font-medium text-xs sm:text-sm text-gray-500'>🪙{hotel?.price}</h2>
                  <h2 className='font-medium text-xs sm:text-sm text-gray-500'>⭐{hotel?.rating}</h2>
                </div>
            </div>
            </Link>
            )
        })}
        
      </div>
      
    </div>
  )
}

export default Hotels
