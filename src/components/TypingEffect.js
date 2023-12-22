import React, { useState, useEffect } from 'react';
import '../styles/TypingEffect.css';

export const BlinkingCursor = () => <span className="blinking-cursor">|</span>;

export const TypingEffect = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <span>
      {displayedText}
      <BlinkingCursor />
    </span>
  );
};
