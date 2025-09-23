/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'xss': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1600px',
        // Custom breakpoints for better tablet coverage
        'tablet': '768px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
      fontSize: {
        '2xs': '0.625rem', // 10px
        'xs': '0.75rem',   // 12px
        'sm': '0.875rem',  // 14px
        'base': '1rem',    // 16px
        'lg': '1.125rem',  // 18px
        'xl': '1.25rem',   // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
        '5xl': '3rem',     // 48px
        '6xl': '3.75rem',  // 60px
        '7xl': '4.5rem',   // 72px
        '8xl': '6rem',     // 96px
        '9xl': '8rem',     // 128px
        // Responsive typography scale
        'fluid-xs': 'clamp(0.75rem, 2vw, 1rem)',
        'fluid-sm': 'clamp(0.875rem, 2.5vw, 1.125rem)',
        'fluid-base': 'clamp(1rem, 3vw, 1.25rem)',
        'fluid-lg': 'clamp(1.125rem, 3.5vw, 1.5rem)',
        'fluid-xl': 'clamp(1.25rem, 4vw, 1.875rem)',
        'fluid-2xl': 'clamp(1.5rem, 5vw, 2.25rem)',
        'fluid-3xl': 'clamp(1.875rem, 6vw, 3rem)',
        'fluid-4xl': 'clamp(2.25rem, 8vw, 4.5rem)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        // Fluid spacing
        'fluid-xs': 'clamp(0.5rem, 1vw, 0.75rem)',
        'fluid-sm': 'clamp(0.75rem, 1.5vw, 1rem)',
        'fluid-md': 'clamp(1rem, 2vw, 1.5rem)',
        'fluid-lg': 'clamp(1.5rem, 3vw, 2rem)',
        'fluid-xl': 'clamp(2rem, 4vw, 3rem)',
        'fluid-2xl': 'clamp(3rem, 6vw, 4rem)',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        // Responsive containers
        'container-xs': '20rem',
        'container-sm': '24rem',
        'container-md': '28rem',
        'container-lg': '32rem',
        'container-xl': '36rem',
        'container-2xl': '42rem',
        'container-3xl': '48rem',
        'container-4xl': '56rem',
        'container-5xl': '64rem',
        'container-6xl': '72rem',
        'container-7xl': '80rem',
        'container-full': '100%',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      // Touch targets and accessibility
      minHeight: {
        'touch': '44px',
        'touch-lg': '48px',
      },
      minWidth: {
        'touch': '44px',
        'touch-lg': '48px',
      },
      // Responsive border radius
      borderRadius: {
        'fluid-sm': 'clamp(0.25rem, 1vw, 0.5rem)',
        'fluid-md': 'clamp(0.5rem, 2vw, 0.75rem)',
        'fluid-lg': 'clamp(0.75rem, 3vw, 1rem)',
        'fluid-xl': 'clamp(1rem, 4vw, 1.5rem)',
      },
    },
  },
  plugins: [],
}
