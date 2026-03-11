import React from 'react';
import { useInView } from 'react-intersection-observer';
import { IconComponent } from '../utils/iconMap';
import '../styles/Education.css';

const Education = ({ education }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!education) return null;

  const { formations, certifications } = education;

  return (
    <section id="education" className="education" ref={ref}>
      <div className={`section-container ${inView ? 'animate-in' : ''}`}>
        <div className="section-header">
          <span className="section-icon">🎓</span>
          <h2 className="section-title">Formação</h2>
          <p className="section-subtitle">// education.load()</p>
          <div className="title-decoration">
            <span className="deco-leaf">{'<'}</span>
            <div className="decoration-line"></div>
            <span className="deco-leaf">{'/>'}</span>
          </div>
        </div>

        <div className="education-grid">
          {formations.map((item) => (
            <div key={item.id} className={`education-card ${item.status === 'inProgress' ? 'in-progress' : ''}`}>
              <div className="education-card-top">
                <span className="education-icon"><IconComponent name={item.icon} size={32} /></span>
                <div className="education-status-badge">
                  {item.status === 'inProgress' ? (
                    <span className="badge-in-progress">🚧 Em andamento</span>
                  ) : (
                    <span className="badge-completed">✔ Concluído</span>
                  )}
                </div>
              </div>
              <h3 className="education-degree">{item.degree}</h3>
              <p className="education-institution">{item.institution}</p>
              <p className="education-period">{item.period}</p>
              <p className="education-description">{item.description}</p>
            </div>
          ))}
        </div>

        {certifications && certifications.length > 0 && (
          <>
            <h3 className="certifications-title">// certifications</h3>
            <div className="certifications-grid">
              {certifications.map((cert) => (
                <div key={cert.id} className="cert-card">
                  <span className="cert-icon"><IconComponent name={cert.icon} size={26} /></span>
                  <div className="cert-info">
                    <p className="cert-name">{cert.name}</p>
                    <p className="cert-issuer">{cert.issuer} · {cert.year}</p>
                  </div>
                  {cert.period && (
                    <span className="badge-in-progress">🚧 {cert.period}</span>
                  )}
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-link">↗</a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Education;
