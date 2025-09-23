import React, { useState } from "react";




const modules = [
  {
    level: "Beginner",
    title: "Basic Hand Gestures & Alphabet",
    description:
      "Master the fundamental building blocks of ISL with interactive lessons on hand positions, finger spelling, and more.",
    duration: "2 hours",
    students: "2,400+ students",
    badgeColor: "bg-green-600",
  },
  {
    level: "Beginner",
    title: "Common Words & Phrases",
    description:
      "Learn essential vocabulary for daily communication including greetings, family terms, and common expressions.",
    duration: "3.5 hours",
    students: "1,800+ students",
    badgeColor: "bg-green-600",
  },
  {
    level: "Intermediate",
    title: "Grammar & Sentence Structure",
    description:
      "Understand ISL grammar rules, sentence formation, and how to construct meaningful conversations.",
    duration: "4 hours",
    students: "1,200+ students",
    badgeColor: "bg-blue-600",
  },
];

// … keep the rest of your component code as is

const PlayIcon = () => (
  <svg
    className="w-10 h-10 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 12l-6.518 3.75V8.25l6.518 3.75z" />
  </svg>
);

const ClockIcon = () => (
  <svg
    className="w-4 h-4 text-gray-400 inline-block mr-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-4 h-4 text-gray-400 inline-block mr-1"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 14a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2m8 0a4 4 0 00-8 0"
    />
  </svg>
);

const LearningJourney = () => {
  const [rotations, setRotations] = useState(Array(modules.length).fill({ x: 0, y: 0 }));

  const handleMouseMove = (index) => (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const rotateX = (mouseY / (rect.height / 2)) * -15; // Adjust sensitivity
    const rotateY = (mouseX / (rect.width / 2)) * 15;
    setRotations(prev => prev.map((r, i) => i === index ? { x: rotateX, y: rotateY } : r));
  };

  const handleMouseLeave = (index) => () => {
    setRotations(prev => prev.map((r, i) => i === index ? { x: 0, y: 0 } : r));
  };

  return (
    <section className="bg-black py-12 px-6 max-w-8xl mx-auto text-white mt-20 ">
      <h2 className="text-3xl font-bold text-center mb-3">Start Your Learning Journey</h2>
      <p className="text-center text-gray-400 max-w-3xl mx-auto mb-10">
        Our expertly crafted curriculum takes you from complete beginner to confident communicator through engaging, interactive lessons.
      </p>


      <div className="flex flex-col md:flex-row gap-15 justify-center" style={{ perspective: '1000px' }}>
        {modules.map((module, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-lg shadow-lg overflow-hidden flex-1 max-w-sm transition-transform duration-200 ease-out"
            style={{
              transform: `rotateX(${rotations[index].x}deg) rotateY(${rotations[index].y}deg)`,
              transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleMouseMove(index)}
            onMouseLeave={handleMouseLeave(index)}
          >
            <div
              className="relative h-40 bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 flex items-center justify-center cursor-pointer"
              aria-label={`Play ${module.title} video`}
            >
              <PlayIcon />
              <span
                className={`absolute top-3 left-3 text-xs font-semibold text-white px-2 py-1 rounded ${module.badgeColor}`}
              >
                {module.level}
              </span>
            </div>
            <div className="p-6 bg-gray-800">
              <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">{module.description}</p>
              <div className="flex items-center text-gray-400 text-xs mb-4 space-x-4">
                <div className="flex items-center">
                  <ClockIcon />
                  <span>{module.duration}</span>
                </div>
                <div className="flex items-center">
                  <UserIcon />
                  <span>{module.students}</span>
                </div>
              </div>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded">
                Start Module
              </button>
            </div>
          </div>
        ))}
      </div>
     
     
<div className="flex justify-center mt-10">
  <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-blue-500 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
    View All Modules
  </button>
</div>
      
    </section>
  );
};

export default LearningJourney;
