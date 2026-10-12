import "./App.css";

function App() {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="logo">ShopKart</div>

        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button>🔍</button>
        </div>

        <nav className="nav">
          <a href="/">Home</a>
          <a href="/">Today's Deals</a>
          <a href="/">Orders</a>
          <a href="/">Cart 🛒</a>
          <a href="/">Login</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main">
        <h1>Welcome to ShopKart</h1>
        <p>Amazon-inspired Header & Footer using React</p>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div>
            <h3>Get to Know Us</h3>
            <p>About Us</p>
            <p>Careers</p>
            <p>Press Releases</p>
          </div>

          <div>
            <h3>Connect With Us</h3>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
          </div>

          <div>
            <h3>Customer Service</h3>
            <p>Help Center</p>
            <p>Returns</p>
            <p>Shipping</p>
          </div>

          <div>
            <h3>Contact</h3>
            <p>Email: support@shopkart.com</p>
            <p>Phone: +91 9686801933</p>
          </div>
        </div>

        <hr />

        <p className="copyright">
          © 2026 ShopKart. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

export default App;