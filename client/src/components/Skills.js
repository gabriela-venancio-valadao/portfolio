import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { IconComponent } from '../utils/iconMap';
import '../styles/Skills.css';

const Skills = ({ skills, projects, onNavigateToProject }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories = [
    { key: 'all', label: 'Todas', icon: '◉' },
    { key: 'frontend', label: 'Frontend', icon: '◧' },
    { key: 'backend', label: 'Backend', icon: '⬡' },
    { key: 'database', label: 'Database', icon: '⬢' },
    { key: 'devops', label: 'DevOps', icon: '⎔' }
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const getRelatedProjects = (skillName) => {
    if (!projects) return [];
    return projects.filter(p =>
      p.technologies.some(tech =>
        tech.toLowerCase() === skillName.toLowerCase()
      )
    );
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  const handleProjectClick = (project) => {
    setSelectedSkill(null);
    onNavigateToProject(project);
  };

  const getCategoryLabel = (cat) => {
    const labels = { frontend: 'Frontend', backend: 'Backend', database: 'Database', devops: 'DevOps' };
    return labels[cat] || cat;
  };

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className={`section-container ${inView ? 'animate-in' : ''}`}>
        <div className="section-header">
          <span className="section-icon">{'⚡'}</span>
          <h2 className="section-title">Habilidades & Tecnologias</h2>
          <p className="section-subtitle">// skills.load()</p>
          <div className="title-decoration">
            <span className="deco-leaf">{'<'}</span>
            <div className="decoration-line"></div>
            <span className="deco-leaf">{'/>'}</span>
          </div>
        </div>

        <div className="skills-categories">
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`category-btn ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              <span className="cat-icon">{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filteredSkills.map((skill, index) => {
            const relatedCount = getRelatedProjects(skill.name).length;
            return (
              <div
                key={skill.name}
                className="skill-card"
                style={{ animationDelay: `${index * 0.06}s` }}
                onClick={() => handleSkillClick(skill)}
                role="button"
                tabIndex={0}
              >
                <div className="skill-content">
                  <span className="skill-icon"><IconComponent name={skill.icon} size={24} /></span>
                  <div className="skill-info">
                    <h3 className="skill-name">{skill.name}</h3>
                    <span className="skill-category-tag">{getCategoryLabel(skill.category)}</span>
                  </div>
                </div>
                <div className="skill-footer">
                  <span className="skill-projects-count">
                    {relatedCount} {relatedCount === 1 ? 'projeto' : 'projetos'}
                  </span>
                  <span className="skill-arrow">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedSkill && (
        <div className="skill-modal-overlay" onClick={() => setSelectedSkill(null)}>
          <div className="skill-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedSkill(null)}>✕</button>
            <div className="skill-modal-header">
              <span className="modal-skill-icon"><IconComponent name={selectedSkill.icon} size={36} /></span>
              <div>
                <h2>{selectedSkill.name}</h2>
                <span className="modal-skill-category">{getCategoryLabel(selectedSkill.category)}</span>
              </div>
            </div>
            <div className="skill-modal-body">
              <h3 className="modal-section-title">Projetos pessoais com {selectedSkill.name}</h3>
              {getRelatedProjects(selectedSkill.name).length === 0 ? (
                <div className="no-projects">
                  <span className="no-projects-icon">📂</span>
                  <p>Nenhum projeto pessoal listado com esta tecnologia ainda.</p>
                </div>
              ) : (
                <div className="related-projects-list">
                  {getRelatedProjects(selectedSkill.name).map(project => (
                    <div
                      key={project.id}
                      className="related-project-card"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="related-project-icon"><span><IconComponent name={project.image} size={22} /></span></div>
                      <div className="related-project-info">
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                        <div className="related-project-techs">
                          {project.technologies.map(tech => (
                            <span
                              key={tech}
                              className={`mini-tech-tag ${
                                tech.toLowerCase().includes(selectedSkill.name.toLowerCase()) ||
                                selectedSkill.name.toLowerCase().includes(tech.toLowerCase())
                                  ? 'highlighted' : ''
                              }`}
                            >{tech}</span>
                          ))}
                        </div>
                      </div>
                      <div className="related-project-arrow"><span>→</span></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;
