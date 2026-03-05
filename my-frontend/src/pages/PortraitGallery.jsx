import { useParams } from "react-router-dom";
import "../styles/main.css";

import img1 from "../assets/images/banner1.jpg";
import img2 from "../assets/images/banner2.jpg";
import img3 from "../assets/images/banner3.jpg";

const galleries = {
  woman: [img1, img2, img3],
  man: [img2, img3, img1],
  children: [img3, img1, img2],
  prewedding: [img1, img2, img3],
  fashion: [img2, img3, img1],
  couple: [img3, img1, img2]
};

function PortraitGallery(){

const {type} = useParams();

const images = galleries[type] || [];

return(

<div className="gallery-page">

<h1>{type} Portrait Gallery</h1>

<div className="gallery-grid">

{images.map((img,index)=>(
<img key={index} src={img} alt="gallery"/>
))}

</div>

</div>

);

}

export default PortraitGallery;