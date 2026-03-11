import React, { useState, useEffect, forwardRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { IconComponent } from '../utils/iconMap';
import '../styles/Projects.css';

const Projects = forwardRef(({ projects, externalSelectedProject, clearExternalProject }, outerRef) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Quando um projeto é selecionado externamente (vindo do Skills)
  useEffect(() => {
    if (externalSelectedProject) {
      setTimeout(() => {
        setSelectedProject(externalSelectedProject);
        clearExternalProject();
      }, 600);
    }
  }, [externalSelectedProject, clearExternalProject]);

  const filters = [
    { key: 'all', label: 'Todos', icon: '◉' },
    { key: 'fullstack', label: 'Fullstack', icon: '◈' },
    { key: 'frontend', label: 'Frontend', icon: '◧' },
    { key: 'backend', label: 'Backend', icon: '⬡' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="projects" ref={(node) => {
      ref(node);
      if (outerRef) outerRef.current = node;
    }}>
      <div className={`section-container ${inView ? 'animate-in' : ''}`}>
        <div className="section-header">
          <span className="section-icon">{'</>'}</span>
          <h2 className="section-title">Projetos</h2>
          <p className="section-subtitle">// git log --oneline --graph</p>
          <div className="title-decoration">
            <span className="deco-leaf">{'<'}</span>
            <div className="decoration-line"></div>
            <span className="deco-leaf">{'/>'}</span>
          </div>
        </div>

        <div className="project-filters">
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              <span>{f.icon}</span> {f.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedProject(project)}
            >
              {project.featured && <span className="featured-badge">★ Destaque</span>}
              {project.inProgress && <span className="in-progress-badge">🚧 Em construção</span>}
              <div className="project-image">
                {project.coverImage ? (
                  <img src={project.coverImage} alt={project.title} className="project-cover-img" />
                ) : (
                  <span className="project-emoji"><IconComponent name={project.image} size={48} /></span>
                )}
                <div className="project-overlay">
                  <span>Ver Detalhes →</span>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech-tags">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tech-tag more">+{project.technologies.length - 4}</span>
                  )}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="project-link" onClick={e => e.stopPropagation()}>
                      GitHub ↗
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="project-link live" onClick={e => e.stopPropagation()}>
                      Demo ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>✕</button>
            <div className="modal-header">
              {selectedProject.coverImage ? (
                <img src={selectedProject.coverImage} alt={selectedProject.title} className="modal-cover-img" />
              ) : (
                <span className="modal-emoji"><IconComponent name={selectedProject.image} size={52} /></span>
              )}
              <h2>{selectedProject.title}</h2>
              {selectedProject.featured && <span className="modal-badge">★ Projeto Destaque</span>}
              {selectedProject.inProgress && <span className="modal-badge in-progress">🚧 Em construção</span>}
            </div>
            <div className="modal-body">
              <p className="modal-description">{selectedProject.longDescription}</p>
              <div className="modal-techs">
                <h4>Tecnologias Utilizadas</h4>
                <div className="modal-tech-tags">
                  {selectedProject.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="modal-links">
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Ver Código no GitHub ↗
                  </a>
                )}
                {selectedProject.live && (
                  <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    Ver Demo ao Vivo ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default Projects;
