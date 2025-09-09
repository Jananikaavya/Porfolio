import React, { useState, useEffect } from 'react';
import './Certificates.css';

const Certificates = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const certificates = [
    {
      id: 1,
      title: "Full Stack Web Development",
      issuer: "Slytherin Private Limited.Sol",
      date: "July 2025",
      description: "Mastered React, Node.js, Express, MongoDB and more to build full-stack applications.",
      image: "/fullstack.png",
      link: "/certificate fullstack.pdf"
    },
    {
      id: 2,
      title: "Web Development Intern ",
      issuer: "Slytherin Private Limited.Sol",
      date: "May 2025",
      description: "This is 2month  intern, which give me a  good expirence towards web development.",
      image: "/web.png",
      link: "/certificate Webdevelopment.pdf"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      issuer: "Slytherin Private Limited.Sol",
      date: "January 202",
      description: "Learned user-centered design principles and created interactive prototypes.",
      image: "/uiux.png",
      link: "/certificate uiux.pdf"
    },
    {
      id: 4,
      title: "Microsoft Word -advance level",
      issuer: "Naan Mudhalvan",
      date: "April 2024",
      description: "This course was organised by naan mudhalvan platform ,this course helps me to know about microsoft in premium.",
      image: "/word.png",
      link: "nm.png"
    },
    {
      id: 5,
      title: "AWS Cloud Foundations",
      issuer: "AWS Academy",
      date: "Nov 2024",
      description: "This course was organised by AWS Academy embedded with cloud Foundations.",
      image: "/aws.png",
      link: "/aws.png"
    },
    {
      id: 6,
      title: "Red Hat Foundations",
      issuer: "Red Hat Academy",
      date: "Nov 2024",
      description: "This course was organised by Red Hat Academy the course embedded with linux Fundamentals.",
      image: "/red.png",
      link: "/red.png"
    },
    {
      id: 7,
      title: "Dipolma of Completion ",
      issuer: "UI Path",
      date: "Mar 2024",
      description: "This course was organised by UI Path Academy embedded with control flow in studio.",
      image: "/flow.png",
      link: "/flow.png"
    },
    {
      id: 8,
      title: "Dipolma of Completion",
      issuer: "UI Path",
      date: "Mar 2024",
      description: "This course was organised by UI Path Academy embedded with Explore automation Development with UI path studio.",
      image: "/8.png",
      link: "/8.png"
    }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % certificates.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, certificates.length]);

  const nextCertificate = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % certificates.length);
  };

  const prevCertificate = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + certificates.length) % certificates.length);
  };

  const goToCertificate = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="certificate-section" id="certificates">
      <div className="certificate-container">
        <div className="section-header">
          <h2>My Certifications</h2>
          <p>Proof of my continuous learning and professional development</p>
        </div>

        <div 
          className="certificate-carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="certificate-track">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className={`certificate-card ${index === activeIndex ? 'active' : ''} ${
                  index === (activeIndex - 1 + certificates.length) % certificates.length ? 'prev' : ''
                } ${index === (activeIndex + 1) % certificates.length ? 'next' : ''}`}
                style={{ '--i': index }}
              >
                <div className="certificate-inner">
                  <div className="certificate-front">
                    <div className="certificate-ribbon">Achievement</div>
                    <div className="certificate-image">
                      <img src={cert.image} alt={cert.title} />
                      <div className="certificate-overlay">
                        <button className="view-btn">View Details</button>
                      </div>
                    </div>
                    <div className="certificate-content">
                      <h3>{cert.title}</h3>
                      <p className="issuer">{cert.issuer}</p>
                      <p className="date">{cert.date}</p>
                    </div>
                  </div>
                  <div className="certificate-back">
                    <h3>{cert.title}</h3>
                    <p>{cert.description}</p>
                    <div className="certificate-actions">
                      <a href={cert.link} className="verify-btn" target="_blank" rel="noopener noreferrer">
                        Verify Certificate
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-nav carousel-prev" onClick={prevCertificate}>
            &#10094;
          </button>
          <button className="carousel-nav carousel-next" onClick={nextCertificate}>
            &#10095;
          </button>
        </div>

        <div className="certificate-indicators">
          {certificates.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToCertificate(index)}
            />
          ))}
        </div>

        <div className="achievement-stats">
          <div className="stat">
            <h3>{certificates.length}+</h3>
            <p>Certifications</p>
          </div>
          <div className="stat">
            <h3>500+</h3>
            <p>Hours of Learning</p>
          </div>
          <div className="stat">
            <h3>12</h3>
            <p>Learning Platforms</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;