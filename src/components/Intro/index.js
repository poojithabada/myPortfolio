import React, { Component } from 'react';
import './index.css';
import profile from '../../assets/profile.jpeg';
import btnImg from '../../assets/hireme.png';
import resume from '../../assets/resume.pdf';

import { Link } from 'react-scroll';

class Intro extends Component {
  render() {
    return (
      <section id="intro">
        <div className="introContent">
          <span className="hello">Hello,</span>

          <span className="introText">
            I'm <span className="introName">Poojitha</span>
            <br />
            AI & Full Stack Developer
          </span>

          <p className="introPara">
            I build intelligent web applications by combining modern full-stack
            development with Artificial Intelligence to create scalable,
            user-focused digital experiences.
          </p>

          <Link>
            <button
              className="btn"
              onClick={() => {
                document
                  .getElementById('contact')
                  .scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <img src={btnImg} alt="Hire Me" className="btnImg" />
              Hire Me
            </button>
          </Link>
        </div>

        <div className="biopic">
          <img src={profile} alt="profile" className="profile" />

          <div className="bio">
            <div className="card1">Bada Poojitha</div>

            <p>
              🚀 Passionate about building AI-powered web applications that
              combine modern design, intelligent automation, and scalable
              full-stack architecture to solve real-world problems.
            </p>

            <div className="services">
              <div className="card">🧩 Data Structures & Algorithms</div>
              <div className="card">💻 Full Stack Development</div>
              <div className="card">🤖 AI Integration & Development</div>
            </div>

            <a href={resume} className="resumeBtn" download>
              📄 Download Resume
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default Intro;