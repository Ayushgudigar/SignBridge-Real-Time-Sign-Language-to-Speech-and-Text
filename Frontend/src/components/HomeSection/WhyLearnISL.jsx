import React from 'react';
import HoverCard from '../../utils/Hovercard';
import { icons } from '../../constants/icons';

const WhyLearnISL = () => {
  const iconBg =
    'bg-gradient-to-br from-orange-500 to-blue-500 p-3 rounded-lg flex items-center justify-center';

  return (
    <section className="max-w-9xl mx-auto px-2 xs:px-3 xss:px-4 sm:px-6 pb-4 xs:pb-6 xss:pb-8 sm:pb-12 pt-8 xs:pt-12 xss:pt-16 sm:pt-24 md:pt-33 text-center text-white bg-black -mt-3">
      <h2 className="text-lg xs:text-xl xss:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 xs:mb-3 xss:mb-4 sm:mb-6 md:mb-7">
        Why Learn Indian Sign Language?
      </h2>
      <p className="text-gray-400 text-xs xs:text-sm xss:text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-3 xs:mb-4 xss:mb-6 sm:mb-8 md:mb-10 mt-3 xs:mt-4 xss:mt-6 sm:mt-8 md:mt-12 px-1 xs:px-2 xss:px-4">
        ISL is the primary language of India's deaf community, serving over 7
        million people. Learning ISL creates bridges, breaks barriers, and
        builds more inclusive communities.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 xss:gap-6 sm:gap-8 mb-6 xs:mb-8 xss:mb-12 sm:mb-16 md:mb-20">
       
          
          <div className=" hover:rotate-[3deg] rounded-lg shadow-lg max-w-full h-auto transition-all duration-500 hover:shadow-[0_0_40px_10px_rgba(34,197,94,0.5)] hover:-translate-y-2
bg-gray-900 bg-opacity-40 rounded-lg p-6 text-left space-y-4 min-h-[300px] ">
            <div className={iconBg}>{icons.video}</div>
            <h3 className="font-semibold text-lg  mb-5">Interactive Video Lessons</h3>
            <p className="text-gray-400 text-sm leading-relaxed  ">
              Learn ISL through high-quality video demonstrations with
              step-by-step guidance from certified instructors.
            </p>
          </div>
     

       
          <div className=" hover:rotate-[3deg] rounded-lg shadow-lg max-w-full h-auto transition-all duration-500 hover:shadow-[0_0_40px_10px_rgba(34,197,94,0.5)] hover:-translate-y-2
 bg-gray-900 bg-opacity-40 rounded-lg p-6 text-left space-y-4 min-h-[300px]">
            <div className={iconBg}>{icons.community}</div>
            <h3 className="font-semibold text-lg">Community Learning</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connect with fellow learners and native ISL users in our vibrant
              community platform.
            </p>
          </div>
     

       
          <div className="hover:rotate-[3deg]  rounded-lg shadow-lg max-w-full h-auto transition-all duration-500 hover:shadow-[0_0_40px_10px_rgba(34,197,94,0.5)] hover:-translate-y-2
 bg-gray-900 bg-opacity-40 rounded-lg p-6 text-left space-y-4 min-h-[300px]">
            <div className={iconBg}>{icons.curriculum}</div>
            <h3 className="font-semibold text-lg">Comprehensive Curriculum</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              From basic gestures to advanced conversations, our structured
              curriculum covers all levels.
            </p>
          </div>
      

       
          <div className="hover:rotate-[3deg] rounded-lg shadow-lg max-w-full h-auto transition-all duration-500 hover:shadow-[0_0_40px_10px_rgba(34,197,94,0.3)] hover:-translate-y-2
bg-gray-900 bg-opacity-40 rounded-lg p-6 text-left space-y-4 min-h-[300px]">
            <div className={iconBg}>{icons.certified}</div>
            <h3 className="font-semibold text-lg">Certified Progress</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Earn certificates and track your progress with our advanced
              learning analytics.
            </p>
          </div>
       
      </div>
    </section>
  );
};

export default WhyLearnISL;
