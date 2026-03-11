import React from 'react';
import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="totoro-loader">
          <div className="totoro-body">
            <div className="totoro-ear left"></div>
            <div className="totoro-ear right"></div>
            <div className="totoro-face">
              <div className="totoro-eye left"></div>
              <div className="totoro-eye right"></div>
              <div className="totoro-nose"></div>
              <div className="totoro-mouth"></div>
            </div>
            <div className="totoro-belly">
              <div className="belly-mark"></div>
              <div className="belly-mark"></div>
              <div className="belly-mark"></div>
            </div>
          </div>
        </div>
        <div className="loader-text">
          <span>L</span><span>o</span><span>a</span><span>d</span>
          <span>i</span><span>n</span><span>g</span><span>.</span><span>.</span><span>.</span>
        </div>
        <div className="leaf-spinner">
          <div className="leaf"></div>
          <div className="leaf"></div>
          <div className="leaf"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
