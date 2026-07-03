import React, { useState } from "react";
import "./index.css";

const Projects = () => {
  
  const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

  // All 3 projects initialized under Full Stack, other categories left empty
  const [categorizedProjects, setCategorizedProjects] = useState([
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
  ]);

  // Modal UI control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(""); 
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(null); 
  
  // Security and Input states
  const [enteredKey, setEnteredKey] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [projectForm, setProjectForm] = useState({ title: "", description: "", tech: "", github: "", demo: "" });
  const [expandedCategories, setExpandedCategories] = useState({});
  const toggleCategory = (categoryIndex) => {
  setExpandedCategories((prev) => ({
    ...prev,
    [categoryIndex]: !prev[categoryIndex],
  }));
};

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

  const closeAndResetModal = () => {
    setIsModalOpen(false);
    setIsAuthorized(false);
    setModalAction("");
    setEnteredKey("");
    setActiveCategoryIndex(null);
    setActiveProjectIndex(null);
    setProjectForm({ title: "", description: "", tech: "", github: "", demo: "" });
  };

  return (
    <section className="projectsSection" id="projects">
      <h2 className="projectsTitle">Projects</h2>
      <p className="projectsIntro">
        Some recent projects. Click below to check code and live demos.
      </p>

      <div className="projectsContainer">
        {categorizedProjects.map((group, groupIndex) => (
          <div className="categoryBox" key={groupIndex}>
            <div className="categoryHeader">
              <h3 className="categoryTitle">{group.category}</h3>
              <button className="addProjectBtn" onClick={() => handleOpenAddModal(groupIndex)}>
                + Add Project
              </button>
            </div>
            
            {group.projects.length === 0 ? (
              <p className="emptyCategoryText">No projects in this category yet.</p>
            ) : (
              <div className="projectsGrid">
                {group.projects.map((project, index) => (
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
                      
                      {/* Controls relocated to bottom row */}
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
            )}
          </div>
        ))}
      </div>

      {/* ACCESS CONTROL MODAL SYSTEM */}
      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="modalCloseBtn" onClick={closeAndResetModal}>&times;</button>
            
            {!isAuthorized && (modalAction === "delete" || modalAction === "add" || modalAction === "edit") ? (
              <form onSubmit={handleVerifyKey} className="modalForm">
                <h3>Admin Verification Required</h3>
                <p>
                  Enter your secret key to <strong>{modalAction}</strong> this project item.
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
                  {modalAction === "delete" ? "Confirm Delete" : "Verify Identity"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleFormSubmit} className="modalForm">
                <h3>
                  {modalAction === "edit" ? "Modify Project Info" : `Add Project to ${categorizedProjects[activeCategoryIndex]?.category}`}
                </h3>
                
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