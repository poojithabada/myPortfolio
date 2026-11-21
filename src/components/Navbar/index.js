import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-scroll';
import menu from '../../assets/menu.png';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => setShowMenu(false);

  return (
    <nav className="navbar">
      <h1 className="logoText">Portfolio</h1>

      {/* Desktop Navigation */}
      <div className="desktopMenu">
        <Link activeClass="active" to="intro"      spy smooth offset={-80} duration={500} className="desktopMenuListItem">Home</Link>
        <Link activeClass="active" to="skills"     spy smooth offset={-80} duration={500} className="desktopMenuListItem">About</Link>
        <Link activeClass="active" to="experience" spy smooth offset={-80} duration={500} className="desktopMenuListItem">Experience</Link>
        <Link activeClass="active" to="projects"   spy smooth offset={-80} duration={500} className="desktopMenuListItem">Projects</Link>
        <Link activeClass="active" to="works"      spy smooth offset={-80} duration={500} className="desktopMenuListItem">Certifications</Link>
      </div>

      {/* Contact Me CTA */}
      <button
        className="desktopMenuBtn"
        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
      >
        Contact Me
      </button>

      {/* Mobile hamburger */}
      <img
        src={menu}
        alt="Menu"
        className="mobMenu"
        onClick={() => setShowMenu(!showMenu)}
      />

      {/* Mobile dropdown */}
      <div className="navMenu" style={{ display: showMenu ? 'flex' : 'none' }}>
        <Link activeClass="active" to="intro"      spy smooth offset={-80} duration={500} className="listItem" onClick={closeMenu}>Home</Link>
        <Link activeClass="active" to="skills"     spy smooth offset={-80} duration={500} className="listItem" onClick={closeMenu}>About</Link>
        <Link activeClass="active" to="experience" spy smooth offset={-80} duration={500} className="listItem" onClick={closeMenu}>Experience</Link>
        <Link activeClass="active" to="projects"   spy smooth offset={-80} duration={500} className="listItem" onClick={closeMenu}>Projects</Link>
        <Link activeClass="active" to="works"      spy smooth offset={-80} duration={500} className="listItem" onClick={closeMenu}>Certifications</Link>
        <Link activeClass="active" to="contact"    spy smooth offset={-80} duration={500} className="listItem" onClick={closeMenu}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
