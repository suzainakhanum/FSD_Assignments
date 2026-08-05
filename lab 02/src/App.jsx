import "./App.css";

function App() {
  return (
    <div className="container">

      <section className="hero">

        <div className="left">

          <span className="badge">MODERN WEB STUDIO</span>

          <h1>
            Build fast, debug smarter,
            <br />
            and ship beautifully.
          </h1>

          <p>
            Create responsive web experiences with a refined layout,
            polished interactions, and a browser-first workflow.
          </p>

          <div className="buttons">
            <button
              className="primary"
              onClick={() => alert("Live Preview Started")}
            >
              Launch Preview
            </button>

            <button className="secondary">
              Inspect DevTools
            </button>
          </div>

          <div className="status">
            Live Preview is Running
          </div>

        </div>

        <div className="right">

          <div className="card">

            <h2>Browser-based Workflow</h2>

            <ul>
              <li>Responsive layout testing</li>
              <li>Console and Network inspection</li>
              <li>Live CSS editing</li>
            </ul>

          </div>

        </div>

      </section>

      <section className="features">

        <div className="feature">
          <h3>Responsive Foundations</h3>
          <p>Flexible grids and modern spacing.</p>
        </div>

        <div className="feature">
          <h3>Interactive Polish</h3>
          <p>Beautiful animations and buttons.</p>
        </div>

        <div className="feature">
          <h3>Debugging Tools</h3>
          <p>Inspect, debug and improve your application.</p>
        </div>

      </section>

    </div>
  );
}

export default App;