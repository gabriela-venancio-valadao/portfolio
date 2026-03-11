import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import '../styles/Testimonials.css';

const Testimonials = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="testimonials" ref={ref}>
      <div className={`section-container ${inView ? 'animate-in' : ''}`}>
        <div className="section-header">
          <span className="section-icon">{'""'}</span>
          <h2 className="section-title">Depoimentos</h2>
          <p className="section-subtitle">// feedback.map(review)</p>
          <div className="title-decoration">
            <span className="deco-leaf">{'<'}</span>
            <div className="decoration-line"></div>
            <span className="deco-leaf">{'/>'}</span>
          </div>
        </div>

        <div className="testimonials-carousel">
          <button className="carousel-btn prev" onClick={prevTestimonial}>
            <span>←</span>
          </button>

          <div className="testimonial-card-container">
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
              >
                <div className="testimonial-quote-icon">❝</div>
                <p className="testimonial-text">"{t.text}"</p>
                <a
                  href={t.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="testimonial-author"
                >
                  <span className="author-avatar">{t.avatar}</span>
                  <div className="author-info">
                    <h4 className="author-name">{t.name}</h4>
                    <p className="author-role">{t.role} @ {t.company}</p>
                  </div>
                  <span className="author-linkedin-tag">LinkedIn ↗</span>
                </a>
              </div>
            ))}
          </div>

          <button className="carousel-btn next" onClick={nextTestimonial}>
            <span>→</span>
          </button>
        </div>

        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
