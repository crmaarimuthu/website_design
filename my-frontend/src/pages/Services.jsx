import wedding1 from "../assets/images/tamil_digital.jpeg";
import wedding2 from "../assets/images/tamil_digital.jpeg";
import birthday1 from "../assets/images/tamil_digital.jpeg";

function Services() {
  return (
    <div className="gallery">
      <h1>Our Work</h1>

      <div className="gallery-grid">
        <img src={wedding1} alt="Wedding" />
        <img src={wedding2} alt="Wedding" />
        <img src={birthday1} alt="Birthday" />
      </div>
    </div>
  );
}

export default Services;