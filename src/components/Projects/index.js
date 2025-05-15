import React from "react";
import "./index.css";

const projectData = [
  {
    title: "Generative AI",
    description: "A personal portfolio to showcase my skills and projects.",
    tech: ["HTML", "CSS", "JS", "OpenAI"],
    github: "https://github.com/poojithabada/generative-AI",
    demo: "https://poojithabada.ccbp.tech",
  },
  {
    title: "Todos Application",
    description: "A to-do list app with CRUD operations and local storage.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/poojithabada/todos-application",
    demo: "https://poojittodosapp.ccbp.tech",
  },
  {
    title: "Mini wikipedia Search Application",
    description: "A simple app to search and view Wikipedia summaries using its API.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/poojithabada/wikipidea-search-application",
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
