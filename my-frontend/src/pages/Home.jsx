import heroImage from "../assets/images/tamil_digital.jpeg";

function Home() {
  return (
    <div>
      <section className="hero">
        <img src={heroImage} alt="Studio" className="hero-img" />
        <div className="hero-text">
          <h1>Capture Your Special Moments</h1>
          <p>Professional Photography & Event Coverage</p>
          <button className="btn">Book Now</button>
        </div>
      </section>

      <section className="about">
        <h2>About Our Studio</h2>
        <p>
          We specialize in wedding, birthday, and corporate photography with
          cinematic quality and premium editing.
        </p>
      </section>
    </div>
  );
}

export default Home;