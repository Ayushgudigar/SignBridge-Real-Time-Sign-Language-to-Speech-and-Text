import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LearningModule = () => {
  const { user, isAuthenticated, updateProgress } = useAuth();
  const navigate = useNavigate();
  
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('basics');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Simulated lesson data - replace with API call
  const lessonData = {
    basics: [
      {
        id: 'basic-1',
        title: 'Hello & Goodbye',
        description: 'Learn basic greetings in ISL',
        difficulty: 'Beginner',
        duration: '5 min',
        videoUrl: '/videos/hello-goodbye.mp4',
        completed: false,
        category: 'basics'
      },
      {
        id: 'basic-2',
        title: 'Family Signs',
        description: 'Signs for family members',
        difficulty: 'Beginner',
        duration: '8 min',
        videoUrl: '/videos/family-signs.mp4',
        completed: false,
        category: 'basics'
      },
      {
        id: 'basic-3',
        title: 'Numbers 1-10',
        description: 'Learn to count in ISL',
        difficulty: 'Beginner',
        duration: '6 min',
        videoUrl: '/videos/numbers.mp4',
        completed: false,
        category: 'basics'
      }
    ],
    intermediate: [
      {
        id: 'inter-1',
        title: 'Everyday Conversations',
        description: 'Common conversation phrases',
        difficulty: 'Intermediate',
        duration: '12 min',
        videoUrl: '/videos/conversations.mp4',
        completed: false,
        category: 'intermediate'
      },
      {
        id: 'inter-2',
        title: 'Emotions & Feelings',
        description: 'Express emotions through signs',
        difficulty: 'Intermediate',
        duration: '10 min',
        videoUrl: '/videos/emotions.mp4',
        completed: false,
        category: 'intermediate'
      }
    ],
    advanced: [
      {
        id: 'adv-1',
        title: 'Complex Grammar',
        description: 'Advanced ISL grammar rules',
        difficulty: 'Advanced',
        duration: '15 min',
        videoUrl: '/videos/grammar.mp4',
        completed: false,
        category: 'advanced'
      }
    ]
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load lessons and user progress
    loadLessons();
  }, [isAuthenticated, navigate]);

  const loadLessons = () => {
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const allLessons = Object.values(lessonData).flat();
      
      // Mark completed lessons based on user progress
      if (user && user.completedLessons) {
        allLessons.forEach(lesson => {
          lesson.completed = user.completedLessons.includes(lesson.id);
        });
      }
      
      setLessons(allLessons);
      setIsLoading(false);
    }, 1000);
  };

  const filteredLessons = lessons.filter(lesson => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const startLesson = (lesson) => {
    setCurrentLesson(lesson);
  };

  const completeLesson = (lessonId) => {
    // Update lesson completion status
    setLessons(prev => prev.map(lesson => 
      lesson.id === lessonId ? { ...lesson, completed: true } : lesson
    ));
    
    // Update user progress
    const completedCount = lessons.filter(l => l.completed).length + 1;
    const progress = Math.round((completedCount / lessons.length) * 100);
    updateProgress(lessonId, progress);
    
    setCurrentLesson(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-500/20';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'Advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-xl">Loading your learning journey...</p>
        </div>
      </div>
    );
  }

  if (currentLesson) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto p-6">
          <button
            onClick={() => setCurrentLesson(null)}
            className="mb-6 flex items-center text-orange-400 hover:text-orange-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Lessons
          </button>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4">{currentLesson.title}</h1>
            <p className="text-gray-300 mb-6">{currentLesson.description}</p>
            
            {/* Video Player Placeholder */}
            <div className="bg-gray-800 rounded-lg aspect-video mb-6 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-gray-400">Video: {currentLesson.title}</p>
                <p className="text-sm text-gray-500">Duration: {currentLesson.duration}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => completeLesson(currentLesson.id)}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Mark as Complete
              </button>
              <button
                onClick={() => setCurrentLesson(null)}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Save Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Learn Indian Sign Language</h1>
          <p className="text-gray-300 text-lg">
            Master ISL through interactive lessons and practice exercises
          </p>
          
          {user && (
            <div className="mt-4 bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Your Progress</p>
                  <p className="text-2xl font-bold text-orange-400">{user.learningProgress}% Complete</p>
                </div>
                <div className="w-32 h-2 bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-300"
                    style={{ width: `${user.learningProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'basics', 'intermediate', 'advanced'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-3 rounded-lg font-semibold transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map(lesson => (
            <div
              key={lesson.id}
              className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors cursor-pointer border border-gray-700"
              onClick={() => startLesson(lesson)}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(lesson.difficulty)}`}>
                  {lesson.difficulty}
                </span>
                {lesson.completed && (
                  <div className="text-green-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
              <p className="text-gray-400 mb-4">{lesson.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Duration: {lesson.duration}</span>
                <span className="text-orange-400 font-semibold">
                  {lesson.completed ? 'Completed' : 'Start'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No lessons found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningModule;