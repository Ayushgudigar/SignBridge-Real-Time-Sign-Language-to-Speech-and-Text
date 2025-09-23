import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import heroImage from './images/hero-sign-language.jpg';
import WhyLearnISL from './WhyLearnISL';

const HomeSection = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [showDemo, setShowDemo] = useState(false);
  const [stats, setStats] = useState({
    students: 12500,
    lessons: 75,
    successRate: 98
  });

  const handleStartJourney = () => {
    if (isAuthenticated) {
      navigate('/learn');
    } else {
      navigate('/signup');
    }
  };

  const handleWatchDemo = () => {
    setShowDemo(true);
    // Here you could implement a modal or redirect to a demo video
    console.log('Demo video would play here');
  };

  const handleStartLearning = () => {
    if (isAuthenticated) {
      navigate('/learn');
    } else {
      navigate('/signup');
    }
  };
  return (
    <div className="max-w-8xl mx-auto flex flex-col lg:flex-row items-center gap-3 xs:gap-4 xss:gap-6 sm:gap-8 md:gap-10 px-2 xs:px-3 xss:px-4 sm:px-6 md:px-10 py-4 xs:py-6 xss:py-8 sm:py-12 md:py-16 min-h-screen bg-black text-white mt-7">
      <div className="flex-1 space-y-2 xs:space-y-3 xss:space-y-4 sm:space-y-6 text-center lg:text-left">
        <h1 className="text-lg xs:text-xl xss:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
          <span className="whitespace-nowrap text-xl xs:text-2xl xss:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Master <span className="text-orange-500">Indian</span></span>{' '}<br />
          <span className="text-gradient bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent text-xl xs:text-2xl xss:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Sign Language
          </span>{' '}<br />
          <span className="text-xl xs:text-2xl xss:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Today</span>
        </h1>
        <p className="text-gray-300 text-xs xs:text-sm xss:text-base sm:text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed px-1 xs:px-2">
          Bridge communication barriers and connect with India's deaf community through our comprehensive, interactive ISL learning platform designed by experts.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 xs:gap-2 xss:gap-3 sm:gap-4 justify-center lg:justify-start">
          <button 
            onClick={handleStartJourney}
            className="bg-gradient-to-r from-orange-500 to-blue-500 px-2 xs:px-3 xss:px-4 sm:px-6 py-1 xs:py-2 xss:py-2 sm:py-3 rounded-lg font-semibold hover:opacity-90 transition min-h-[36px] xs:min-h-[40px] xss:min-h-[44px] sm:min-h-[48px] text-xs xs:text-sm xss:text-base sm:text-lg w-full sm:w-auto"
          >
            {isAuthenticated ? 'Continue Learning' : 'Start Your Journey'}
          </button>
          <button 
            onClick={handleWatchDemo}
            className="bg-black border border-gray-700 px-2 xs:px-3 xss:px-4 sm:px-6 py-1 xs:py-2 xss:py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-900 transition min-h-[36px] xs:min-h-[40px] xss:min-h-[44px] sm:min-h-[48px] text-xs xs:text-sm xss:text-base sm:text-lg w-full sm:w-auto"
          >
            Watch Demo
          </button>
        </div>
      </div>
      <div className="flex-1 w-full lg:w-auto">
        <img
          src={heroImage}
          alt="Sign Language"
          className="rounded-lg shadow-lg w-full h-auto max-w-xs xs:max-w-sm xss:max-w-md mx-auto lg:max-w-none transition-all duration-500 hover:shadow-[0_0_40px_10px_rgba(249,115,22,0.5)] hover:-translate-y-2"
        />
      </div>

      <button 
        onClick={handleStartLearning}
        className="absolute bottom-4 right-4 bg-gradient-to-r from-green-500 to-orange-500 p-3 rounded-full shadow-lg text-white flex items-center justify-center hover:scale-110 transition-transform duration-300"
        title="Quick Start Learning"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="top-30 h-6 w-6 rounded-lg shadow-lg max-w-full h-auto transition-all duration-500 hover:shadow-[0_0_40px_10px_rgba(249,115,22,0.7)] hover:-translate-y-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.286 7.034a1 1 0 00.95.69h7.39c.969 0 1.371 1.24.588 1.81l-5.983 4.356a1 1 0 00-.364 1.118l2.287 7.034c.3.922-.755 1.688-1.54 1.118l-5.983-4.356a1 1 0 00-1.175 0l-5.983 4.356c-.784.57-1.838-.196-1.539-1.118l2.287-7.034a1 1 0 00-.364-1.118L2.035 12.46c-.783-.57-.38-1.81.588-1.81h7.39a1 1 0 00.95-.69l2.286-7.034z" />
        </svg>
      </button>

      <hr></hr>
      <div className="absolute flex flex-row items-center gap-8 p-4 text-gray-300 rounded-tr-xl mt-130">
        <div className="text-center">
          <p className="text-orange-500 font-bold text-xl">{stats.students.toLocaleString()}+</p>
          <p>Students</p>
        </div>
        <div className="text-center">
          <p className="text-orange-500 font-bold text-xl">{stats.lessons}+</p>
          <p>Lessons</p>
        </div>
        <div className="text-center">
          <p className="text-orange-500 font-bold text-xl">{stats.successRate}%</p>
          <p>Success Rate</p>
        </div>
      </div>

 
    </div>

 
    
  );
};

export default HomeSection;
