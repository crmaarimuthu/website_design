import logo from "../assets/images/tamil_logo.jpg";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-section">
        <img src={logo} alt="Studio Logo" className="logo-img" />
        <div className="logo-text">
          <span className="logo-small">Stories by</span>
          <span className="logo-big">tamil digital</span>
        </div>
      </div>

      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">Portfolio</a>
        <a href="#">Gallery</a>
        <a href="#">Wedding Films</a>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
      </div>

      <div className="search-icon">🔍</div>
    </nav>
  );
}

export default Navbar;