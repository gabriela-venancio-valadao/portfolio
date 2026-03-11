import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../styles/About.css';

const About = ({ profile }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  if (!profile) return null;

  return (
    <section id="about" className="about" ref={ref}>
      <div className={`section-container ${inView ? 'animate-in' : ''}`}>
        <div className="section-header">
          <span className="section-icon">{'{ }'}</span>
          <h2 className="section-title">Sobre Mim</h2>
          <p className="section-subtitle">// whoami &amp;&amp; cat skills.txt</p>
          <div className="title-decoration">
            <span className="deco-leaf">{'<'}</span>
            <div className="decoration-line"></div>
            <span className="deco-leaf">{'/>'}</span>
          </div>
        </div>

        <div className="about-content">
          <div className="about-image-container">
            <div className="about-image-frame">
              <div className="about-avatar">
                <span className="avatar-text">{'</>'}</span>
              </div>
            </div>
          </div>

          <div className="about-text">
            <div className="about-card">
              <p className="about-bio">{profile.bio}</p>
              
              <div className="about-details">
                <div className="detail-item">
                  <span className="detail-icon">→</span>
                  <span className="detail-label">location:</span>
                  <span className="detail-value">{profile.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">→</span>
                  <span className="detail-label">role:</span>
                  <span className="detail-value">{profile.title}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">→</span>
                  <span className="detail-label">email:</span>
                  <span className="detail-value">{profile.email}</span>
                </div>
              </div>

              <div className="about-interests">
                <h3>passions</h3>
                <div className="interest-tags">
                  <span className="interest-tag">Arquitetura de Software</span>
                  <span className="interest-tag">UI/UX Design</span>
                  <span className="interest-tag">Apps Responsivos</span>
                  <span className="interest-tag">Segurança Web</span>
                  <span className="interest-tag">Performance</span>
                  <span className="interest-tag">Mentoria</span>
                  <span className="interest-tag">Aprendizado Contínuo</span>
                  <span className="interest-tag">Open Source</span>
                </div>
              </div>

              <div className="about-links">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link github">
                  <span>⌘</span> GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                  <span>⌥</span> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
