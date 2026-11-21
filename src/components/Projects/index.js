import React, { useState, useEffect } from "react";
import "./index.css";

const Projects = () => {
  
  const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

  // Check local storage first. If empty, load the default projects.
  const [categorizedProjects, setCategorizedProjects] = useState(() => {
    const savedProjects = localStorage.getItem("my_portfolio_projects");
    if (savedProjects) {
      return JSON.parse(savedProjects);
    }
    // Default state if nothing is saved in local storage yet
    return [
      {
        category: "LLMs & Gen AI",
        projects: [],
      },
      {
        category: "Full Stack Projects",
        projects: [
          {
            title: "Building EduReach — Agentic College Chatbot",
            description: "Built an AI-powered college assistance platform with an Agentic RAG chatbot, AI voice counselor, and JWT authentication for personalized student guidance.",
            tech: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB Atlas", "Google Gemini AI", "Agentic RAG", "Tailwind CSS"],
            github: "https://github.com/poojithabada/edureach-platform",
            demo: "https://edureach-platform-lake.vercel.app",
          },
          {
            title: "AI-Web Studio",
            description: "AI-powered web builder that transforms natural language prompts into complete web applications with live preview, code generation, and deployment-ready structure.",
            tech: ["React.js", "Vite", "JavaScript", "Node.js", "Express.js", "MongoDB", "Google Gemini AI", "JWT Authentication"],
            github: "https://github.com/poojithabada/AI-Powered-web-Builder.git",
            demo: "https://ai-powered-web-builder-wcmf.vercel.app"
          },
          {
            title: "AI-Powered Resume Builder",
            description: "Build a full-stack AI-powered resume builder.",
            tech: ["React.js", "TypeScript", "Node.js", "Express.js", "Google Gemini AI", "LangChain", "Tailwind CSS"],
            github: "https://github.com/poojithabada/AI-Powered-Resume-Builder",
            demo: "https://ai-powered-resume-builder-eight.vercel.app",
          },
        ],
      },
      {
        category: "Front End Projects",
        projects: [],
      }
    ];
  });

  // Save to local storage every time 'categorizedProjects' changes
  useEffect(() => {
    localStorage.setItem("my_portfolio_projects", JSON.stringify(categorizedProjects));
  }, [categorizedProjects]);

  // Modal UI control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(""); 
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(null); 
  
  // Security and Input states
  const [enteredKey, setEnteredKey] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [projectForm, setProjectForm] = useState({ title: "", description: "", tech: "", github: "", demo: "" });

  // State for new category name input
  const [newCategoryName, setNewCategoryName] = useState("");
  
  // State to track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState({});

  // Function to toggle the expanded state for a specific category
  const toggleExpand = (groupIndex) => {
    setExpandedCategories(prev => ({
      ...prev,
      [groupIndex]: !prev[groupIndex]
    }));
  };

  // ── Project handlers ──────────────────────────────────────────────
  const handleOpenAddModal = (categoryIndex) => {
    setModalAction("add");
    setActiveCategoryIndex(categoryIndex);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (categoryIndex, projectIndex) => {
    setModalAction("edit");
    setActiveCategoryIndex(categoryIndex);
    setActiveProjectIndex(projectIndex);
    
    const targetProject = categorizedProjects[categoryIndex].projects[projectIndex];
    setProjectForm({
      title: targetProject.title,
      description: targetProject.description,
      tech: targetProject.tech.join(", "), 
      github: targetProject.github,
      demo: targetProject.demo
    });
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (categoryIndex, projectIndex) => {
    setModalAction("delete");
    setActiveCategoryIndex(categoryIndex);
    setActiveProjectIndex(projectIndex);
    setIsModalOpen(true);
  };

  // ── Category handlers ─────────────────────────────────────────────
  const handleOpenAddCategoryModal = () => {
    setModalAction("addCategory");
    setIsModalOpen(true);
  };

  const handleOpenDeleteCategoryModal = (categoryIndex) => {
    setModalAction("deleteCategory");
    setActiveCategoryIndex(categoryIndex);
    setIsModalOpen(true);
  };

  // ── Auth & Submit ─────────────────────────────────────────────────
  const handleVerifyKey = (e) => {
    e.preventDefault();
    if (enteredKey === SECRET_KEY) {
      if (modalAction === "delete") {
        executeDelete();
      } else if (modalAction === "deleteCategory") {
        executeDeleteCategory();
      } else {
        setIsAuthorized(true); 
      }
    } else {
      alert("Invalid Secret Key! Access Denied.");
      setEnteredKey("");
    }
  };

  const executeDelete = () => {
    const updatedCategories = categorizedProjects.map((group, cIndex) => {
      if (cIndex === activeCategoryIndex) {
        return {
          ...group,
          projects: group.projects.filter((_, pIndex) => pIndex !== activeProjectIndex)
        };
      }
      return group;
    });
    setCategorizedProjects(updatedCategories);
    closeAndResetModal();
  };

  const executeDeleteCategory = () => {
    const updatedCategories = categorizedProjects.filter((_, cIndex) => cIndex !== activeCategoryIndex);
    setCategorizedProjects(updatedCategories);
    closeAndResetModal();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const techArray = projectForm.tech.split(",").map(item => item.trim()).filter(Boolean);

    const formattedProjectData = {
      title: projectForm.title,
      description: projectForm.description,
      tech: techArray,
      github: projectForm.github || "#",
      demo: projectForm.demo || "#"
    };

    const updatedCategories = categorizedProjects.map((group, cIndex) => {
      if (cIndex === activeCategoryIndex) {
        if (modalAction === "edit") {
          const targetProjectsCopy = [...group.projects];
          targetProjectsCopy[activeProjectIndex] = formattedProjectData;
          return { ...group, projects: targetProjectsCopy };
        } else {
          return { ...group, projects: [...group.projects, formattedProjectData] };
        }
      }
      return group;
    });

    setCategorizedProjects(updatedCategories);
    closeAndResetModal();
  };

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    setCategorizedProjects(prev => [...prev, { category: trimmed, projects: [] }]);
    closeAndResetModal();
  };

  const closeAndResetModal = () => {
    setIsModalOpen(false);
    setIsAuthorized(false);
    setModalAction("");
    setEnteredKey("");
    setActiveCategoryIndex(null);
    setActiveProjectIndex(null);
    setProjectForm({ title: "", description: "", tech: "", github: "", demo: "" });
    setNewCategoryName("");
  };

  // ── Helpers ───────────────────────────────────────────────────────
  const needsKeyFirst = !isAuthorized && (
    modalAction === "delete" ||
    modalAction === "deleteCategory" ||
    modalAction === "add" ||
    modalAction === "edit" ||
    modalAction === "addCategory"
  );

  const getModalTitle = () => {
    switch (modalAction) {
      case "addCategory":   return "Add New Project Category";
      case "deleteCategory":return `Delete "${categorizedProjects[activeCategoryIndex]?.category}"?`;
      case "edit":          return "Modify Project Info";
      case "delete":        return "Delete Project?";
      default:
        return `Add Project to ${categorizedProjects[activeCategoryIndex]?.category}`;
    }
  };

  return (
    <section className="projectsSection" id="projects">
      {/* Section header with Add Category button */}
      <div className="sectionTitleRow">
        <h2 className="projectsTitle">Projects</h2>
        <button
          className="addCategoryBtn"
          onClick={handleOpenAddCategoryModal}
          title="Add a new project category"
        >
          + Add Category
        </button>
      </div>

      <p className="projectsIntro">
        Some recent projects. Click below to check code and live demos.
      </p>

      <div className="projectsContainer">
        {categorizedProjects.map((group, groupIndex) => (
          <div className="categoryBox" key={groupIndex}>
            <div className="categoryHeader">
              <h3 className="categoryTitle">{group.category}</h3>
              <div className="categoryHeaderActions">
                <button
                  className="cardActionBtn addProjectActionBtn"
                  onClick={() => handleOpenAddModal(groupIndex)}
                >
                  + Add Project
                </button>
                <button
                  className="cardActionBtn deleteCategoryBtn"
                  onClick={() => handleOpenDeleteCategoryModal(groupIndex)}
                >
                  Delete Category
                </button>
              </div>
            </div>
            
            {group.projects.length === 0 ? (
              <p className="emptyCategoryText">No projects in this category yet.</p>
            ) : (
              <>
                <div className="projectsGrid">
                  {group.projects
                    .slice(0, expandedCategories[groupIndex] ? group.projects.length : 3)
                    .map((project, index) => (
                    <div className="projectCard" key={index}>
                      <div className="projectContent">
                        <div className="cardHeaderRow">
                          <h4>{project.title}</h4>
                        </div>
                        <p>{project.description}</p>
                        <div className="techStack">
                          {project.tech.map((t, i) => (
                            <span key={i} className="techBadge">{t}</span>
                          ))}
                        </div>
                        
                        <div className="projectLinksRow">
                          <div className="projectLinks">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">Live Demo</a>
                          </div>
                          
                          <div className="cardActionTray">
                            <button 
                              className="cardActionBtn" 
                              onClick={() => handleOpenEditModal(groupIndex, index)}
                            >
                              Edit
                            </button>
                            <button 
                              className="cardActionBtn" 
                              onClick={() => handleOpenDeleteModal(groupIndex, index)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
                
                {group.projects.length > 3 && (
                  <button 
                    className="viewMoreBtn" 
                    onClick={() => toggleExpand(groupIndex)}
                  >
                    {expandedCategories[groupIndex] ? "Show Less" : "View More"}
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* ── MODAL ───────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="modalCloseBtn" onClick={closeAndResetModal}>&times;</button>
            
            {/* Step 1 — Key verification for all actions */}
            {needsKeyFirst ? (
              <form onSubmit={handleVerifyKey} className="modalForm">
                <h3>Admin Verification Required</h3>
                <p>
                  Enter your secret key to <strong>{modalAction.replace("Category", " category")}</strong>.
                  {(modalAction === "deleteCategory") && (
                    <span className="deleteWarning"> This will also remove all projects inside it.</span>
                  )}
                </p>
                <input 
                  type="password" 
                  placeholder="Secret Key" 
                  value={enteredKey} 
                  onChange={(e) => setEnteredKey(e.target.value)} 
                  required 
                  className="modalInput"
                />
                <button type="submit" className="modalSubmitBtn">
                  {(modalAction === "delete" || modalAction === "deleteCategory") ? "Confirm Delete" : "Verify Identity"}
                </button>
              </form>
            ) : modalAction === "addCategory" ? (
              /* Step 2a — Add Category form */
              <form onSubmit={handleAddCategorySubmit} className="modalForm">
                <h3>Add New Project Category</h3>
                <label>Category Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Data Science, Mobile Apps"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  required
                  className="modalInput"
                  autoFocus
                />
                <button type="submit" className="modalSubmitBtn">Create Category</button>
              </form>
            ) : (
              /* Step 2b — Add / Edit project form */
              <form onSubmit={handleFormSubmit} className="modalForm">
                <h3>{getModalTitle()}</h3>
                
                <label>Project Title</label>
                <input 
                  type="text" 
                  value={projectForm.title} 
                  onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} 
                  required 
                  className="modalInput"
                />

                <label>Description</label>
                <textarea 
                  value={projectForm.description} 
                  onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} 
                  required 
                  className="modalInput text-area"
                />

                <label>Tech Stack (Comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="React, Express, MongoDB"
                  value={projectForm.tech} 
                  onChange={(e) => setProjectForm({...projectForm, tech: e.target.value})} 
                  required 
                  className="modalInput"
                />

                <label>GitHub Repository URL</label>
                <input 
                  type="url" 
                  value={projectForm.github} 
                  onChange={(e) => setProjectForm({...projectForm, github: e.target.value})} 
                  className="modalInput"
                />

                <label>Live Demo URL</label>
                <input 
                  type="url" 
                  value={projectForm.demo} 
                  onChange={(e) => setProjectForm({...projectForm, demo: e.target.value})} 
                  className="modalInput"
                />

                <button type="submit" className="modalSubmitBtn">
                  {modalAction === "edit" ? "Save Alterations" : "Publish Project"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;