import React from "react";
import "./index.css";

const projectData = [
  {
  title: "AI-Web Studio",
description: "AI-powered web builder that transforms natural language prompts into complete web applications with live preview, code generation, and deployment-ready structure.",
  tech: [
  "React.js",
  "Vite",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Mongoose",
  "Google Gemini AI",
  "JWT Authentication",
  "bcryptjs",
  "Axios",
  "React Router",
  "CSS3",
  "Render",
  "Vercel",
  "Git",
  "GitHub"
],
  github: "https://github.com/poojithabada/AI-Powered-web-Builder.git",
  demo: "https://ai-powered-web-builder-wcmf.vercel.app"
},
  {
    title: "AI-Powered Resume Builder",
    description: "Build a full-stack AI-powered resume builder.",
    tech: [
  "React.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB Atlas",
  "Mongoose",
  "Google Gemini AI",
  "LangChain",
  "JWT Authentication",
  "Google OAuth",
  "REST APIs",
  "Multer",
  "PDF.js",
  "Axios",
  "Tailwind CSS",
  "Render",
  "Vercel",
  "Git",
  "GitHub"
],
    github: "https://github.com/poojithabada/AI-Powered-Resume-Builder",
    demo: "https://ai-powered-resume-builder-eight.vercel.app",
  },
  {
    title: "Building EduReach — Agentic College Chatbot",
    description: "Built an AI-powered college assistance platform with an Agentic RAG chatbot, AI voice counselor, and JWT authentication for personalized student guidance.",
    tech: [
  "React.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB Atlas",
  "Mongoose",
  "JWT Authentication",
  "Google Gemini AI",
  "Agentic RAG",
  "AI Tool Calling",
  "Axios",
  "Tailwind CSS",
  "REST APIs",
  "Render",
  "Vercel",
  "Git",
  "GitHub"
],
    github: "https://github.com/poojithabada/edureach-platform",
    demo: "https://poojiwikipidea.ccbp.tech",
  },
];

const Projects = () => {
  return (
    <section className="projectsSection" id="projects">
      <h2 className="projectsTitle">Projects</h2>
      <p className="projectsIntro">
        Some recent projects. Click below to check code and live demos.
      </p>

      <div className="projectsGrid">
        {projectData.map((project, index) => (
          <div className="projectCard" key={index}>
            <div className="projectContent">
              <h3>{project.title}</h3>
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
    </section>
  );
};

export default Projects;
