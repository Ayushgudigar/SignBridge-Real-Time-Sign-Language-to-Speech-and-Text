import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const validate = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Store remember me preference
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        // Success feedback
        console.log('Login successful!', result.user);
        navigate('/home');
      } else {
        setErrors({ general: result.error || 'Login failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-2 xs:px-3 xss:px-4 sm:px-6">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-3 xs:p-4 xss:p-6 sm:p-8 space-y-3 xs:space-y-4 xss:space-y-6 sm:space-y-8 border border-white/20 mx-1 xs:mx-2 xss:mx-4">
        <div className="text-center">
          <h2 className="text-lg xs:text-xl xss:text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
            Welcome Back
          </h2>
          <p className="mt-1 xs:mt-2 text-xs text-gray-200">
            New here?{" "}
            <Link
              to="/signup"
              className="font-semibold text-yellow-300 hover:text-yellow-200 transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* General Error */}
          {errors.general && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm">
              {errors.general}
            </div>
          )}
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
            {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
            {errors.password && <p className="text-red-300 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-white">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-yellow-400 border-white/30 rounded focus:ring-yellow-300"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="text-yellow-300 hover:text-yellow-200">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full py-3 px-4 rounded-lg text-lg font-semibold text-white 
            bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg hover:shadow-2xl 
            hover:scale-105 transform transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
