import React, { useRef } from 'react';
import './index.css';
import Teachingassistant from "../../assets/Teachingassistant.png";
import genAI from "../../assets/genAI.png";
import DAWorkshop from "../../assets/DAWorkshop.png";
import cyberSecurity from "../../assets/cyberSecurity.png";

import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
  .sendForm('service_2lxuxc7', 'template_pqe0ty5', form.current, '3Iplcq3z5Z8i6mTLX')
  .then((result) => {
    console.log('SUCCESS!', result.text);
    alert('Email sent successfully!');
    e.target.reset();
  })
  .catch((error) => {
    console.error('FAILED...', error);
    alert(`Email failed to send: ${error.text || error.message}`);
  });

  };

  return (
    <section id="contactPage">
      <div className="experience">
        <h1 className="ContactPageTitle">My Experience</h1>
        <p className="contactPageDesc">
          I attended hands-on workshops on Generative AI, Data Analytics, and Email Investigation, gaining practical skills by building real-time applications. I also served as a Teaching Assistant at NxtWave, mentoring students and supporting their technical learning journey.
        </p>
        <div className="experienceImgs">
          <div className="experienceImgs">
  {[Teachingassistant, genAI, DAWorkshop, cyberSecurity].map((img, index) => (
    <div className="experienceContainer" key={index}>
      <img src={img} alt={`experience-${index}`} className="experienceImg" />
      <a
        href="https://www.ccbp.in/" 
        target="_blank"
        rel="noopener noreferrer"
        className="experienceLinkIcon"
      >
        🔗
      </a>
    </div>
  ))}
</div>

        </div>
      </div>

      <div id="contact">
        <h1 className="ContactPageTitle">Contact Me</h1>
        <span className="contactDesc">Please fill out the form to discuss any work opportunities.</span>
        <form className="contactForm" ref={form} onSubmit={sendEmail}>
          <input className="name" placeholder="Your Name" type="text" name="your_name" required />
          <input className="email" placeholder="Your Email" type="email" name="your_email" required />
          <textarea name="message" placeholder="Your Message" className="msg" rows="5" required></textarea>
          <button type="submit" className="submit">Submit</button>
          <div className="links">
            <div className="social-icons">
  <a href="https://www.linkedin.com/in/poojithabada" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-linkedin fa-2x"></i>
  </a>
   <a href="https://github.com/poojithabada" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-github fa-2x"></i>
  </a>
  <a href="https://www.instagram.com/poojitha_bada_16" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-instagram fa-2x"></i>
  </a>

  <a href="https://twitter.com/poojithabada" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-twitter fa-2x"></i>
  </a>
 
</div>

          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
