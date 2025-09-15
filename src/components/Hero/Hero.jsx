import React, { useState, useEffect, useRef } from "react";
import {
  FaCode,
  FaLaptopCode,
  FaDatabase,
  FaChevronDown,
  FaChevronUp,
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaDownload,
  FaCalendar,
} from "react-icons/fa";
import { FaReact } from "react-icons/fa6";
import { gsap } from "gsap";
import "./Hero.css";
import TextType from "../TextType.jsx";

// Small reusable count-up component
function CountUp({ end = 0, duration = 1200, formatFn }) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    startRef.current = start;
    const animate = (now) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(1, elapsed / duration);
      const current = Math.floor(progress * end);
      setValue(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(end);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration]);

  return <>{formatFn ? formatFn(value) : value}</>;
}

export default function Hero() {
  const [expanded, setExpanded] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const [pixelActive, setPixelActive] = useState(true);
  const [githubStats, setGithubStats] = useState(null);
  const [contributionData, setContributionData] = useState([]);
  const pixelGridRef = useRef(null);
  const cursorRef = useRef(null); // Splash cursor container

  const toggleExpand = () => setExpanded(!expanded);

  const handleSkillHover = (index) => setActiveSkill(index);
  const handleSkillLeave = () => setActiveSkill(null);

  // Generate mock contribution data (last 90 days)
  const generateContributionData = () => {
    const data = [];
    const today = new Date();

    for (let i = 89; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      data.push({
        date: date.toISOString().split("T")[0],
        count: Math.floor(Math.random() * 15),
        level: Math.min(4, Math.floor(Math.random() * 5)),
      });
    }
    return data;
  };

  // Mock GitHub data
  useEffect(() => {
    const fetchGithubData = async () => {
      setTimeout(() => {
        setGithubStats({
          public_repos: 24,
          followers: 18,
          following: 12,
          total_stars: 47,
          total_commits: 328,
        });
        setContributionData(generateContributionData());
      }, 1200);
    };
    fetchGithubData();
  }, []);

  // Pixel transition effect
  useEffect(() => {
    const startPixelTransition = () => {
      setPixelActive(true);
      setTimeout(() => setPixelActive(false), 2000);
    };
    startPixelTransition();
    const interval = setInterval(startPixelTransition, 6000);
    return () => clearInterval(interval);
  }, []);

  // Create pixel grid
  useEffect(() => {
    const gridSize = 12;
    const container = pixelGridRef.current;
    if (!container) return;

    container.innerHTML = "";
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;
        container.appendChild(pixel);
      }
    }

    const pixels = container.querySelectorAll(".pixel");
    if (pixels.length) {
      gsap.fromTo(
        pixels,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          stagger: { each: 0.02, from: "random" },
          onComplete: () => {
            gsap.to(pixels, {
              opacity: 0,
              duration: 0.5,
              stagger: { each: 0.02, from: "random" },
              delay: 1,
            });
          },
        }
      );
    }
  }, [pixelActive]);

  // Splash cursor effect (works on mouse + touch)
  useEffect(() => {
    const container = cursorRef.current;
    if (!container) return;

    const createSplash = (x, y) => {
      const splash = document.createElement("div");
      splash.className = "splash";
      splash.style.left = `${x}px`;
      splash.style.top = `${y}px`;
      container.appendChild(splash);

      splash.animate(
        [
          { transform: "scale(0)", opacity: 1 },
          { transform: "scale(1.5)", opacity: 0 },
        ],
        { duration: 500, easing: "ease-out" }
      );

      setTimeout(() => splash.remove(), 500);
    };

    const handleMouseMove = (e) => createSplash(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      for (let touch of e.touches) {
        createSplash(touch.clientX, touch.clientY);
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Render contribution graph cells
  const renderContributionGraph = () => {
    if (!contributionData.length) return null;

    const weeks = [];
    for (let i = 0; i < 13; i++) {
      weeks.push(contributionData.slice(i * 7, (i + 1) * 7));
    }

    return (
      <div className="contribution-center">
        <div className="contribution-graph">
          <div className="graph-header">
            <h4>Last 90 Days Activity</h4>
            <div className="graph-legend">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div key={level} className="legend-cell" data-level={level}></div>
              ))}
              <span>More</span>
            </div>
          </div>

          <div className="graph-content">
            <div className="day-labels">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <div key={i} className="day-label">
                  {d}
                </div>
              ))}
            </div>

            <div className="contributions-grid">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="contribution-week">
                  {week.map((day, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={`contribution-cell level-${day.level}`}
                      data-level={day.level}
                      title={`${day.count} contributions on ${day.date}`}
                      style={{
                        backgroundColor:
                          window.innerWidth < 640
                            ? `rgba(173, 216, 230, ${0.3 + 0.15 * day.level})`
                            : "",
                      }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="home" className="hero" ref={cursorRef}>
      <div className="hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-left">
          <div className="hero-content">
            <h2 className="hero-title">
              <TextType
                text={[
                  "Hi, I'm Janani",
                  "Full-Stack Developer",
                  "Web Enthusiast",
                  "Problem Solver",
                ]}
                as="span"
                typingSpeed={75}
                pauseDuration={1500}
                deletingSpeed={40}
                loop={true}
                showCursor={true}
                cursorCharacter="|"
                textColors={["#ffffff", "#9d174d", "#41a6ff", "#ffb800"]}
                className="hero-title-text"
              />
            </h2>
            <p className="hero-desc">
              I'm a passionate <strong>Full-Stack Developer</strong> who loves building interactive,
              responsive, and modern web applications. Skilled in both frontend & backend technologies.
            </p>

            {/* Skills Section */}
            <div className="skills">
              {[
                { icon: <FaCode className="skill-icon" />, name: "JavaScript" },
                { icon: <FaReact className="skill-icon" />, name: "React.js" },
                { icon: <FaDatabase className="skill-icon" />, name: "Databases" },
                { icon: <FaLaptopCode className="skill-icon" />, name: "UI/UX" },
              ].map((skill, index) => (
                <div
                  key={index}
                  className={`skill-card ${activeSkill === index ? "active" : ""}`}
                  onMouseEnter={() => handleSkillHover(index)}
                  onMouseLeave={handleSkillLeave}
                >
                  {skill.icon}
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="hero-buttons">
              <a href="/JananiK Resume.pdf" className="btn resume-btn">
                <FaDownload /> Resume
              </a>
              <button onClick={toggleExpand} className="btn explore-btn">
                {expanded ? "Show Less" : "Explore More"}{" "}
                {expanded ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="hero-right">
          <div className="profile-container">
            <div className="circular-image-frame">
              <div className="profile-image">
                <img src="/jaini.jpg" alt="Janani - Full Stack Developer" />
                <div className="pixel-overlay" ref={pixelGridRef}></div>
                {pixelActive && (
                  <div className="pixel-text-overlay">
                    <span>Full Stack Developer</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <div className={`expandable-content ${expanded ? "expanded" : ""}`}>
        <div className="developer-stats">
          <h3>Developer Insights</h3>
        {/* GitHub Statistics */} <div className="stats-section"> 
            <h4> <FaGithub /> GitHub Activity </h4>
             {githubStats ? ( <div className="stats-grid"> 
                <div className="stat-card insight-card"> 
                    <div className="stat-icon"> <FaCode />
                     </div> <div className="stat-info">
                         <h3> <CountUp end={githubStats.public_repos} duration={900} />+ </h3> 
                         <p>Public Repositories</p> 
                         </div> 
                         </div> 
                         <div className="stat-card insight-card"> 
                            <div className="stat-icon">
                                 <FaStar /> 
                                 </div>
                                  <div className="stat-info"> 
                                    <h3> <CountUp end={githubStats.total_stars} duration={1000} />+ </h3>
                                     <p>Stars Earned</p> 
                                     </div>
                                      </div>
                                       <div className="stat-card insight-card"> 
                                        <div className="stat-icon"> <FaCodeBranch /> 
                                        </div> 
                                        <div className="stat-info"> <h3>
                                             <CountUp end={githubStats.total_commits} duration={1200} />+ </h3>
                                              <p>Total Commits</p>
                                               </div>
                                                </div>
                                                 <div className="stat-card insight-card">
                                                     <div className="stat-icon"> <FaGithub />
                                                      </div> 
                                                      <div className="stat-info">
                                                         <h3> <CountUp end={githubStats.followers} duration={900} /> </h3> 
                                                         <p>GitHub Followers</p>
                                                          </div>
                                                           </div> 
                                                           </div>
                                                         ) : ( 
                                                         <div className="loading-stats">
                                                             <div className="loading-spinner">
                                                                </div> 
                                                                <p>Loading GitHub statistics...</p>
                                                                 </div> 
                                                                
                                                                )} 
                                                                </div>

          {/* Contribution Graph */}
          <div className="stats-section">
            <h4>
              <FaCalendar /> Contribution Activity
            </h4>
            {contributionData.length > 0
              ? renderContributionGraph()
              : (
                <div className="loading-stats">
                  <div className="loading-spinner"></div>
                  <p>Loading contribution data...</p>
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
