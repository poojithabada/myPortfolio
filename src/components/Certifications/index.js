import React, { Component } from 'react';
import './index.css';
import staticWebsite from "../../assets/staticWebsite.png";
import responsiveWebiste from "../../assets/responsiveWebiste.png";
import flexbox from "../../assets/flexbox.png";
import dynamicWeb from "../../assets/dynamicWeb.png";
import javascript from "../../assets/javascript.png";
import databaseSQL from "../../assets/databaseSQL.png";
import NodeJs from "../../assets/NodeJs.png";
import python from "../../assets/python.png";
import developerFoundations from "../../assets/developerFoundations.png";

class Certifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
    };
  }

  toggleShowAll = () => {
    this.setState((prevState) => ({
      showAll: !prevState.showAll,
    }));
  };

  render() {
    const { showAll } = this.state;

    const images = [
      staticWebsite,
      dynamicWeb,
      javascript,
      databaseSQL,
      NodeJs,
      python,
      developerFoundations,
      flexbox,
      responsiveWebiste,
    ];

    const visibleImages = showAll ? images : images.slice(0, 6);

    return (
      <section id="works">
        <h2 className="worksTitle">Certifications</h2>
        <span className="worksDesc">
          These certifications reflect my continuous learning and growth in web development. From building static and dynamic websites to mastering JavaScript, Node.js, react.js and databases, each course has sharpened my skills and strengthened my ability to deliver real-world solutions.
        </span>

        <div className="worksImgs">
  {visibleImages.map((img, index) => (
    <div className="certificateContainer" key={index}>
      <img src={img} alt={`certificate-${index}`} className="worksImg" />
      <a
        href="https://www.ccbp.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkIcon"
      >
        🔗
      </a>
    </div>
  ))}
</div>


        <button className="workBtn" onClick={this.toggleShowAll}>
          {showAll ? "Show less" : "See more"}
        </button>
      </section>
    );
  }
}

export default Certifications;
