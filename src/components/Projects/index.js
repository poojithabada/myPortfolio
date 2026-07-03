import React, { useState } from "react";
import "./index.css";

const Projects = () => {
  // Safe runtime check to prevent "process is not defined" crashes
  const SECRET_KEY = typeof process !== "undefined" && process.env 
    ? process.env.REACT_APP_SECRET_KEY 
    : "";

  // Initial state with your existing projects organized by category
  const [categorizedProjects, setCategorizedProjects] = useState([
    {
      category: "LLMs & Gen AI",
      projects: [
        {
          title: "Building EduReach — Agentic College Chatbot",
          description: "Built an AI-powered college assistance platform with an Agentic RAG chatbot, AI voice counselor, and JWT authentication for personalized student guidance.",
          tech: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB Atlas", "Google Gemini AI", "Agentic RAG", "Tailwind CSS"],
          github: "https://github.com/poojithabada/edureach-platform",
          demo: "https://edureach-platform-lake.vercel.app",
        },
      ],
    },
    {
      category: "Full Stack Projects",
      projects: [
        {
          title: "AI-Web Studio",
          description: "AI-powered web builder that transforms natural language prompts into complete web applications with live preview, code generation, and deployment-ready structure.",
          tech: ["React.js", "Vite", "JavaScript", "Node.js", "Express.js", "MongoDB", "Google Gemini AI", "JWT Authentication"],
          github: "https://github.com/poojithabada/AI-Powered-web-Builder.git",
          demo: "https://ai-powered-web-builder-wcmf.vercel.app"
        },
      ],
    },
    {
      category: "Front End Projects",
      projects: [
        {
          title: "AI-Powered Resume Builder",
          description: "Build a full-stack AI-powered resume builder.",
          tech: ["React.js", "TypeScript", "Node.js", "Express.js", "Google Gemini AI", "LangChain", "Tailwind CSS"],
          github: "https://github.com/poojithabada/AI-Powered-Resume-Builder",
          demo: "https://ai-powered-resume-builder-eight.vercel.app",
        },
      ],
    }
  ]);

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(""); 
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(null); 
  
  // Security and Form states
  const [enteredKey, setEnteredKey] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", description: "", tech: "", github: "", demo: "" });

  const handleOpenAddModal = (categoryIndex) => {
    setModalAction("add");
    setActiveCategoryIndex(categoryIndex);
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
    const techArray = newProject.tech.split(",").map(item => item.trim()).filter(Boolean);

    const createdProject = {
      title: newProject.title,
      description: newProject.description,
      tech: techArray,
      github: newProject.github || "#",
      demo: newProject.demo || "#"
    };

    const updatedCategories = categorizedProjects.map((group, index) => {
      if (index === activeCategoryIndex) {
        return { ...group, projects: [...group.projects, createdProject] };
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
    setNewProject({ title: "", description: "", tech: "", github: "", demo: "" });
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
            
            <div className="projectsGrid">
              {group.projects.map((project, index) => (
                <div className="projectCard" key={index}>
                  <div className="projectContent">
                    <div className="cardHeaderRow">
                      <h4>{project.title}</h4>
                      <button 
                        className="deleteProjectBtn" 
                        onClick={() => handleOpenDeleteModal(groupIndex, index)}
                        title="Delete Project"
                      >
                        🗑️
                      </button>
                    </div>
                    <p>{project.description}</p>
                    <div className="techStack">
                      {project.tech.map((t, i) => (
                        <span key={i} className="techBadge">{t}</span>
                      ))}
                    </div>
                    <div className="projectLinks">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">Live Demo</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* MULTI-PURPOSE ACCESS CONTROL MODAL */}
      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="modalCloseBtn" onClick={closeAndResetModal}>&times;</button>
            
            {!isAuthorized && (modalAction === "delete" || modalAction === "add") ? (
              <form onSubmit={handleVerifyKey} className="modalForm">
                <h3>Admin Verification Required</h3>
                <p>
                  Enter your secret key to {modalAction} project 
                  {modalAction === "delete" && " permanently"}.
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
                <h3>Add Project to {categorizedProjects[activeCategoryIndex]?.category}</h3>
                
                <label>Project Title</label>
                <input 
                  type="text" 
                  value={newProject.title} 
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})} 
                  required 
                  className="modalInput"
                />

                <label>Description</label>
                <textarea 
                  value={newProject.description} 
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})} 
                  required 
                  className="modalInput text-area"
                />

                <label>Tech Stack (Comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="React, Express, MongoDB"
                  value={newProject.tech} 
                  onChange={(e) => setNewProject({...newProject, tech: e.target.value})} 
                  required 
                  className="modalInput"
                />

                <label>GitHub Repository URL</label>
                <input 
                  type="url" 
                  value={newProject.github} 
                  onChange={(e) => setNewProject({...newProject, github: e.target.value})} 
                  className="modalInput"
                />

                <label>Live Demo URL</label>
                <input 
                  type="url" 
                  value={newProject.demo} 
                  onChange={(e) => setNewProject({...newProject, demo: e.target.value})} 
                  className="modalInput"
                />

                <button type="submit" className="modalSubmitBtn">Publish Project</button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;