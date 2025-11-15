import React from "react";

const About = () => {
  return (
    <>
      <div className="about">
        <div className="about-container">
          <h1>About This Project</h1>
          <p className="intro-text">
            This URL Shortener is a simple yet powerful tool built using{" "}
            <strong>React.js</strong> for the frontend and{" "}
            <strong>Spring Boot</strong> for the backend.
          </p>

          <div className="about-content">
            <h3>✨ How It Works</h3>
            <ul>
              <li>Paste any long URL into the input box.</li>
              <li>The app generates a unique short code for it.</li>
              <li>You can share this short link anywhere.</li>
              <li>When clicked, it redirects to the original website instantly.</li>
            </ul>

            <h3>🛠️ Tech Stack</h3>
            <ul>
              <li><strong>Frontend:</strong> React.js, Axios, CSS</li>
              <li><strong>Backend:</strong> Spring Boot, Java, MySQL</li>
              <li><strong>Database:</strong> MySQL (stores URL mappings)</li>
            </ul>

            <h3>🚀 Project Goal</h3>
            <p>
              The goal of this project is to learn and build a practical full-stack
              application that connects frontend and backend through APIs, while
              keeping the design simple and the performance efficient.
            </p>

            <h3>📈 Future Enhancements</h3>
            <ul>
              <li>Click tracking and analytics for each short link.</li>
              <li>Custom aliases (choose your own short code).</li>
              <li>QR code generation for every short URL.</li>
              <li>User accounts and link management dashboard.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
