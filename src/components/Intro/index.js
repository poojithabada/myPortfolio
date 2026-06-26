```jsx
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
      {/* LEFT SIDE */}
      <div className="introContent">
        <span className="hello">Hello, I'm</span>

        <h1 className="introTitle">
          <span className="introName">Bada Poojitha</span>
        </h1>

        <h2 className="introRole">
          AI & Full Stack Developer
        </h2>

        <p className="introPara">
          I build intelligent web applications by combining modern Full Stack
          Development with Artificial Intelligence to create scalable,
          user-focused digital experiences that solve real-world problems.
        </p>

        <div className="buttonGroup">
          <button className="btn" onClick={scrollToContact}>
            <img src={btnImg} alt="Hire Me" className="btnImg" />
            Hire Me
          </button>

          <a href={resume} download className="resumeBtn">
            Download Resume
          </a>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="rightSection">
        <img
          src={profile}
          alt="Bada Poojitha"
          className="profile"
        />

        <div className="bioCard">
          <h3>Bada Poojitha</h3>

          <p>
            Passionate about building AI-powered applications with clean UI,
            scalable architecture, and intelligent automation to solve
            real-world problems.
          </p>

          <div className="services">
            <div className="skillCard">
              🧩 DSA
            </div>

            <div className="skillCard">
              💻 Full Stack
            </div>

            <div className="skillCard">
              🤖 AI Development
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
```
