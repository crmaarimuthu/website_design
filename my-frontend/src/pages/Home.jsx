import { useState, useEffect } from "react";
import "../styles/main.css";
import { Link } from "react-router-dom";


import b1 from "../assets/images/banner1.jpg";
import b2 from "../assets/images/banner2.jpg";
import b3 from "../assets/images/banner3.jpg";
import b4 from "../assets/images/banner4.jpg";
import b5 from "../assets/images/banner5.jpg";
import b6 from "../assets/images/banner6.jpg";
import b7 from "../assets/images/banner7.jpg";
import b8 from "../assets/images/banner8.jpg";
import b9 from "../assets/images/banner9.jpg";
import b10 from "../assets/images/banner10.jpg";

const banners = [b1,b2,b3,b4,b5,b6,b7,b8,b9,b10];

function Home(){

const [index,setIndex]=useState(0);

useEffect(()=>{
const timer=setInterval(()=>{
setIndex((prev)=>(prev+1)%banners.length);
},4000);

return()=>clearInterval(timer);

},[]);

const next=()=>{
setIndex((index+1)%banners.length);
};

const prev=()=>{
setIndex((index-1+banners.length)%banners.length);
};

return(

<div>

{/* HERO SLIDER */}

<div className="hero-slider">

<img src={banners[index]} className="hero-img"/>

<button className="prev" onClick={prev}>❮</button>

<button className="next" onClick={next}>❯</button>

</div>


{/* SERVICES */}

<section className="services">

<h2>Our Services</h2>

<p className="service-text">
We Deliver Exceptional Service
Our commitment to excellence ensures every experience is tailored to meet your unique needs and exceed your expectations.
</p>

<div className="service-grid">

<Link to="/gallery/woman" className="service-card">
<img src={b1}/>
<h3>Woman Portrait →</h3>
</Link>

<Link to="/gallery/man" className="service-card">
<img src={b2}/>
<h3>Man Portrait →</h3>
</Link>

<Link to="/gallery/children" className="service-card">
<img src={b3}/>
<h3>Children Portrait →</h3>
</Link>

<Link to="/gallery/prewedding" className="service-card">
<img src={b4}/>
<h3>Pre-Wedding →</h3>
</Link>

<Link to="/gallery/fashion" className="service-card">
<img src={b5}/>
<h3>Fashion Photos →</h3>
</Link>

<Link to="/gallery/couple" className="service-card">
<img src={b6}/>
<h3>Couple Moment →</h3>
</Link>

</div>

</section>


{/* BLOG */}

<section className="blog">

<h2>Latest Blog & Articles</h2>

<div className="blog-grid">

<div className="blog-card">
<img src={b7}/>
<h3>Pudukkottai Documentary</h3>
</div>

<div className="blog-card">
<img src={b8}/>
<h3>Thanjavur Documentary</h3>
</div>

<div className="blog-card">
<img src={b9}/>
<h3>Tamil Nadu Culture</h3>
</div>

</div>

</section>


{/* SUBSCRIBE */}

<section className="subscribe">

<h2>Subscribe For Get Update Every New Photo</h2>

<input type="email" placeholder="Enter Email"/>

<button>Subscribe</button>

</section>


</div>

);

}

export default Home;