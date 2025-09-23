import React from 'react';

const TransformLives = () => {
  const pointsLeft = [
    'Bridge communication gaps in Indian communities',
    'Build inclusive environments for the deaf community',
  ];

  const pointsRight = [
    'Enhance career opportunities in education and healthcare',
    'Develop cognitive abilities through visual-spatial learning',
  ];

  const CheckIcon = () => (
    <svg
      className="w-5 h-5 text-green-500 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
  <div className="relative bg-black p-12 max-w-10xl mx-auto min-h-[600px] mt-40">
  {/* Content container */}
  <div className=" rounded-2xl shadow-lg max-w-full min-h-[300px] p-6 text-left space-y-4
  bg-gray-900 transition-all duration-500
  hover:shadow-[0_0_40px_10px_rgba(234,179,8,0.6)]
 hover:-translate-y-2 hover:scale-105">

    <h2 className=" 
 text-white text-3xl font-semibold mb-6 text-center">
      Transform Lives Through Communication
    </h2>
    <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-20">
      <ul className="space-y-4 flex-1">
        {pointsLeft.map((point, index) => (
          <li key={index} className="flex items-center gap-3 text-white text-lg sm:text-xl">
            <CheckIcon />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <ul className="space-y-4 flex-1">
        {pointsRight.map((point, index) => (
          <li key={index} className="flex items-center gap-3 text-white text-lg sm:text-xl">
            <CheckIcon />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

  );
};

export default TransformLives;
