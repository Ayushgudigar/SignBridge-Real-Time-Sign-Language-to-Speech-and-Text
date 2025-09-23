// Accessibility utilities and helpers
import { useEffect, useState } from 'react';

// Hook for managing focus trap in modals/dialogs
export const useFocusTrap = (isActive) => {
  useEffect(() => {
    if (!isActive) return;

    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);
};

// Hook for keyboard navigation
export const useKeyboardNavigation = (onEnter, onEscape, deps = []) => {
  useEffect(() => {
    const handleKeydown = (e) => {
      switch (e.key) {
        case 'Enter':
          if (onEnter) onEnter(e);
          break;
        case 'Escape':
          if (onEscape) onEscape(e);
          break;
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, deps);
};

// Hook for managing screen reader announcements
export const useScreenReader = () => {
  const [announcement, setAnnouncement] = useState('');

  const announce = (message, priority = 'polite') => {
    setAnnouncement(''); // Clear first to ensure re-announcement
    setTimeout(() => setAnnouncement(message), 100);
  };

  const AnnouncementComponent = () => (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );

  return { announce, AnnouncementComponent };
};

// Hook for reduced motion preferences
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Hook for high contrast preferences
export const useHighContrast = () => {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setPrefersHighContrast(mediaQuery.matches);

    const handleChange = (e) => setPrefersHighContrast(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersHighContrast;
};

// Utility to generate ARIA attributes for form validation
export const getValidationAria = (error, fieldId) => {
  if (!error) return {};
  
  return {
    'aria-invalid': 'true',
    'aria-describedby': `${fieldId}-error`
  };
};

// Utility for skip links
export const SkipLink = ({ href, children }) => (
  <a
    href={href}
    className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-orange-500 text-white px-4 py-2 z-50 focus:z-50"
  >
    {children}
  </a>
);

// Focus management utility
export const manageFocus = {
  // Save current focus
  save: () => {
    manageFocus._previousFocus = document.activeElement;
  },
  
  // Restore previously saved focus
  restore: () => {
    if (manageFocus._previousFocus && manageFocus._previousFocus.focus) {
      manageFocus._previousFocus.focus();
    }
  },
  
  // Focus first focusable element in container
  first: (container) => {
    const focusable = container.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) focusable.focus();
  }
};

// ARIA live region component
export const LiveRegion = ({ 
  message, 
  level = 'polite', 
  atomic = true,
  className = "sr-only" 
}) => (
  <div
    aria-live={level}
    aria-atomic={atomic}
    className={className}
  >
    {message}
  </div>
);

// Enhanced button component with accessibility features
export const AccessibleButton = ({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  className = "",
  variant = "primary",
  size = "medium",
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
    outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus:ring-orange-500"
  };

  const sizeClasses = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-3 text-base",
    large: "px-6 py-4 text-lg"
  };

  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed" 
    : "cursor-pointer";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Enhanced input component with accessibility features
export const AccessibleInput = ({
  label,
  error,
  id,
  required = false,
  description,
  className = "",
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;
  const descriptionId = `${inputId}-description`;

  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-300"
      >
        {label}
        {required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
      </label>
      
      {description && (
        <p id={descriptionId} className="text-sm text-gray-400">
          {description}
        </p>
      )}
      
      <input
        id={inputId}
        aria-describedby={`${description ? descriptionId : ''} ${error ? errorId : ''}`.trim()}
        aria-invalid={error ? 'true' : 'false'}
        className={`w-full px-4 py-3 bg-gray-900 border ${
          error ? 'border-red-500' : 'border-gray-700'
        } rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400`}
        {...props}
      />
      
      {error && (
        <p id={errorId} className="text-red-400 text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

// Color contrast checker utility
export const checkContrast = (foreground, background) => {
  // Simplified contrast calculation
  const getLuminance = (hex) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  return {
    ratio,
    AA: ratio >= 4.5,
    AAA: ratio >= 7
  };
};

export default {
  useFocusTrap,
  useKeyboardNavigation,
  useScreenReader,
  useReducedMotion,
  useHighContrast,
  getValidationAria,
  SkipLink,
  manageFocus,
  LiveRegion,
  AccessibleButton,
  AccessibleInput,
  checkContrast
};