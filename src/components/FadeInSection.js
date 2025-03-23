import React, { useState, useEffect, useRef } from 'react';
import '../styles/Global.css';

const FadeInSection = ({ children, direction = 'up', delay = 0, threshold = 0.3 }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // Only run the animation when element comes into view
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.unobserve(domRef.current); // Stop observing once animation is triggered
      }
    }, { threshold });

    const currentRef = domRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  // Determine animation class based on direction
  const getAnimationClass = () => {
    switch (direction) {
      case 'left':
        return 'fade-in-left';
      case 'right':
        return 'fade-in-right';
      case 'down':
        return 'fade-in-down';
      case 'up':
      default:
        return 'fade-in-up';
    }
  };

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${getAnimationClass()}`}
      style={{ 
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
