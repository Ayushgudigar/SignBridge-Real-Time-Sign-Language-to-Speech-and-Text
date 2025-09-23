import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-3 bg-white rounded-full pointer-events-none z-50"
      animate={{ x: mousePosition.x - 10, y: mousePosition.y - 10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 2.5 }}
    />
  );
};

export default MouseFollower;
