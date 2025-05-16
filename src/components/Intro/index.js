import React, { Component } from 'react';
import './index.css';
import profile from '../../assets/profile.jpeg';
import btnImg from '../../assets/hireme.png'
import resume from '../../assets/resume.pdf'


import {Link} from 'react-scroll'

class Intro extends Component {
  render() {
    return (
      <section id="intro">
        <div className="introContent">
            <span className="hello">Hello,</span>
            <span className="introText">I'm <span className="introName">Poojitha</span><br/>Website Designer</span>
            <p className="introPara">I am a skilled web designer with experience in creating <br/>visually appealing and user friendly websites.</p>
            <Link><button className="btn"  onClick={() => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      }}><img src={btnImg} alt="Hire Me" className="btnImg"/>Hire me</button></Link>
        </div>
        <div className="biopic">
        <img src={profile} alt="profile" className="profile"/>
        
        <div className="bio">
          <div className="card1">Bada Poojitha</div>
    <p>🚀 Passionate about designing intuitive web experiences with clean, scalable code.</p>
    <div className="services">
  <div className="card">🌐 Web Design</div>
  <div className="card">🎨 UI/UX</div>
  <div className="card">⚙️ Frontend Dev</div>
</div>
<a href={resume} className="resumeBtn" download>📄 Download Resume</a>


</div>

        </div>
      </section>
    );
  }
}

export default Intro;
