import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/tamil_logo.jpg";
import SearchOverlay from "./SearchOverlay";
import "../styles/Navbar.css";

function Navbar(){

const [searchOpen,setSearchOpen] = useState(false);
const [menuOpen,setMenuOpen] = useState(false);

return(

<>

<nav className="navbar">

{/* LOGO */}

<div className="logo-section">

<img src={logo} className="logo-img" alt="logo"/>

<div className="logo-text">
<span className="logo-small">Stories by</span>
<span className="logo-big">Tamil Digital</span>
</div>

</div>

{/* DESKTOP MENU */}

<div className="nav-links">

<Link to="/">Home</Link>
<Link to="/services">Services</Link>
<Link to="/portfolio">Portfolio</Link>
<Link to="/gallery/woman">Gallery</Link>
<Link to="/wedding-films">Wedding Films</Link>
<Link to="/booking">Booking</Link>
<Link to="/about">About Us</Link>
<Link to="/contact">Contact Us</Link>

</div>

{/* SEARCH */}

<div
className="search-icon"
onClick={()=>setSearchOpen(true)}
>
🔍
</div>

{/* HAMBURGER */}

<div
className="menu-icon"
onClick={()=>setMenuOpen(true)}
>
☰
</div>

</nav>


{/* MOBILE MENU */}

<div className={menuOpen ? "mobile-menu active" : "mobile-menu"}>

<div className="mobile-header">

<img src={logo} className="logo-img" alt="logo"/>

<button
className="close-menu"
onClick={()=>setMenuOpen(false)}
>
✕
</button>

</div>

<div className="mobile-links">

<Link to="/" onClick={()=>setMenuOpen(false)}>Home</Link>
<Link to="/services" onClick={()=>setMenuOpen(false)}>Services</Link>
<Link to="/portfolio" onClick={()=>setMenuOpen(false)}>Portfolio</Link>
<Link to="/gallery/woman" onClick={()=>setMenuOpen(false)}>Gallery</Link>
<Link to="/wedding-films" onClick={()=>setMenuOpen(false)}>Wedding Films</Link>
<Link to="/booking" onClick={()=>setMenuOpen(false)}>Booking</Link>
<Link to="/about" onClick={()=>setMenuOpen(false)}>About Us</Link>
<Link to="/contact" onClick={()=>setMenuOpen(false)}>Contact Us</Link>

</div>

</div>

<SearchOverlay open={searchOpen} setOpen={setSearchOpen}/>

</>

);

}

export default Navbar;