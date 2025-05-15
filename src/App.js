import React from "react";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Contactme from "./components/Contact";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Intro />
      <Skills />
      <Projects />
      <Certifications />
      <Contactme />
    </div>
  );
}

export default App;
