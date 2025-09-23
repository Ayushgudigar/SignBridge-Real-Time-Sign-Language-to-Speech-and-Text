import React from 'react';
import Navbar from './Navbar';
import HomeSection from './HomeSection/HomeSection';
import TransformLives from './HomeSection/TransformLives';
import LearningJourney from './HomeSection/LearningJourney';
import StartFree from './HomeSection/StartFree';
import WhyLearnISL from './HomeSection/WhyLearnISL';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <HomeSection />
      <WhyLearnISL/>
      <TransformLives/>
      <LearningJourney/>
      <StartFree/>

    </>
  );
};

export default MainLayout;
