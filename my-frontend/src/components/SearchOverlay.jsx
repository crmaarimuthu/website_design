import { useState } from "react";
import "../styles/SearchOverlay.css";

function SearchOverlay({ open, setOpen }) {

const [search,setSearch] = useState("");

if(!open) return null;

return(

<div className="search-overlay">

<button
className="search-close"
onClick={()=>setOpen(false)}
>
✕
</button>

<div className="search-center">

<input
type="text"
placeholder="Search..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="search-input"
/>

</div>

</div>

);

}

export default SearchOverlay;