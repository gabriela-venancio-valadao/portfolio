import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../styles/Experience.css';

const Experience = ({ experience }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className={`section-container ${inView ? 'animate-in' : ''}`}>
        <div className="section-header">
          <span className="section-icon">{'⟫'}</span>
          <h2 className="section-title">Experiência</h2>
          <p className="section-subtitle">// career.timeline()</p>
          <div className="title-decoration">
            <span className="deco-leaf">{'<'}</span>
            <div className="decoration-line"></div>
            <span className="deco-leaf">{'/>'}</span>
          </div>
        </div>

        <div className="timeline">
          {experience.map((exp, index) => (
            <div
              key={exp.id}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="timeline-connector">
                <div className="timeline-dot">
                  <span>{index === 0 ? '●' : '○'}</span>
                </div>
                <div className="timeline-line"></div>
              </div>
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <span className="timeline-period">{exp.period}</span>
                  {exp.consultant && (
                    <span className="timeline-consultant-badge">
                      🏢 Consultora · <span className="accenture-tag">Accenture</span>
                    </span>
                  )}
                  <h3 className="timeline-role">{exp.role}</h3>
                  {exp.client && (
                    <p className="timeline-client">
                      <span className="timeline-client-name">{exp.client}</span>
                      {exp.clientLabel && <span className="timeline-client-label"> · {exp.clientLabel}</span>}
                    </p>
                  )}
                </div>
                <p className="timeline-description">{exp.description}</p>
                <div className="timeline-techs">
                  {exp.technologies.map(tech => (
                    <span key={tech} className="timeline-tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
