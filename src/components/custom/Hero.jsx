import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-6 sm:mx-16 md:mx-32 lg:mx-56 gap-6 sm:gap-9 px-4'>
      <h1 className='font-extrabold text-[55px] text-center text-2xl sm:text-3xl md:text-4xl lg:text-[55px]  mt-10 sm:mt-16 leading-snug'> <span className='text-[#3ad286]'>Discover Your Next Trip With AI:</span> Personalized ltineraries at your fingertips</h1>
      <p className=' text-gray-500 text-center text-base sm:text-lg md:text-xl  max-w-2xl'> Your personal trip planner and travel curator, creating custom iteneries tailored to your interest and budget. </p>
      <Link to={'/create-trip'}><button className=' bg-[#2d3748] text-[#3ad286] px-6 py-2 sm:px-8 sm:py-3 rounded-lg text-sm sm:text-base'>Get Started , It's free</button></Link>

      <div className="relative flex justify-center px-4 sm:px-6 md:px-10 lg:px-20">
  <img
    src="/LandingPage.png"
    alt="Landing Preview"
    className="
      w-full 
      max-w-5xl 
      rounded-2xl 
      shadow-2xl 
      mt-8 sm:mt-12 md:mt-10
      transition-all
      duration-700 
      ease-in-out
      hover:scale-[1.02]
      animate-fadeInUp
    "
  />
</div>


    </div>
  )
}

export default Hero
