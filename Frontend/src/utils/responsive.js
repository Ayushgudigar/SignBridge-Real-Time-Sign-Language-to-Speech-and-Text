// Responsive utility functions and hooks
import { useState, useEffect } from 'react';

// Breakpoint definitions (matching Tailwind CSS)
export const breakpoints = {
  xs: 475,    // Extra small devices
  sm: 640,    // Small devices
  md: 768,    // Medium devices
  lg: 1024,   // Large devices
  xl: 1280,   // Extra large devices
  '2xl': 1536 // 2X Large devices
};

// Hook to get current screen size
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

// Hook to check if screen is at or above a certain breakpoint
export const useBreakpoint = (breakpoint) => {
  const { width } = useScreenSize();
  return width >= breakpoints[breakpoint];
};

// Hook to get current breakpoint
export const useCurrentBreakpoint = () => {
  const { width } = useScreenSize();
  
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  if (width >= breakpoints.xs) return 'xs';
  return 'xs';
};

// Mobile detection
export const useIsMobile = () => {
  return !useBreakpoint('md');
};

// Tablet detection
export const useIsTablet = () => {
  const { width } = useScreenSize();
  return width >= breakpoints.md && width < breakpoints.lg;
};

// Desktop detection
export const useIsDesktop = () => {
  return useBreakpoint('lg');
};

// Touch device detection
export const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouch;
};

// Safe area calculations for mobile devices
export const useSafeArea = () => {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateSafeArea = () => {
      const style = getComputedStyle(document.documentElement);
      setSafeArea({
        top: parseInt(style.getPropertyValue('--sat') || '0'),
        bottom: parseInt(style.getPropertyValue('--sab') || '0'),
        left: parseInt(style.getPropertyValue('--sal') || '0'),
        right: parseInt(style.getPropertyValue('--sar') || '0')
      });
    };

    updateSafeArea();
    window.addEventListener('resize', updateSafeArea);
    return () => window.removeEventListener('resize', updateSafeArea);
  }, []);

  return safeArea;
};

// Responsive class generator
export const getResponsiveClasses = (config) => {
  return Object.entries(config)
    .map(([breakpoint, classes]) => {
      if (breakpoint === 'base') return classes;
      return `${breakpoint}:${classes}`;
    })
    .join(' ');
};

// Container max-width helper
export const getContainerMaxWidth = (breakpoint) => {
  const maxWidths = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md', 
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl'
  };
  return maxWidths[breakpoint] || 'max-w-full';
};

// Mobile-first responsive text sizing
export const getResponsiveTextClasses = (sizes) => {
  const {
    xs = 'text-sm',
    sm = 'text-base',
    md = 'text-lg',
    lg = 'text-xl',
    xl = 'text-2xl'
  } = sizes;

  return `${xs} xs:${xs} sm:${sm} md:${md} lg:${lg} xl:${xl}`;
};

// Responsive spacing helper
export const getResponsiveSpacing = (spacing) => {
  const {
    xs = 'p-2',
    sm = 'p-4', 
    md = 'p-6',
    lg = 'p-8',
    xl = 'p-10'
  } = spacing;

  return `${xs} xs:${xs} sm:${sm} md:${md} lg:${lg} xl:${xl}`;
};

// Grid column responsiveness
export const getResponsiveGrid = (cols) => {
  const {
    xs = 1,
    sm = 1,
    md = 2,
    lg = 3,
    xl = 4
  } = cols;

  return `grid-cols-${xs} xs:grid-cols-${xs} sm:grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} xl:grid-cols-${xl}`;
};

export default {
  useScreenSize,
  useBreakpoint,
  useCurrentBreakpoint,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsTouchDevice,
  useSafeArea,
  getResponsiveClasses,
  getContainerMaxWidth,
  getResponsiveTextClasses,
  getResponsiveSpacing,
  getResponsiveGrid,
  breakpoints
};