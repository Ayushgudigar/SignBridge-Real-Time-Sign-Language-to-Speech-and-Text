import React from 'react';
import { useNavigate } from 'react-router-dom';
import MouseFollower from './MouseFollower';
import HomeSection from './HomeSection/HomeSection';

const Landing = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/home');
  };

  return (
    <>
      <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
        <MouseFollower />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 via-purple-900/70 to-black/80 z-10"></div>

        <div className="relative z-20 p-2 xs:p-3 xss:p-4 sm:p-6 md:p-10 flex flex-col justify-center items-center text-center">
          <h1 className="text-xl xs:text-2xl xss:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white mb-2 xs:mb-3 xss:mb-4 sm:mb-6 leading-tight">
            Indian Sign Language
          </h1>
          <p className="text-gray-200 mb-3 xs:mb-4 xss:mb-6 sm:mb-8 md:mb-10 leading-relaxed text-sm xs:text-base xss:text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl px-1 xs:px-2 xss:px-4">
            Bridging communication barriers and empowering the deaf community
            across India. Discover the rich visual language that connects millions
            through expressive communication.
          </p>
          <button
            onClick={handleExploreClick}
            className="px-2 py-1 xs:px-3 xs:py-2 xss:px-4 xss:py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl text-xs xs:text-sm xss:text-base sm:text-lg md:text-xl text-white font-medium
            bg-gradient-to-r from-blue-500 to-purple-500
            hover:rounded-3xl hover:opacity-90 transition-all duration-300 min-h-[36px] xs:min-h-[40px] xss:min-h-[44px] sm:min-h-[48px] w-auto"
          >
            Explore More
          </button>
        </div>
      </div>

    </>
  );
};

export default Landing;
