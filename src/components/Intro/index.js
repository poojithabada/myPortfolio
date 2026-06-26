import React from "react";
import "./index.css";

import profile from "../../assets/profile.jpeg";
import btnImg from "../../assets/hireme.png";
import resume from "../../assets/resume.pdf";

const Intro = () => {
  const scrollToContact = () => {
    const contact = document.getElementById("contact");

    if (contact) {
      contact.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="intro">
      {/* Left Section */}
      <div className="introContent">
        <span className="hello">Hello, I'm</span>

        <h1 className="introTitle">
          <span className="introName">Bada Poojitha</span>
        </h1>

        <h2 className="introRole">
          AI & Full Stack Developer
        </h2>

        <p className="introPara">
          Passionate about building AI-powered web applications using modern
          Full Stack technologies. I create scalable, intelligent, and
          user-focused digital solutions that solve real-world problems.
        </p>

        <div className="buttonGroup">
          <button className="btn" onClick={scrollToContact}>
            <img src={btnImg} alt="Hire Me" className="btnImg" />
            Hire Me
          </button>

          <a
            href={resume}
            download="Bada_Poojitha_Resume.pdf"
            className="resumeBtn"
          >
            📄Download Resume
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="rightSection">
        <img
          src={profile}
          alt="Bada Poojitha"
          className="profile"
        />

        <div className="bioCard">
          <h3>Bada Poojitha</h3>

          <p>
            AI enthusiast and Full Stack Developer focused on creating clean,
            responsive, and intelligent web applications with modern
            technologies.
          </p>

          <div className="services">
            <div className="skillCard">⚛ React.js</div>
            <div className="skillCard">🟢 Node.js</div>
            <div className="skillCard">🍃 MongoDB</div>
            <div className="skillCard">🤖 AI Integration</div>
            <div className="skillCard">💻 REST APIs</div>
            <div className="skillCard">🐍 Python</div>
            <div className="skillCard">SQL</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;