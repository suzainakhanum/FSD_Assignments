import { useState } from "react";
import "./App.css";

function App() {
  // All form data is stored in state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    password: "",
    event: "",
  });

  // Toast state
  const [toast, setToast] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Show toast
  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check empty fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.college ||
      !formData.password ||
      !formData.event
    ) {
      showToast("⚠️ Please fill all the fields");
      return;
    }

    // Email validation
    if (!formData.email.includes("@")) {
      showToast("❌ Please enter a valid email");
      return;
    }

    // Phone validation
    if (formData.phone.length < 10) {
      showToast("📱 Enter a valid phone number");
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      showToast("🔐 Password must be at least 6 characters");
      return;
    }

    // Success
    showToast("🎉 Registration successful!");

    console.log("Submitted Data:", formData);

    // Clear form
    setFormData({
      name: "",
      email: "",
      phone: "",
      college: "",
      password: "",
      event: "",
    });
  };

  return (
    <div className="app">

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}

      {/* Header */}
      <header className="header">
        <h2>TechFest 🚀</h2>

        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#register">Register</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">

          <p className="small-title">
            WELCOME TO
          </p>

          <h1>TechFest 2026</h1>

          <p>
            Join an exciting technology event where
            students, developers and innovators come together.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("register")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Register Now
          </button>

        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">

        <h2>About The Event</h2>

        <p className="about-text">
          TechFest is a student-focused technology event
          featuring coding competitions, UI/UX challenges
          and technical workshops.
        </p>

        <div className="cards">

          <div className="card">
            <h3>💻 Coding</h3>
            <p>
              Test your programming and problem-solving skills.
            </p>
          </div>

          <div className="card">
            <h3>🎨 UI/UX</h3>
            <p>
              Design creative and user-friendly interfaces.
            </p>
          </div>

          <div className="card">
            <h3>🚀 Workshop</h3>
            <p>
              Learn new technologies from industry experts.
            </p>
          </div>

        </div>
      </section>

      {/* Registration Section */}
      <section className="register" id="register">

        <div className="form-container">

          <h2>Event Registration</h2>

          <p>
            Fill in your details to register for the event.
          </p>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />

            {/* Email */}
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            {/* Phone */}
            <label>Phone</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />

            {/* College */}
            <label>College</label>

            <input
              type="text"
              name="college"
              placeholder="Enter your college"
              value={formData.college}
              onChange={handleChange}
            />

            {/* Password */}
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            {/* Event */}
            <label>Select Event</label>

            <select
              name="event"
              value={formData.event}
              onChange={handleChange}
            >
              <option value="">
                -- Choose an event --
              </option>

              <option value="Coding Competition">
                Coding Competition
              </option>

              <option value="UI/UX Challenge">
                UI/UX Challenge
              </option>

              <option value="Tech Workshop">
                Tech Workshop
              </option>
            </select>

            {/* Submit */}
            <button type="submit">
              Submit Registration
            </button>

          </form>

        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2026 TechFest. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;