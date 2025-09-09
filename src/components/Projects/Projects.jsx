import React, { useEffect } from "react";
import "./Projects.css";

const projects = [
  {
    title: "E-commerce Website",
    image: "/ecommerce.png",
    description: "This is an basic landign page for the purpose of Ecommerce, developed using react+vite frameworks .",
    tech: "React, Node.js,Tailwindcss",
    link: "https://basicreact-landingpage.netlify.app/",
  },
  {
    title: "Portfolio Website",
    image: "/slytherin.png",
    description: "This is an portfolio website done for a startup company Slytherin private limi.solution as a freelancing project.",
    tech: "React, Node.js,css & js,Emailjs",
    link: "https://slytherin-company.netlify.app/",
  },
  {
    title: "Library Management Website",
    image: "/lib.png",
    description: "The Library management website is developed using python language, this is an full stack website with authentication and storing.",
    tech: "Python , Flask framework, matlib ,SQL lite[database]",
    link: "https://library-management-hl21.onrender.com/",
  },
  {
    title: "TO-DO task Website",
    image: "/todo.png",
    description: "The TO-DO task generator website is developed using python language, this is an full stack website with authentication and storing.",
    tech: "Python , streamlit framework, matlib ,SQL lite[database]",
    link: "https://to-do-application-jj80.onrender.com/",
  },
  {
    title: " Registration Website",
    image: "/front.png",
    description: "The Registration website is developed using frontend languages, this website has 3types of personal needs...here we can get knowledge how can frontend languages works.",
    tech: "HTML,Tailwindcss, JS",
    link: "https://registration-a8xak8x75-jananis-projects-d939603d.vercel.app/",
  },
  {
    title: "Weather Forecasting Website",
    image: "/weather.png",
    description: "The Weather forecasting  website is developed using frontend languages with react framework, this website ensures how an weather predication in different countries can be predicted -done through by calling API.",
    tech: "React, OpenAI ApI ",
    link: "https://forecast-predict.netlify.app/",
  },
  
];

const Project = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".project-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => observer.observe(card));
  }, []);

  return (
    <section className="project-section">
      <h2 className="project-heading">My Projects</h2>
      <div className="project-grid">
        {projects.map((proj, index) => (
          <div className="project-card" key={index}>
            <div className="card-inner">
              {/* Front */}
              <div className="card-front">
                <img src={proj.image} alt={proj.title} />
                <div className="card-overlay">
                  <h3>{proj.title}</h3>
                </div>
              </div>

              {/* Back */}
              <div className="card-back">
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <p>
                  <strong>Tech:</strong> {proj.tech}
                </p>
                <a href={proj.link} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;
