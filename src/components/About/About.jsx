import React from "react";
import "./About.css";

const statsData = [
  { value: "20", label: "Digital Products" },        // fa-code
  { value: "280", label: "Direct Clients" },         // fa-users
  { value: "3K", label: "Total Projects" },          // fa-briefcase
  { value: "8M", label: "Lines of Code" },           // fa-keyboard
];

const skillsData = [
  { name: "Html", percent: 90, icon: "fa-html5" },
  { name: "Css", percent: 70, icon: "fa-css3-alt" },
  { name: "Javascript", percent: 75, icon: "fa-js-square" },
  { name: "React", percent: 85, icon: "fa-react" },
  { name: "Vue", percent: 65, icon: "fa-vuejs" },
  { name: "Php", percent: 80, icon: "fa-php" }
];


const About = () => {
  return (
    <section className="about-section">
      {/* Header Section */}
      <div className="about-header">
        <h5>About Me</h5>
        <h2>A Passionate Developer Who Loves to Code</h2>
      </div>
      <div className="about-content">
        {/* Profile Image + Years of Experience Card */}
        <div className="about-left">
          <div className="profile-img-container">
            <img src="/jaini.jpg" alt="Profile" className="profile-img" />
            <div className="experience">
              <h3>3</h3>
              <p>Successful Years</p>
            </div>
          </div>
        </div>
        {/* Bio Card */}
        <div className="about-right">
          <div className="bio">
            <h3>My Bio</h3>
            <p>
              Hello! I'm a passionate developer with expertise in front-end and back-end development. I love building interactive web applications and constantly improving my skills.
            </p>
            <div className="bio-details">
              <div><strong>Name:</strong> Janani k</div>
              <div><strong>Email:</strong> jananikaavya1104@gmail.com</div>
              <div><strong>Phone:</strong> +91 7200328633</div>
              <div><strong>Address:</strong>  Avadi, Chennai</div>
              <div><strong>DOB:</strong> Nov 17, 2004</div>
              <div><strong>Freelance:</strong> Available</div>
            </div>
            <button className="download-btn">
              <i className="fa-solid fa-download" style={{ marginRight: "7px" }}></i>
               <a href="/JananiK Resume.pdf"></a>
              Download CV
            </button>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="stats">
        {statsData.map((stat, idx) => (
          <div className="stat-box" key={idx}>
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
      {/* Skills Section */}
     <div className="skills-section">
  <h3>I Work Hard to Improve My Skills Regularly</h3>
  {skillsData.map((skill, idx) => (
    <div className="skill" key={idx}>
      <p>
        <i className={`fab ${skill.icon}`} style={{marginRight: "8px"}}></i>
        {skill.name}
      </p>
      <div className="skill-bar">
        <div
          style={{
            width: `${skill.percent}%`,
            transition: "width 1.4s cubic-bezier(.58,.22,.34,.83)"
          }}
        ></div>
      </div>
    </div>
  ))}
</div>

    </section>
  );
};

export default About;

