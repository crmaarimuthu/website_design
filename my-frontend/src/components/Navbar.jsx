import { useState } from "react";
import logo from "../assets/images/tamil_logo.jpg";
import "../styles/Navbar.css";

function Navbar() {

const [searchOpen,setSearchOpen] = useState(false);
const [search,setSearch] = useState("");

const handleSubmit=(e)=>{
e.preventDefault();
console.log("Search:",search);
};

return (

<nav className="navbar">

{/* LOGO */}

<div className="logo-section">
<img src={logo} alt="Studio Logo" className="logo-img"/>

<div className="logo-text">
<span className="logo-small">Stories by</span>
<span className="logo-big">tamil digital</span>
</div>
</div>

{/* LINKS */}

<div className="nav-links">
<a href="#">Home</a>
<a href="#">Services</a>
<a href="#">Portfolio</a>
<a href="#">Gallery</a>
<a href="#">Wedding Films</a>
<a href="#">About Us</a>
<a href="#">Contact Us</a>
</div>

{/* SEARCH */}

<div className="search-container">

<form
onSubmit={handleSubmit}
className={searchOpen ? "search-box active" : "search-box"}
>

<input
type="text"
placeholder="Search photos..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<button type="submit">🔍</button>

</form>

<div
className="search-icon"
onClick={()=>setSearchOpen(!searchOpen)}
>
🔍
</div>

</div>

</nav>

);

}

export default Navbar;