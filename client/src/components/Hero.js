import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../styles/Hero.css';

const Hero = ({ profile, stats }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!profile) return null;

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero-sky">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>

      <div className={`hero-content ${inView ? 'animate-in' : ''}`}>
        <div className="hero-avatar">
          <div className="avatar-ring">
            <div className="avatar-inner">
              <span className="avatar-initials">GV</span>
            </div>
          </div>
        </div>

        <div className="hero-text">
          <p className="hero-greeting">console.log("Olá, eu sou")</p>
          <h1 className="hero-name">{profile.name}</h1>
          <h2 className="hero-title">
            <span className="title-bracket">{'< '}</span>
            {profile.title}
            <span className="title-bracket">{' />'}</span>
          </h2>
          <p className="hero-subtitle">{profile.subtitle}</p>

          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Ver Projetos →
            </a>
            <a href="#contact" className="btn btn-secondary" onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Fale Comigo
            </a>
          </div>
        </div>

        {stats && (
          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-number">{stats.yearsExperience}+</span>
              <span className="stat-label">Anos de Experiência</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.projectsCompleted}+</span>
              <span className="stat-label">Projetos Entregues</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.happyClients}+</span>
              <span className="stat-label">Clientes Satisfeitos</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">{stats.coffeesDrunk.toLocaleString()}</span>
              <span className="stat-label">Cafés Tomados</span>
            </div>
          </div>
        )}
      </div>

      <div className="hero-landscape">
        <div className="hill hill-back"></div>
        <div className="hill hill-mid"></div>
        <div className="hill hill-front"></div>
      </div>

      <div className="scroll-indicator">
        <span className="scroll-text">Scroll para explorar</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
};

export default Hero;
