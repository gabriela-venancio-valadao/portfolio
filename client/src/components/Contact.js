import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../styles/Contact.css';

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className={`section-container ${inView ? 'animate-in' : ''}`}>
        <div className="section-header">
          <span className="section-icon">{'@'}</span>
          <h2 className="section-title">Contato</h2>
          <p className="section-subtitle">// send.message()</p>
          <div className="title-decoration">
            <span className="deco-leaf">{'<'}</span>
            <div className="decoration-line"></div>
            <span className="deco-leaf">{'/>'}</span>
          </div>
        </div>

        <div className="contact-content">
          <div className="contact-card-centered">
            <div className="contact-illustration">
              <div className="mail-scene">
                <span className="mail-letter">💬</span>
              </div>
            </div>
            <h3>Vamos Conversar</h3>
            <p>
              Estou sempre aberto(a) a novos projetos, ideias criativas ou
              oportunidades de colaboração. Me chama no WhatsApp!
            </p>

            <a
              href="https://wa.me/5511946111227"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-whatsapp-btn"
            >
              <svg viewBox="0 0 32 32" width="22" height="22" fill="#fff">
                <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.2l6.074-1.95a15.9 15.9 0 008.876 2.678C24.826 31.928 32 24.752 32 16.004 32 7.176 24.826 0 16.004 0zm9.31 22.606c-.39 1.1-2.274 2.038-3.14 2.148-.866.11-1.67.39-5.618-1.17-4.756-1.878-7.768-6.758-8.004-7.07-.234-.314-1.912-2.546-1.912-4.858 0-2.312 1.21-3.45 1.638-3.922.39-.43.896-.586 1.17-.586.35 0 .586.006.858.016.274.01.642-.104.996.762.39.898 1.326 3.234 1.442 3.468.116.234.194.508.04.82-.156.312-.234.508-.468.782-.234.274-.494.612-.704.82-.234.234-.478.488-.206.958.274.468 1.22 2.014 2.618 3.262 1.794 1.6 3.31 2.096 3.778 2.33.468.234.742.196 1.016-.118.274-.312 1.17-1.366 1.482-1.834.312-.468.624-.39 1.054-.234.43.156 2.734 1.29 3.202 1.526.468.234.78.352.898.546.116.196.116 1.132-.274 2.232z"/>
              </svg>
              Falar pelo WhatsApp
            </a>

            <div className="contact-divider">
              <span>ou conecte-se comigo</span>
            </div>

            <a
              href="https://linkedin.com/in/gabriela-venancio-valadao"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-linkedin-btn"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Ver perfil no LinkedIn
            </a>

            <div className="contact-methods">
              <div className="contact-method">
                <span className="method-icon">📍</span>
                <span>Brasil</span>
              </div>
              <div className="contact-method">
                <span className="method-icon">✔</span>
                <span>Disponível para projetos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
