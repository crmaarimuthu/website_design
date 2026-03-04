import { useState, useEffect } from "react";

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

function TopBanner(){

const [index,setIndex]=useState(0);

useEffect(()=>{

const timer=setInterval(()=>{
setIndex((prev)=>(prev+1)%banners.length);
},4000);

return ()=>clearInterval(timer);

},[]);

const next=()=>{
setIndex((index+1)%banners.length);
};

const prev=()=>{
setIndex((index-1+banners.length)%banners.length);
};

return(

<div className="top-banner">

<img src={banners[index]} className="banner-image"/>

<div className="banner-overlay">

<h1 className="banner-title">Tamil Digital Studio</h1>
<p className="banner-text">Capture Your Beautiful Moments</p>

</div>

<button className="banner-prev" onClick={prev}>❮</button>
<button className="banner-next" onClick={next}>❯</button>

</div>

);

}

export default TopBanner;