import React, { useState } from 'react';
import './index.css';
import { Link } from 'react-scroll';
import menu from '../../assets/menu.png';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar">
      <h1 class="logoText">Portfolio</h1>

      <div className="desktopMenu">
        <Link activeClass="active" to="intro" spy={true} offset={-100} duration={500} className="desktopMenuListItem">Home</Link>
        <Link activeClass="active" to="skills" spy={true} offset={-100} duration={500} className="desktopMenuListItem">About</Link>
        <Link activeClass="active" to="projects" spy={true} offset={-100} duration={500} className="desktopMenuListItem">Projects</Link>
        <Link activeClass="active" to="works" spy={true} offset={-100} duration={500} className="desktopMenuListItem">Certifications</Link>
        <Link activeClass="active" to="contactPage" spy={true} offset={-100} duration={500} className="desktopMenuListItem">Experience </Link>
      </div>

      <button className="desktopMenuBtn" onClick={() => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
      }}>
        Contact me
      </button>

      <img
        src={menu}
        alt="Menu"
        className="mobMenu"
        onClick={() => setShowMenu(!showMenu)}
      />
        <div className="navMenu" style={{display:showMenu?'flex':'none'}}>
          <Link activeClass="active" to="intro" spy={true} offset={-100} duration={500} className="listItem" onClick={() => setShowMenu(false)}>Home</Link>
          <Link activeClass="active" to="skills" spy={true} offset={-100} duration={500} className="listItem" onClick={() => setShowMenu(false)}>About</Link>
          <Link activeClass="active" to="works" spy={true} offset={-100} duration={500} className="listItem" onClick={() => setShowMenu(false)}>Portfolio</Link>
          <Link activeClass="active" to="contactPage" spy={true} offset={-100} duration={500} className="listItem" onClick={() => setShowMenu(false)}>Clients</Link>
          <Link activeClass="active" to="contactPage" spy={true} offset={-100} duration={500} className="listItem" onClick={() => setShowMenu(false)}>Contact</Link>
        </div>
    </nav>
  );
};

export default Navbar;
