import React, { useState } from "react";
import "./index.css";

const Projects = () => {
  // 1. Define your secret key here
  const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

  // 2. Initial state with your existing projects organized by category
  const [categorizedProjects, setCategorizedProjects] = useState([
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
      category: "Full Stack Projects",
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

  // States to control form and authorization modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const [enteredKey, setEnteredKey] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Form input states
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    demo: ""
  });

  // Step 1: Open verification when user clicks "Add Project"
  const handleOpenAddModal = (categoryIndex) => {
    setActiveCategoryIndex(categoryIndex);
    setIsModalOpen(true);
  };

  // Step 2: Validate the secret key
  const handleVerifyKey = (e) => {
    e.preventDefault();
    if (enteredKey === SECRET_KEY) {
      setIsAuthorized(true);
    } else {
      alert("Invalid Secret Key! Access Denied.");
      setEnteredKey("");
    }
  };

  // Step 3: Handle project form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Format technologies from a comma-separated string to an array
    const techArray = newProject.tech.split(",").map(item => item.trim()).filter(Boolean);

    const createdProject = {
      title: newProject.title,
      description: newProject.description,
      tech: techArray,
      github: newProject.github || "#",
      demo: newProject.demo || "#"
    };

    // Immutably update the state array inside the specific category
    const updatedCategories = categorizedProjects.map((group, index) => {
      if (index === activeCategoryIndex) {
        return {
          ...group,
          projects: [...group.projects, createdProject]
        };
      }
      return group;
    });

    setCategorizedProjects(updatedCategories);
    closeAndResetModal();
  };

  const closeAndResetModal = () => {
    setIsModalOpen(false);
    setIsAuthorized(false);
    setEnteredKey("");
    setActiveCategoryIndex(null);
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
              <button 
                className="addProjectBtn"
                onClick={() => handleOpenAddModal(groupIndex)}
              >
                + Add Project
              </button>
            </div>
            
            <div className="projectsGrid">
              {group.projects.map((project, index) => (
                <div className="projectCard" key={index}>
                  <div className="projectContent">
                    <h4>{project.title}</h4>
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

      {/* MODAL WINDOW FOR PROTECTION & PROJECT CREATION */}
      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <button className="modalCloseBtn" onClick={closeAndResetModal}>&times;</button>
            
            {/* Phase 1: Key Check */}
            {!isAuthorized ? (
              <form onSubmit={handleVerifyKey} className="modalForm">
                <h3>Admin Verification Required</h3>
                <p>Enter your secret key to add a project to <strong>{categorizedProjects[activeCategoryIndex]?.category}</strong>.</p>
                <input 
                  type="password" 
                  placeholder="Secret Key" 
                  value={enteredKey} 
                  onChange={(e) => setEnteredKey(e.target.value)} 
                  required 
                  className="modalInput"
                />
                <button type="submit" className="modalSubmitBtn">Verify Identity</button>
              </form>
            ) : (
              /* Phase 2: Actual Submission Form */
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

                <label>Tech Stack (Comma-separated, e.g. React, Node, Git)</label>
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