import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      
      // Simulate API call - replace with actual API endpoint
      const response = await simulateApiCall('/api/auth/login', {
        email,
        password
      });

      if (response.success) {
        const userData = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          avatar: response.user.avatar || null,
          learningProgress: response.user.learningProgress || 0,
          completedLessons: response.user.completedLessons || []
        };

        setUser(userData);
        setIsAuthenticated(true);
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', response.token);
        
        return { success: true, user: userData };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    try {
      setIsLoading(true);
      
      // Simulate API call - replace with actual API endpoint
      const response = await simulateApiCall('/api/auth/signup', {
        name,
        email,
        password
      });

      if (response.success) {
        return { success: true, message: 'Account created successfully!' };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Signup failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  const updateProgress = (lessonId, progress) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      learningProgress: Math.max(user.learningProgress, progress),
      completedLessons: user.completedLessons.includes(lessonId) 
        ? user.completedLessons 
        : [...user.completedLessons, lessonId]
    };

    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Simulated API call function - replace with actual API calls
const simulateApiCall = (endpoint, data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (endpoint === '/api/auth/login') {
        // Simulate successful login for demo purposes
        if (data.email && data.password) {
          resolve({
            success: true,
            user: {
              id: 1,
              name: 'Demo User',
              email: data.email,
              avatar: null,
              learningProgress: 25,
              completedLessons: ['lesson1', 'lesson2']
            },
            token: 'demo-jwt-token-' + Date.now()
          });
        } else {
          resolve({
            success: false,
            error: 'Invalid credentials'
          });
        }
      } else if (endpoint === '/api/auth/signup') {
        // Simulate successful signup
        if (data.name && data.email && data.password) {
          resolve({
            success: true,
            message: 'Account created successfully!'
          });
        } else {
          resolve({
            success: false,
            error: 'Missing required fields'
          });
        }
      }
    }, 1000); // Simulate network delay
  });
};

export default AuthContext;