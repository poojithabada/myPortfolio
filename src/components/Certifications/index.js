import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// Pre-load the existing local certificate images as default data
import staticWebsite      from "../../assets/staticWebsite.png";
import responsiveWebsite  from "../../assets/responsiveWebiste.png";
import flexbox            from "../../assets/flexbox.png";
import dynamicWeb         from "../../assets/dynamicWeb.png";
import javascript         from "../../assets/javascript.png";
import databaseSQL        from "../../assets/databaseSQL.png";
import NodeJs             from "../../assets/NodeJs.png";
import python             from "../../assets/python.png";
import developerFoundations from "../../assets/developerFoundations.png";

const DEFAULT_CERTS = [
  { name: "Static Website",          image: staticWebsite,         link: "https://www.ccbp.in/", isAsset: true },
  { name: "Dynamic Web Apps",        image: dynamicWeb,            link: "https://www.ccbp.in/", isAsset: true },
  { name: "JavaScript Essentials",   image: javascript,            link: "https://www.ccbp.in/", isAsset: true },
  { name: "Database & SQL",          image: databaseSQL,           link: "https://www.ccbp.in/", isAsset: true },
  { name: "Node.js",                 image: NodeJs,                link: "https://www.ccbp.in/", isAsset: true },
  { name: "Python",                  image: python,                link: "https://www.ccbp.in/", isAsset: true },
  { name: "Developer Foundations",   image: developerFoundations,  link: "https://www.ccbp.in/", isAsset: true },
  { name: "Flexbox",                 image: flexbox,               link: "https://www.ccbp.in/", isAsset: true },
  { name: "Responsive Websites",     image: responsiveWebsite,     link: "https://www.ccbp.in/", isAsset: true },
];

const Certifications = () => {
  const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
  const fileInputRef = useRef(null);

  // Load from localStorage; seed with defaults if empty
  const [certs, setCerts] = useState(() => {
    const saved = localStorage.getItem("my_portfolio_certs");
    if (saved) return JSON.parse(saved);
    return DEFAULT_CERTS;
  });

  useEffect(() => {
    // Only persist the non-asset certs (asset certs are always from code)
    // We save the full array but mark asset ones so they reload correctly
    localStorage.setItem("my_portfolio_certs", JSON.stringify(certs));
  }, [certs]);

  const [showAll, setShowAll]       = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");   // "add" | "delete"
  const [activeIndex, setActiveIndex] = useState(null);

  // Auth
  const [enteredKey, setEnteredKey] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Form
  const [certForm, setCertForm] = useState({ name: "", image: "", link: "" });
  const [previewSrc, setPreviewSrc] = useState("");

  // ── Handlers ───────────────────────────────────────────────
  const handleOpenAdd = () => {
    setModalAction("add");
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
    setCerts(prev => prev.filter((_, i) => i !== activeIndex));
    closeAndReset();
  };

  // Convert uploaded file to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
      setCertForm(f => ({ ...f, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!certForm.image) {
      alert("Please upload a certificate image.");
      return;
    }
    const newCert = {
      name:    certForm.name.trim() || "Certificate",
      image:   certForm.image,
      link:    certForm.link.trim() || "#",
      isAsset: false,
    };
    setCerts(prev => [...prev, newCert]);
    closeAndReset();
  };

  const closeAndReset = () => {
    setIsModalOpen(false);
    setIsAuthorized(false);
    setModalAction("");
    setEnteredKey("");
    setActiveIndex(null);
    setCertForm({ name: "", image: "", link: "" });
    setPreviewSrc("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const needsKey = !isAuthorized && (modalAction === "add" || modalAction === "delete");
  const visibleCerts = showAll ? certs : certs.slice(0, 6);

  return (
    <section id="works">
      {/* Title row with Add Certificate button */}
      <div className="worksTitleRow">
        <h2 className="worksTitle">Certifications</h2>
        <button className="addCertBtn" onClick={handleOpenAdd} title="Add a certificate">
          + Add Certificate
        </button>
      </div>

      <span className="worksDesc">
        These certifications reflect my continuous learning and growth in web development.
        From building static and dynamic websites to mastering JavaScript, Node.js, React.js
        and databases, each course has sharpened my skills.
      </span>

      <div className="worksImgs">
        {visibleCerts.map((cert, index) => (
          <div className="certificateContainer" key={index}>
            <img
              src={cert.image}
              alt={cert.name || `certificate-${index}`}
              className="worksImg"
            />
            {cert.link && cert.link !== "#" && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="linkIcon"
              >
                🔗
              </a>
            )}
            {/* Delete button — hover reveal */}
            <button
              className="certDeleteBtn"
              onClick={() => handleOpenDelete(index)}
              title="Delete certificate"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button className="workBtn" onClick={() => setShowAll(p => !p)}>
        {showAll ? "Show less" : "See more"}
      </button>

      {/* ── MODAL ── */}
      {isModalOpen && (
        <div className="certModalOverlay">
          <div className="certModalContent">
            <button className="certModalCloseBtn" onClick={closeAndReset}>&times;</button>

            {/* Step 1 — Key verification */}
            {needsKey ? (
              <form onSubmit={handleVerifyKey} className="certModalForm">
                <h3>Admin Verification Required</h3>
                <p>Enter your secret key to <strong>{modalAction}</strong> this certificate.</p>
                <input
                  type="password"
                  placeholder="Secret Key"
                  value={enteredKey}
                  onChange={e => setEnteredKey(e.target.value)}
                  required
                  className="certModalInput"
                />
                <button type="submit" className="certModalSubmitBtn">
                  {modalAction === "delete" ? "Confirm Delete" : "Verify Identity"}
                </button>
              </form>
            ) : (
              /* Step 2 — Add certificate form */
              <form onSubmit={handleFormSubmit} className="certModalForm">
                <h3>Add New Certificate</h3>

                <label>Certificate Name <span className="optionalLabel">(optional)</span></label>
                <input
                  type="text"
                  placeholder="e.g. Python for Beginners"
                  value={certForm.name}
                  onChange={e => setCertForm({ ...certForm, name: e.target.value })}
                  className="certModalInput"
                />

                <label>Upload Certificate Image <span className="requiredLabel">*</span></label>
                <div className="fileUploadWrapper">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="certFileInput"
                    id="certFileInput"
                  />
                  <label htmlFor="certFileInput" className="certFileLabel">
                    📎 Choose Image File
                  </label>
                  {previewSrc && (
                    <img src={previewSrc} alt="Preview" className="certPreviewImg" />
                  )}
                </div>

                <label>Certificate Link <span className="optionalLabel">(optional)</span></label>
                <input
                  type="url"
                  placeholder="https://example.com/your-cert"
                  value={certForm.link}
                  onChange={e => setCertForm({ ...certForm, link: e.target.value })}
                  className="certModalInput"
                />

                <button type="submit" className="certModalSubmitBtn">
                  Add Certificate
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Certifications;
