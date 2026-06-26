import React from "react";
import "./index.css";

import profile from "../../assets/profile.jpeg";
import btnImg from "../../assets/hireme.png";
import resume from "../../assets/resume.pdf";

const Intro = () => {
  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="intro">
      {/* Left Section */}
      <div className="introContent">
        <span className="hello">Hello, I'm</span>

        <h1 className="introText">
          <span className="introName">Bada Poojitha</span>
        </h1>

        <h2 className="introRole">
          AI & Full Stack Developer
        </h2>

        <p className="introPara">
          I build intelligent web applications by combining modern full-stack
          development with Artificial Intelligence to create scalable,
          user-focused digital experiences. Passionate about solving real-world
          problems through clean code, modern UI, and AI-powered solutions.
        </p>

        <div className="buttonGroup">
          <button className="btn" onClick={scrollToContact}>
            <img src={btnImg} alt="Hire Me" className="btnImg" />
            Hire Me
          </button>

          <a href={resume} download className="resumeBtn">
            📄 Download Resume
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="biopic">
        <img
          src={profile}
          alt="Bada Poojitha"
          className="profile"
        />

        <div className="bio">
          <h3 className="card1">Bada Poojitha</h3>

          <p>
            🚀 Passionate about building AI-powered web applications that
            combine modern design, intelligent automation, and scalable
            full-stack architecture to solve real-world problems.
          </p>

          <div className="services">
            <div className="card">
              🧩 Data Structures & Algorithms
            </div>

            <div className="card">
              💻 Full Stack Development
            </div>

            <div className="card">
              🤖 AI Integration & Development
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;