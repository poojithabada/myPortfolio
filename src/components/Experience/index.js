import React, { useState, useEffect } from "react";
import "./index.css";

const Experience = () => {
  const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

  // Load from localStorage or use default seed data (Ascentium internship)
  const [experiences, setExperiences] = useState(() => {
    const saved = localStorage.getItem("my_portfolio_experience");
    if (saved) return JSON.parse(saved);
    return [];
  });

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem("my_portfolio_experience", JSON.stringify(experiences));
  }, [experiences]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  // Auth state
  const [enteredKey, setEnteredKey] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Employment type options
  const EMP_TYPES = ["Internship", "Teaching Assistant", "Full-time", "Part-time", "Contract"];

  // Form state
  const [expForm, setExpForm] = useState({
    company: "",
    role: "",
    duration: "",
    location: "",
    type: "Internship",
    description: "",
    tech: "",
  });

  // ── Handlers ───────────────────────────────────────────────────────
  const handleOpenAdd = () => {
    setModalAction("add");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (index) => {
    const exp = experiences[index];
    setModalAction("edit");
    setActiveIndex(index);
    setExpForm({
      company: exp.company,
      role: exp.role,
      duration: exp.duration,
      location: exp.location,
      type: exp.type,
      description: exp.description,
      tech: exp.tech.join(", "),
    });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (index) => {
    setModalAction("delete");
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const handleVerifyKey = (e) => {
    e.preventDefault();
    if (enteredKey === SECRET_KEY) {
      if (modalAction === "delete") {
        executeDelete();
      } else {
        setIsAuthorized(true);
      }
    } else {
      alert("Invalid Secret Key! Access Denied.");
      setEnteredKey("");
    }
  };

  const executeDelete = () => {
    setExperiences((prev) => prev.filter((_, i) => i !== activeIndex));
    closeAndReset();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const techArray = expForm.tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const entry = {
      company: expForm.company,
      role: expForm.role,
      duration: expForm.duration,
      location: expForm.location,
      type: expForm.type,
      description: expForm.description,
      tech: techArray,
    };

    if (modalAction === "edit") {
      setExperiences((prev) =>
        prev.map((item, i) => (i === activeIndex ? entry : item))
      );
    } else {
      setExperiences((prev) => [entry, ...prev]);
    }
    closeAndReset();
  };

  const closeAndReset = () => {
    setIsModalOpen(false);
    setIsAuthorized(false);
    setModalAction("");
    setEnteredKey("");
    setActiveIndex(null);
    setExpForm({
      company: "",
      role: "",
      duration: "",
      location: "",
      type: "Internship",
      description: "",
      tech: "",
    });
  };

  const needsKey =
    !isAuthorized &&
    (modalAction === "add" ||
      modalAction === "edit" ||
      modalAction === "delete");

  const typeBadgeClass = (type) => {
    switch (type) {
      case "Teaching Assistant": return "typeBadge typeTA";
      case "Full-time":          return "typeBadge typeFull";
      case "Part-time":          return "typeBadge typePart";
      case "Contract":           return "typeBadge typeContract";
      default:                   return "typeBadge typeInternship";
    }
  };

  return (
    <section className="experienceSection" id="experience">
      {/* Header */}
      <div className="expTitleRow">
        <h2 className="experienceTitle">Experience</h2>
        <button
          className="addExpBtn"
          onClick={handleOpenAdd}
          title="Add new experience"
        >
          + Add Experience
        </button>
      </div>
      <p className="experienceIntro">
        My professional journey — internships and work experience.
      </p>

      {/* Timeline */}
      <div className="timeline">
        {experiences.length === 0 ? (
          <p className="noExpText">No experience entries yet. Click "+ Add Experience" to get started.</p>
        ) : (
          experiences.map((exp, index) => (
            <div className="timelineItem" key={index}>
              {/* Dot & line */}
              <div className="timelineDot" />

              {/* Card */}
              <div className="expCard">
                {/* Top row */}
                <div className="expCardHeader">
                  <div className="expCardLeft">
                    <h3 className="expRole">{exp.role}</h3>
                    <span className="expCompany">@ {exp.company}</span>
                  </div>
                  <div className="expCardRight">
                    <span className={typeBadgeClass(exp.type)}>{exp.type}</span>
                    <span className="expDuration">{exp.duration}</span>
                    <span className="expLocation">📍 {exp.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="expDescription">{exp.description}</p>

                {/* Tech badges */}
                {exp.tech.length > 0 && (
                  <div className="expTechStack">
                    {exp.tech.map((t, i) => (
                      <span key={i} className="expTechBadge">{t}</span>
                    ))}
                  </div>
                )}

                {/* Admin action tray (hover-reveal) */}
                <div className="expActionTray">
                  <button
                    className="expActionBtn"
                    onClick={() => handleOpenEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="expActionBtn"
                    onClick={() => handleOpenDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── MODAL ───────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="expModalOverlay">
          <div className="expModalContent">
            <button className="expModalCloseBtn" onClick={closeAndReset}>
              &times;
            </button>

            {/* Step 1 — Key verification */}
            {needsKey ? (
              <form onSubmit={handleVerifyKey} className="expModalForm">
                <h3>Admin Verification Required</h3>
                <p>
                  Enter your secret key to{" "}
                  <strong>{modalAction}</strong> this experience entry.
                </p>
                <input
                  type="password"
                  placeholder="Secret Key"
                  value={enteredKey}
                  onChange={(e) => setEnteredKey(e.target.value)}
                  required
                  className="expModalInput"
                />
                <button type="submit" className="expModalSubmitBtn">
                  {modalAction === "delete" ? "Confirm Delete" : "Verify Identity"}
                </button>
              </form>
            ) : (
              /* Step 2 — Add / Edit form */
              <form onSubmit={handleFormSubmit} className="expModalForm">
                <h3>
                  {modalAction === "edit"
                    ? "Edit Experience"
                    : "Add New Experience"}
                </h3>

                <div className="expFormGrid">
                  <div className="expFormGroup">
                    <label>Company / Organisation</label>
                    <input
                      type="text"
                      placeholder="e.g. Ascentium"
                      value={expForm.company}
                      onChange={(e) =>
                        setExpForm({ ...expForm, company: e.target.value })
                      }
                      required
                      className="expModalInput"
                    />
                  </div>

                  <div className="expFormGroup">
                    <label>Your Role / Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Software Development Intern"
                      value={expForm.role}
                      onChange={(e) =>
                        setExpForm({ ...expForm, role: e.target.value })
                      }
                      required
                      className="expModalInput"
                    />
                  </div>

                  <div className="expFormGroup">
                    <label>Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. Jun 2025 – Present"
                      value={expForm.duration}
                      onChange={(e) =>
                        setExpForm({ ...expForm, duration: e.target.value })
                      }
                      required
                      className="expModalInput"
                    />
                  </div>

                  <div className="expFormGroup">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Hyderabad / Remote"
                      value={expForm.location}
                      onChange={(e) =>
                        setExpForm({ ...expForm, location: e.target.value })
                      }
                      required
                      className="expModalInput"
                    />
                  </div>

                  <div className="expFormGroup">
                    <label>Employment Type</label>
                    <select
                      value={expForm.type}
                      onChange={(e) =>
                        setExpForm({ ...expForm, type: e.target.value })
                      }
                      className="expModalInput expModalSelect"
                    >
                      {EMP_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className="expFormGroup expFormGroupFull">
                    <label>Description</label>
                    <textarea
                      placeholder="Describe your responsibilities and achievements..."
                      value={expForm.description}
                      onChange={(e) =>
                        setExpForm({ ...expForm, description: e.target.value })
                      }
                      required
                      className="expModalInput expTextArea"
                    />
                  </div>

                  <div className="expFormGroup expFormGroupFull">
                    <label>Technologies Used (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="React, Node.js, Python"
                      value={expForm.tech}
                      onChange={(e) =>
                        setExpForm({ ...expForm, tech: e.target.value })
                      }
                      className="expModalInput"
                    />
                  </div>
                </div>

                <button type="submit" className="expModalSubmitBtn">
                  {modalAction === "edit" ? "Save Changes" : "Add Experience"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;
