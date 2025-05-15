import React, { Component } from 'react';
import UIDesign from "../../assets/ui-design.png"
import webDesign from "../../assets/website-design.png"
import appDesign from "../../assets/app-design.png"

import './index.css'
class Skills extends Component {
  render() {
    return (
      <section id="skills">
        <span className="skillTitle">What I do</span>
        <span className="skillDesc">I am a skilled web designer with experience in creating visually appealing and user friendly websites.</span>
        <div className="skillBars">
          <div className="skillBar">
            <img src={UIDesign} alt="UiDesign" className="skillBarImg"/>
            <div className="skillBarText">
              <h2>UI/UX design</h2>
              <p>Crafting intuitive, aesthetic interfaces that enhance user satisfaction and drive engagement.</p>
            </div>
          </div>
           <div className="skillBar">
            <img src={webDesign} alt="webDesign" className="skillBarImg"/>
            <div className="skillBarText">
              <h2>Website design</h2>
              <p>Building responsive, fast, and visually stunning websites tailored to your brand identity.</p>
            </div>
          </div>
           <div className="skillBar">
            <img src={appDesign} alt="appDesign" className="skillBarImg"/>
            <div className="skillBarText">
              <h2>app design</h2>
              <p>Designing seamless mobile experiences with a focus on usability and innovation.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Skills;