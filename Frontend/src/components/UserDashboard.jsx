import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    streakDays: 0,
    totalTime: 0,
    achievements: []
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    loadUserStats();
    loadRecentActivity();
  }, [isAuthenticated, navigate, user]);

  const loadUserStats = () => {
    // Simulate loading user statistics
    const mockStats = {
      totalLessons: 75,
      completedLessons: user?.completedLessons?.length || 0,
      streakDays: 7,
      totalTime: 240, // minutes
      achievements: [
        { id: 1, title: 'First Steps', description: 'Completed your first lesson', icon: '🎯', earned: true },
        { id: 2, title: 'Week Warrior', description: 'Studied for 7 consecutive days', icon: '🔥', earned: true },
        { id: 3, title: 'Sign Master', description: 'Completed 10 lessons', icon: '🏆', earned: user?.completedLessons?.length >= 10 },
        { id: 4, title: 'Dedication', description: 'Studied for 30 days', icon: '💪', earned: false }
      ]
    };
    setStats(mockStats);
  };

  const loadRecentActivity = () => {
    // Simulate recent activity data
    const mockActivity = [
      { id: 1, type: 'lesson', title: 'Numbers 1-10', date: '2 hours ago', completed: true },
      { id: 2, type: 'practice', title: 'Family Signs Practice', date: '1 day ago', completed: true },
      { id: 3, type: 'lesson', title: 'Hello & Goodbye', date: '2 days ago', completed: true },
      { id: 4, type: 'achievement', title: 'Week Warrior Achievement', date: '3 days ago', completed: true }
    ];
    setRecentActivity(mockActivity);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getProgressPercentage = () => {
    return stats.totalLessons > 0 ? Math.round((stats.completedLessons / stats.totalLessons) * 100) : 0;
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'lesson': return '📚';
      case 'practice': return '💡';
      case 'achievement': return '🏆';
      default: return '📝';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-xl">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-gray-400">Continue your ISL learning journey</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-300">Progress</h3>
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-3xl font-bold text-orange-400 mb-2">{getProgressPercentage()}%</div>
            <p className="text-sm text-gray-400">{stats.completedLessons} of {stats.totalLessons} lessons</p>
            <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-300">Streak</h3>
              <span className="text-2xl">🔥</span>
            </div>
            <div className="text-3xl font-bold text-orange-400 mb-2">{stats.streakDays}</div>
            <p className="text-sm text-gray-400">days in a row</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-300">Study Time</h3>
              <span className="text-2xl">⏱️</span>
            </div>
            <div className="text-3xl font-bold text-orange-400 mb-2">{formatTime(stats.totalTime)}</div>
            <p className="text-sm text-gray-400">total study time</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-300">Achievements</h3>
              <span className="text-2xl">🏆</span>
            </div>
            <div className="text-3xl font-bold text-orange-400 mb-2">
              {stats.achievements.filter(a => a.earned).length}
            </div>
            <p className="text-sm text-gray-400">badges earned</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-center p-4 bg-gray-800 rounded-lg">
                    <span className="text-2xl mr-4">{getActivityIcon(activity.type)}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold">{activity.title}</h3>
                      <p className="text-sm text-gray-400">{activity.date}</p>
                    </div>
                    {activity.completed && (
                      <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/learn')}
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Continue Learning
              </button>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Achievements</h2>
              <div className="space-y-4">
                {stats.achievements.map(achievement => (
                  <div 
                    key={achievement.id} 
                    className={`p-4 rounded-lg border ${
                      achievement.earned 
                        ? 'bg-orange-500/20 border-orange-500/50' 
                        : 'bg-gray-800 border-gray-700'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{achievement.icon}</span>
                      <h3 className={`font-semibold ${achievement.earned ? 'text-orange-400' : 'text-gray-400'}`}>
                        {achievement.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-900 rounded-lg p-6 mt-6">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/learn')}
                  className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center"
                >
                  <span className="text-xl mr-3">📚</span>
                  <span>Start Learning</span>
                </button>
                <button
                  onClick={() => navigate('/resources')}
                  className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center"
                >
                  <span className="text-xl mr-3">📖</span>
                  <span>Browse Resources</span>
                </button>
                <button
                  onClick={() => navigate('/community')}
                  className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center"
                >
                  <span className="text-xl mr-3">👥</span>
                  <span>Join Community</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;