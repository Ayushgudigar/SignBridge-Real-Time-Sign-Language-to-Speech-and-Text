import React from 'react'

const StartFree = () => {
  return (
    <div className=' min-h-[610px] min-w-[610px] bg-gradient-to-r from-orange-500 to-blue-500 mt-25 '>
        <div className='flex items-center justify-center flex-col py-30 gap-5'>
 <h1 className=' text-black text-6xl font-bold'>Ready To Make A Difference?</h1>
        <p className='text-black text-3xl mt-10'>Join  thousands of learners who are building bridges through indian language.<br></br> <span className='text-center ml-10'>Start your journey today and help to create a more exclusive world</span></p>

<div className="flex flex-row gap-6 mt-10">
  <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold 
                     hover:bg-orange-500 hover:text-white 
                     transform hover:scale-105 hover:shadow-lg 
                     transition-all duration-300">
    Start a Trial
  </button>
  <button className="bg-gray-200 text-black px-6 py-3 rounded-lg font-semibold 
                     hover:bg-gray-300 
                     transform hover:scale-105 hover:shadow-lg 
                     transition-all duration-300">
    Learn More
  </button>
</div>


        </div>
       
    </div>
  )
}

export default StartFree