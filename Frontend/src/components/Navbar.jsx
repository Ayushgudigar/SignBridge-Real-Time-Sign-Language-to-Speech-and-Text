import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HoverCard from '../utils/Hovercard';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const handleStartLearning = () => {
    if (isAuthenticated) {
      navigate('/learn');
    } else {
      navigate('/signup');
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-black via-gray-900 to-black shadow-lg z-50 border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        <div className="text-white font-bold text-xl">ISL India</div>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-300 font-semibold">
          <li className="cursor-pointer px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" onClick={() => navigate('/home')}>Home</li>
          <li className="cursor-pointer px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" onClick={() => navigate('/learn')}>Learn</li>
          <li className="cursor-pointer px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" onClick={() => navigate('/community')} >Community</li>
          <li className="cursor-pointer px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" onClick={() => navigate('/resources')}>Resources</li>
          <li className="cursor-pointer px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" onClick={() => navigate('/about')} >About</li>
        </ul>
        {/* Desktop Buttons */}
        <div className="hidden md:flex space-x-4 items-center">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-gray-300 hover:text-orange-500 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <span>{user?.name}</span>
                <svg className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <button
                      onClick={() => { navigate('/dashboard'); setShowUserMenu(false); }}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:text-orange-500 hover:bg-gray-800 transition-colors"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => { navigate('/learn'); setShowUserMenu(false); }}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:text-orange-500 hover:bg-gray-800 transition-colors"
                    >
                      Continue Learning
                    </button>
                    <hr className="border-gray-700 my-2" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-800 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="text-gray-300 px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" onClick={() => navigate('/login')}>
                Login
              </button>
              <button className="text-gray-300 px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" onClick={() => navigate('/signup')}>
                Signup
              </button>
            </>
          )}
          <HoverCard>
            <button 
              onClick={handleStartLearning}
              className="transition-transform transition-[border-radius] duration-600 ease-[cubic-bezier(0.4, 0, 0.2, 1)] hover:rounded-full overflow-hidden bg-gradient-to-r from-orange-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:scale-90 transition"
            >
              {isAuthenticated ? 'Continue Learning' : 'Start Learning'}
            </button>
          </HoverCard>
        </div>
        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-90">
          <ul className="flex flex-col space-y-4 px-4 py-4 text-gray-300 font-semibold">
            <li className="cursor-pointer px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" onClick={() => { navigate('/home'); setIsOpen(false); }}>Home</li>
            <li className="cursor-pointer px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" onClick={() => { navigate('/learn'); setIsOpen(false); }}>Learn</li>
            <li className="cursor-pointer px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" onClick={() => { navigate('/community'); setIsOpen(false); }}>Community</li>
            <li className="cursor-pointer px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" onClick={() => { navigate('/resources'); setIsOpen(false); }}>Resources</li>
            <li className="cursor-pointer px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" onClick={() => { navigate('/about'); setIsOpen(false); }}>About</li>
          </ul>
          <div className="flex flex-col space-y-4 px-4 pb-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 px-4 py-2 bg-gray-800 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="text-gray-300">{user?.name}</span>
                </div>
                <button 
                  className="text-gray-300 px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" 
                  onClick={() => { navigate('/dashboard'); setIsOpen(false); }}
                >
                  Dashboard
                </button>
                <button 
                  className="text-gray-300 px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" 
                  onClick={() => { navigate('/learn'); setIsOpen(false); }}
                >
                  Continue Learning
                </button>
                <button 
                  className="text-gray-300 px-4 py-2 rounded-lg hover:text-red-400 transition-all duration-300" 
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="text-gray-300 px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" onClick={() => { navigate('/login'); setIsOpen(false); }}>
                  Login
                </button>
                <button className="text-gray-300 px-4 py-2 rounded-lg hover:text-orange-500 transition-all duration-300" onClick={() => { navigate('/signup'); setIsOpen(false); }}>
                  Signup
                </button>
              </>
            )}
            <HoverCard>
              <button 
                onClick={handleStartLearning}
                className="transition-transform transition-[border-radius] duration-600 ease-[cubic-bezier(0.4, 0, 0.2, 1)] hover:rounded-full overflow-hidden bg-gradient-to-r from-orange-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:scale-90 transition"
              >
                {isAuthenticated ? 'Continue Learning' : 'Start Learning'}
              </button>
            </HoverCard>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
