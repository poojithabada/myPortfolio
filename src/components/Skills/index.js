import React, { Component } from 'react';
import UIDesign from "../../assets/ui-design.png";
import webDesign from "../../assets/website-design.png";
import appDesign from "../../assets/app-design.png";

import './index.css';

class Skills extends Component {
  render() {
    return (
      <section id="skills">
        <span className="skillTitle">What I Do</span>
        <span className="skillDesc">
          I specialize in Full Stack Development, Artificial Intelligence, and
          Data Structures & Algorithms, building scalable applications and
          solving complex real-world problems.
        </span>

        <div className="skillBars">
          <div className="skillBar">
            <img src={UIDesign} alt="DSA" className="skillBarImg" />
            <div className="skillBarText">
              <h2>Data Structures & Algorithms</h2>
              <p>
                Strong problem-solving skills with expertise in data structures,
                algorithms, and optimized coding solutions for technical
                challenges.
              </p>
            </div>
          </div>

          <div className="skillBar">
            <img src={webDesign} alt="Full Stack Development" className="skillBarImg" />
            <div className="skillBarText">
              <h2>Full Stack Development</h2>
              <p>
                Building responsive and scalable web applications using React,
                Node.js, Express, MongoDB, and modern development practices.
              </p>
            </div>
          </div>

          <div className="skillBar">
            <img src={appDesign} alt="AI Development" className="skillBarImg" />
            <div className="skillBarText">
              <h2>AI Development</h2>
              <p>
                Developing AI-powered applications using Google Gemini, RAG,
                intelligent agents, and automation to create innovative user
                experiences.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Skills;