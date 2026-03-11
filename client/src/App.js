import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import TerminalProjects from './components/TerminalProjects';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GhibliParticles from './components/GhibliParticles';
import Loader from './components/Loader';

// JSON data imports
import profileData from './data/profile.json';
import skillsData from './data/skills.json';
import projectsData from './data/projects.json';
import experienceData from './data/experience.json';
import testimonialsData from './data/testimonials.json';
import statsData from './data/stats.json';

import './styles/App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedProjectFromSkill, setSelectedProjectFromSkill] = useState(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    // Simula loading screen
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Aplica/remove classe no document para o tema
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Navega para projetos e abre o modal do projeto selecionado
  const handleNavigateToProject = (project) => {
    setSelectedProjectFromSkill(project);
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <GhibliParticles />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero profile={profileData} stats={statsData} />
        <About profile={profileData} />
        <Skills
          skills={skillsData}
          projects={projectsData}
          onNavigateToProject={handleNavigateToProject}
        />
        <Projects
          projects={projectsData}
          ref={projectsRef}
          externalSelectedProject={selectedProjectFromSkill}
          clearExternalProject={() => setSelectedProjectFromSkill(null)}
        />
        <TerminalProjects projects={projectsData} />
        <Experience experience={experienceData} />
        <Testimonials testimonials={testimonialsData} />
        <Contact />
      </main>
      <Footer profile={profileData} />

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/5511946111227"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.2l6.074-1.95a15.9 15.9 0 008.876 2.678C24.826 31.928 32 24.752 32 16.004 32 7.176 24.826 0 16.004 0zm9.31 22.606c-.39 1.1-2.274 2.038-3.14 2.148-.866.11-1.67.39-5.618-1.17-4.756-1.878-7.768-6.758-8.004-7.07-.234-.314-1.912-2.546-1.912-4.858 0-2.312 1.21-3.45 1.638-3.922.39-.43.896-.586 1.17-.586.35 0 .586.006.858.016.274.01.642-.104.996.762.39.898 1.326 3.234 1.442 3.468.116.234.194.508.04.82-.156.312-.234.508-.468.782-.234.274-.494.612-.704.82-.234.234-.478.488-.206.958.274.468 1.22 2.014 2.618 3.262 1.794 1.6 3.31 2.096 3.778 2.33.468.234.742.196 1.016-.118.274-.312 1.17-1.366 1.482-1.834.312-.468.624-.39 1.054-.234.43.156 2.734 1.29 3.202 1.526.468.234.78.352.898.546.116.196.116 1.132-.274 2.232z"/>
        </svg>
      </a>
    </div>
  );
}

export default App;
