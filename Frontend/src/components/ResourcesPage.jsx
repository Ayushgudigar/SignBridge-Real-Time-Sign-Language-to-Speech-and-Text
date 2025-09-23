import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ResourcesPage = () => {
  const { isAuthenticated } = useAuth();
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock resources data - replace with API call
  const mockResources = [
    {
      id: 1,
      title: 'ISL Dictionary - Basic Signs',
      description: 'Comprehensive dictionary of basic Indian Sign Language signs with video demonstrations.',
      category: 'dictionary',
      difficulty: 'beginner',
      type: 'video',
      url: '/resources/basic-dictionary',
      thumbnail: '/images/basic-signs.jpg',
      duration: '45 min',
      downloads: 1250,
      rating: 4.8,
      tags: ['basics', 'dictionary', 'beginner-friendly']
    },
    {
      id: 2,
      title: 'ISL Grammar Rules Guide',
      description: 'Complete guide to Indian Sign Language grammar structure and sentence formation.',
      category: 'grammar',
      difficulty: 'intermediate',
      type: 'pdf',
      url: '/resources/grammar-guide.pdf',
      thumbnail: '/images/grammar-guide.jpg',
      duration: '30 min read',
      downloads: 980,
      rating: 4.6,
      tags: ['grammar', 'structure', 'intermediate']
    },
    {
      id: 3,
      title: 'Practice Exercises - Family Signs',
      description: 'Interactive practice exercises for learning family-related signs in ISL.',
      category: 'practice',
      difficulty: 'beginner',
      type: 'interactive',
      url: '/resources/family-practice',
      thumbnail: '/images/family-signs.jpg',
      duration: '20 min',
      downloads: 1500,
      rating: 4.9,
      tags: ['family', 'practice', 'interactive']
    },
    {
      id: 4,
      title: 'Advanced Conversation Patterns',
      description: 'Learn advanced conversation patterns and complex sentence structures in ISL.',
      category: 'conversation',
      difficulty: 'advanced',
      type: 'video',
      url: '/resources/advanced-conversations',
      thumbnail: '/images/advanced-conv.jpg',
      duration: '60 min',
      downloads: 750,
      rating: 4.7,
      tags: ['conversation', 'advanced', 'patterns']
    },
    {
      id: 5,
      title: 'Regional ISL Variations',
      description: 'Understanding regional differences in Indian Sign Language across different states.',
      category: 'culture',
      difficulty: 'intermediate',
      type: 'article',
      url: '/resources/regional-variations',
      thumbnail: '/images/regional-isl.jpg',
      duration: '25 min read',
      downloads: 650,
      rating: 4.5,
      tags: ['regional', 'culture', 'variations']
    },
    {
      id: 6,
      title: 'ISL Fingerspelling Master Class',
      description: 'Master the art of fingerspelling in Indian Sign Language with detailed practice sessions.',
      category: 'fingerspelling',
      difficulty: 'beginner',
      type: 'video',
      url: '/resources/fingerspelling-master',
      thumbnail: '/images/fingerspelling.jpg',
      duration: '35 min',
      downloads: 1100,
      rating: 4.8,
      tags: ['fingerspelling', 'alphabet', 'fundamentals']
    }
  ];

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    filterResources();
  }, [searchTerm, selectedCategory, selectedDifficulty, resources]);

  const loadResources = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResources(mockResources);
      setIsLoading(false);
    }, 1000);
  };

  const filterResources = () => {
    let filtered = resources;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(resource => resource.difficulty === selectedDifficulty);
    }

    setFilteredResources(filtered);
  };

  const handleResourceClick = (resource) => {
    // Simulate resource access
    console.log('Accessing resource:', resource.title);
    // In a real app, you might open a modal, navigate to the resource, or start a download
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'video': return '🎬';
      case 'pdf': return '📄';
      case 'interactive': return '🎮';
      case 'article': return '📖';
      default: return '📚';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-500/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'dictionary', label: 'Dictionary' },
    { value: 'grammar', label: 'Grammar' },
    { value: 'practice', label: 'Practice' },
    { value: 'conversation', label: 'Conversation' },
    { value: 'culture', label: 'Culture' },
    { value: 'fingerspelling', label: 'Fingerspelling' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-xl">Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
          <p className="text-gray-300 text-lg">
            Discover comprehensive resources to enhance your ISL learning journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-orange-400 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty Level</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-orange-400 focus:outline-none"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredResources.length} of {resources.length} resources
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <div
              key={resource.id}
              onClick={() => handleResourceClick(resource)}
              className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors cursor-pointer border border-gray-700 hover:border-orange-500/50"
            >
              {/* Resource Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-sm">{resource.rating}</span>
                </div>
              </div>

              {/* Resource Content */}
              <h3 className="text-xl font-bold mb-2 line-clamp-2">{resource.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-3">{resource.description}</p>

              {/* Resource Meta */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{resource.duration}</span>
                <span>{resource.downloads} downloads</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleResourceClick(resource);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                {resource.type === 'pdf' ? 'Download' : 'Access Resource'}
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No resources found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search criteria or browse all available categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 border border-orange-500/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">📚 Complete ISL Course</h3>
              <p className="text-gray-300 mb-4">
                Comprehensive course covering all aspects of Indian Sign Language from basics to advanced levels.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-semibold transition-colors">
                Start Course
              </button>
            </div>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">🎯 Practice Hub</h3>
              <p className="text-gray-300 mb-4">
                Interactive practice sessions with real-time feedback to improve your signing skills.
              </p>
              <button className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg font-semibold transition-colors">
                Start Practicing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;