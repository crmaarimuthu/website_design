import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TopBanner from "./components/TopBanner";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import PortraitGallery from "./pages/PortraitGallery";
import About from "./pages/About";

import "./styles/main.css";

function App() {

return(
<Router>

<Navbar/>

<Routes>

<Route
path="/"
element={
<>
<TopBanner/>
<Home/>
</>
}
/>

<Route path="/services" element={<Services/>}/>
<Route path="/portfolio" element={<Services/>}/>
<Route path="/wedding-films" element={<Services/>}/>
<Route path="/booking" element={<Booking/>}/>
<Route path="/about" element={<About/>}/>
<Route path="/contact" element={<Contact/>}/>
<Route path="/gallery/:type" element={<PortraitGallery/>}/>

</Routes>

<Footer/>

</Router>
);
}

export default App;