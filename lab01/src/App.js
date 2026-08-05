import "./App.css";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";

function App() {

  return (
    <div className="resume">

      <button className="download" onClick={() => window.print()}>
        Download / Print Resume
      </button>


      {/* Header */}
      <header className="header">

        <img
          src="/profile.jpg"
          alt="Suzaina Khanum"
          className="profile"
        />

        <div>
          <h1>Suzaina Khanum</h1>

          <h2>
            Aspiring Full Stack Java Developer
          </h2>

          <p>
            BCA (Hons) Student
          </p>


          <div className="contact">

            <span>
              <FaEnvelope/>
              suzainakhanumbca24@gmail.com
            </span>

            <span>
              <FaPhone/>
              +91 9686801933
            </span>

            <span>
              <FaLinkedin/>
              https://linkedin.com/in/suzainakhanum
            </span>

            <span>
              <FaGithub/>
              https://github.com/suzainakhanum
            </span>

          </div>

        </div>

      </header>



      <div className="main">


        {/* Left Side */}
        <section className="left">


          <h3>PROFILE</h3>

          <p>
            Passionate BCA (Hons) student with strong interest
            in Java programming, databases, and software
            development. Interested in building efficient
            applications and continuously learning modern
            technologies.
          </p>



          <h3>TECHNICAL SKILLS</h3>


          <ul>
            <li>Java</li>
            <li>JavaScript</li>
            <li>HTML & CSS</li>
            <li>React.js</li>
            <li>Spring Boot (Learning)</li>
            <li>MySQL</li>
            <li>SQL</li>
            <li>Git & GitHub</li>
            <li>Figma</li>
          </ul>



          <h3>STRENGTHS</h3>

          <ul>
            <li>Problem Solving</li>
            <li>Quick Learner</li>
            <li>Team Player</li>
            <li>Adaptability</li>
          </ul>



          <h3>LANGUAGES</h3>

          <ul>
            <li>English</li>
            <li>Hindi</li>
            <li>malayalam</li>
            <li>urdu</li>
            <li>kannada</li>
          </ul>


        </section>





        {/* Right Side */}
        <section className="right">


          <h3>EDUCATION</h3>

          <div className="item">

            <h4>
              Bachelor of Computer Applications (BCA Hons)
            </h4>

            <p>
              Currently Pursuing
            </p>

          </div>





          <h3>PROJECTS</h3>


          <div className="item">

            <h4>
              Student Management System
            </h4>

            <p>
              <b>Technology:</b> Java + MySQL
            </p>

            <p>
              Developed a CRUD based application to manage
              student records efficiently.
            </p>

          </div>



          <div className="item">

            <h4>
              Portfolio Website
            </h4>

            <p>
              <b>Technology:</b> React.js
            </p>

            <p>
              Created a responsive personal portfolio using React.
            </p>

          </div>




          <div className="item">

            <h4>
              Library Management System
            </h4>

            <p>
              <b>Technology:</b> Java + SQL
            </p>

            <p>
              Application for managing books, users,
              and issue-return records.
            </p>

          </div>






          <h3>CERTIFICATIONS</h3>

          <ul>

            <li>
              Java Programming
            </li>

            <li>
              Database Management System
            </li>

            <li>
              Web Development
            </li>

          </ul>





          <h3>INTERESTS</h3>

          <p>
            Full Stack Development, Java Programming,
            Database Design, UI/UX Design,
            Learning New Technologies
          </p>



        </section>


      </div>


    </div>
  );
}


export default App;