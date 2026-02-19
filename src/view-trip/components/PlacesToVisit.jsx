// // import React from 'react'

// // const PlacesToVisit = ({trip}) => {
// //   console.log("Itinerary:", trip.tripData?.Itinerary);
// //   return (
// //     <div>
// //       <h2 className='font-bold text-lg mt-5'>Places To Visit</h2>
      
// //       <div>
// //         {trip.tripData?.Itinerary.map((item,index)=>(
// //           <div>
// //             <h2 className='font-medium text-lg'>{item.day}</h2>
// //             {item.plan.map((place,index)=>(
// //               <div>
// //                 <h2>{place.name}</h2>
// //               </div>
// //             ))}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }

// // export default PlacesToVisit

// import React from 'react'
// import PlaceCardItem from './PlaceCardItem'

// const PlacesToVisit = ({ trip }) => {

//   return (
//     <div>
//       <h2 className='font-bold text-lg mt-5'>Places To Visit</h2>

//       <div>
//         {trip?.tripData?.Itinerary?.map((item, index) => (
//           <div key={index} className='grid grid-cols-1'>
//             <h2 className='font-medium text-lg'>{item.day}</h2>
            
//             {/* SAFE CHECK */}
//             {Array.isArray(item.plan) ? (
//               item.plan.map((place, i) => (
                
//                 <div key={i}>
//                   <h2 className='font-medium text-sm text-orange-600'>{place.time}</h2>
//                   <h2>{place.name}</h2>
                  
//                 </div>
//               ))
//             ) : (
//               <div className='my-3 '>
//                 <h2>{item.plan?.name || item.plan}</h2>
//                 <PlaceCardItem />
//               </div>
//             )}

//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default PlacesToVisit

import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({ trip }) => {

  console.log("Trip Data:", trip?.tripData);
  console.log("Itinerary:", trip?.tripData?.Itinerary);

  if (!Array.isArray(trip?.tripData?.Itinerary)) {
    return <h2 className="mt-5">Loading itinerary...</h2>;
  }

  return (
    <div>
      <h2 className='font-bold text-lg mt-5'>Places To Visit</h2>

      <div>
        {trip.tripData.Itinerary.map((item, index) => (
          <div  key={index} className='mt-5'>
            <div className=''>
            <h2 className='font-medium text-lg'>{item?.day}</h2>
              <div className='grid md:grid-cols-2  gap-5'>
            {Array.isArray(item?.placesToVisit) &&
              item.placesToVisit.map((place, i) => (
                <div className='my-1' key={i}>
                  
                  <h2 className='font-medium text-sm text-orange-600'>
                    {place?.time}
                  </h2>

                  <PlaceCardItem place={place} />

                </div>
              ))
            }
            </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default PlacesToVisit