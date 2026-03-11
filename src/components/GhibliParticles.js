import React, { useEffect, useState } from 'react';
import '../styles/GhibliParticles.css';

const GhibliParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const codeChars = ['{', '}', '<', '>', '/', '(', ')', ';', '0', '1', '=', '+', '*', '#', '%', '&', '|', '~', '^', '$'];
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          emoji: codeChars[Math.floor(Math.random() * codeChars.length)],
          left: Math.random() * 100,
          delay: Math.random() * 25,
          duration: 12 + Math.random() * 18,
          size: 0.7 + Math.random() * 0.6
        });
      }
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  return (
    <div className="ghibli-particles">
      {particles.map(p => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}rem`
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};

export default GhibliParticles;
