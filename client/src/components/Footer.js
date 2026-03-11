import React from 'react';
import '../styles/Footer.css';

const Footer = ({ profile }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-landscape">
        <div className="footer-hill"></div>
      </div>
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">{'> dev.folio'}</span>
            <p className="footer-tagline">Obrigada por visitar meu portfólio! Se curtiu o que viu, vamos conversar — estou sempre aberta a novas conexões e oportunidades.</p>
          </div>

          <div className="footer-links">
            <h4>Navegação</h4>
            <a href="#home">Início</a>
            <a href="#about">Sobre</a>
            <a href="#projects">Projetos</a>
            <a href="#contact">Contato</a>
          </div>

          <div className="footer-social">
            <h4>Redes Sociais</h4>
            <div className="social-links">
              {profile && (
                <>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-icon">
                    GitHub
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
                    LinkedIn
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-decoration">
            <div className="decoration-line"></div>
          </div>
          <p className="footer-copyright">
            © {currentYear} Gabriela Venancio — Feito com dedicação e muito café ☕
          </p>
          <p className="footer-made-with">
            React.js | CSS3 | Criatividade
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
