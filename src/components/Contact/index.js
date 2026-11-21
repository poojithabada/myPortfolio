import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';
import emailjs from '@emailjs/browser';

// Default hardcoded achievement images (from local assets)
import Teachingassistant from "../../assets/Teachingassistant.png";
import genAI             from "../../assets/genAI.png";
import DAWorkshop        from "../../assets/DAWorkshop.png";
import cyberSecurity     from "../../assets/cyberSecurity.png";

const DEFAULT_ACHIEVEMENTS = [
  { name: "Teaching Assistant – NxtWave", image: Teachingassistant, link: "https://www.ccbp.in/", isAsset: true },
  { name: "Gen AI Workshop",              image: genAI,             link: "https://www.ccbp.in/", isAsset: true },
  { name: "Data Analytics Workshop",      image: DAWorkshop,        link: "https://www.ccbp.in/", isAsset: true },
  { name: "Cyber Security Workshop",      image: cyberSecurity,     link: "https://www.ccbp.in/", isAsset: true },
];

const Contact = () => {
  const SECRET_KEY   = process.env.REACT_APP_SECRET_KEY;
  const form         = useRef();
  const fileInputRef = useRef(null);

  /* ── Achievements CMS state ─────────────────────────── */
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem("my_portfolio_achievements");
    if (saved) return JSON.parse(saved);
    return DEFAULT_ACHIEVEMENTS;
  });

  useEffect(() => {
    localStorage.setItem("my_portfolio_achievements", JSON.stringify(achievements));
  }, [achievements]);

  const [showAllAch, setShowAllAch] = useState(false);

  /* ── Achievement modal state ───────────────────────── */
  const [achModalOpen,   setAchModalOpen]   = useState(false);
  const [achModalAction, setAchModalAction] = useState(""); // "add" | "delete"
  const [achActiveIdx,   setAchActiveIdx]   = useState(null);
  const [achKey,         setAchKey]         = useState("");
  const [achAuthorized,  setAchAuthorized]  = useState(false);
  const [achForm,        setAchForm]        = useState({ name: "", image: "", link: "" });
  const [achPreview,     setAchPreview]     = useState("");

  /* ── Contact form ──────────────────────────────────── */
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_2lxuxc7', 'template_pqe0ty5', form.current, '3Iplcq3z5Z8i6mTLX')
      .then(() => { alert('Email sent successfully!'); e.target.reset(); })
      .catch((err) => { alert(`Email failed: ${err.text || err.message}`); });
  };

  /* ── Achievement handlers ──────────────────────────── */
  const openAddAch   = ()      => { setAchModalAction("add");    setAchModalOpen(true); };
  const openDeleteAch = (idx)  => { setAchModalAction("delete"); setAchActiveIdx(idx); setAchModalOpen(true); };

  const verifyAchKey = (e) => {
    e.preventDefault();
    if (achKey === SECRET_KEY) {
      achModalAction === "delete" ? executeDeleteAch() : setAchAuthorized(true);
    } else {
      alert("Invalid Secret Key! Access Denied.");
      setAchKey("");
    }
  };

  const executeDeleteAch = () => {
    setAchievements(prev => prev.filter((_, i) => i !== achActiveIdx));
    closeAchModal();
  };

  const handleAchFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAchPreview(reader.result);
      setAchForm(f => ({ ...f, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const submitAch = (e) => {
    e.preventDefault();
    if (!achForm.image) { alert("Please upload an image."); return; }
    setAchievements(prev => [...prev, {
      name:    achForm.name.trim() || "Achievement",
      image:   achForm.image,
      link:    achForm.link.trim() || "#",
      isAsset: false,
    }]);
    closeAchModal();
  };

  const closeAchModal = useCallback(() => {
    setAchModalOpen(false);
    setAchAuthorized(false);
    setAchModalAction("");
    setAchKey("");
    setAchActiveIdx(null);
    setAchForm({ name: "", image: "", link: "" });
    setAchPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const achNeedsKey = !achAuthorized && (achModalAction === "add" || achModalAction === "delete");
  const visibleAch  = showAllAch ? achievements : achievements.slice(0, 4);

  /* ── Render ───────────────────────────────────────── */
  return (
    <section id="contactPage">

      {/* ── MY ACHIEVEMENTS ── */}
      <div className="experience">
        <div className="achTitleRow">
          <h1 className="ContactPageTitle">My Achievements</h1>
          <button className="addAchBtn" onClick={openAddAch} title="Add an achievement">
            + Add Achievement
          </button>
        </div>
        <p className="contactPageDesc">
          I attended hands-on workshops on Generative AI, Data Analytics, and Cyber Security,
          gaining practical skills by building real-time applications. I also served as a
          Teaching Assistant at NxtWave, mentoring students and supporting their technical
          learning journey.
        </p>

        <div className="experienceImgs">
          {visibleAch.map((item, index) => (
            <div className="experienceContainer" key={index}>
              <img src={item.image} alt={item.name || `achievement-${index}`} className="experienceImg" />
              {item.link && item.link !== "#" && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="experienceLinkIcon">
                  🔗
                </a>
              )}
              {/* Delete button — hover-reveal */}
              <button
                className="achDeleteBtn"
                onClick={() => openDeleteAch(index)}
                title="Delete achievement"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {achievements.length > 4 && (
          <button className="achMoreBtn" onClick={() => setShowAllAch(p => !p)}>
            {showAllAch ? "Show Less" : "See More"}
          </button>
        )}
      </div>

      {/* ── CONTACT FORM ── */}
      <div id="contact">
        <h1 className="ContactPageTitle">Contact Me</h1>
        <span className="contactDesc">Please fill out the form to discuss any work opportunities.</span>
        <form className="contactForm" ref={form} onSubmit={sendEmail}>
          <input className="name" placeholder="Your Name"    type="text"  name="your_name"  required />
          <input className="email" placeholder="Your Email"  type="email" name="your_email" required />
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

      {/* ── ACHIEVEMENT MODAL ── */}
      {achModalOpen && (
        <div className="achModalOverlay">
          <div className="achModalContent">
            <button className="achModalCloseBtn" onClick={closeAchModal}>&times;</button>

            {achNeedsKey ? (
              <form onSubmit={verifyAchKey} className="achModalForm">
                <h3>Admin Verification Required</h3>
                <p>Enter your secret key to <strong>{achModalAction}</strong> this achievement.</p>
                <input
                  type="password"
                  placeholder="Secret Key"
                  value={achKey}
                  onChange={e => setAchKey(e.target.value)}
                  required
                  className="achModalInput"
                />
                <button type="submit" className="achModalSubmitBtn">
                  {achModalAction === "delete" ? "Confirm Delete" : "Verify Identity"}
                </button>
              </form>
            ) : (
              <form onSubmit={submitAch} className="achModalForm">
                <h3>Add New Achievement</h3>

                <label>Achievement Name <span className="achOptional">(optional)</span></label>
                <input
                  type="text"
                  placeholder="e.g. Gen AI Workshop"
                  value={achForm.name}
                  onChange={e => setAchForm({ ...achForm, name: e.target.value })}
                  className="achModalInput"
                />

                <label>Upload Image <span style={{ color: "#e74c3c" }}>*</span></label>
                <div className="achFileWrapper">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleAchFile}
                    className="achFileInput"
                    id="achFileInput"
                  />
                  <label htmlFor="achFileInput" className="achFileLabel">
                    📎 Choose Image File
                  </label>
                  {achPreview && (
                    <img src={achPreview} alt="Preview" className="achPreviewImg" />
                  )}
                </div>

                <label>Link URL <span className="achOptional">(optional)</span></label>
                <input
                  type="url"
                  placeholder="https://example.com/achievement"
                  value={achForm.link}
                  onChange={e => setAchForm({ ...achForm, link: e.target.value })}
                  className="achModalInput"
                />

                <button type="submit" className="achModalSubmitBtn">Add Achievement</button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};

export default Contact;
