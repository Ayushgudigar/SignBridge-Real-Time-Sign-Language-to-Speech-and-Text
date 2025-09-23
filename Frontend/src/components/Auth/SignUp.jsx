import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    // Terms validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
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
      const result = await signup(formData.name, formData.email, formData.password);
      
      if (result.success) {
        // Success feedback
        console.log('Signup successful!');
        alert('Account created successfully! Please log in.');
        navigate("/login");
      } else {
        setErrors({ general: result.error || 'Signup failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-2 xs:px-3 xss:px-4 sm:px-6">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-3 xs:p-4 xss:p-6 sm:p-8 space-y-3 xs:space-y-4 xss:space-y-6 sm:space-y-8 border border-white/20 mx-1 xs:mx-2 xss:mx-4">
        <div className="text-center">
          <h2 className="text-lg xs:text-xl xss:text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-md">
            Create Account
          </h2>
          <p className="mt-1 xs:mt-2 text-xs text-gray-200">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-yellow-300 hover:text-yellow-200 transition-colors"
            >
              Sign in
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
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
            {errors.name && (
              <p className="text-red-300 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
            {errors.email && (
              <p className="text-red-300 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
            {errors.password && (
              <p className="text-red-300 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-300 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              id="agree-to-terms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="h-4 w-4 text-yellow-400 border-white/30 rounded focus:ring-yellow-300"
            />
            <label
              htmlFor="agree-to-terms"
              className="ml-2 block text-sm text-white"
            >
              I agree to the{" "}
              <a
                href="#"
                className="font-medium text-yellow-300 hover:text-yellow-200"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-300 text-xs mt-1">{errors.agreeToTerms}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full py-3 px-4 rounded-lg text-lg font-semibold text-white 
            bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg hover:shadow-2xl 
            hover:scale-105 transform transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? 'Creating Account...' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
