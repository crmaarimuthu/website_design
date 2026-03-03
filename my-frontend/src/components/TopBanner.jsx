import bannerImage from "../assets/images/tamil_digital.jpeg";

function TopBanner() {
  return (
    <div className="top-banner">
      <img src={bannerImage} alt="Studio Banner" />
      <div className="banner-overlay">
        <h1>My Studio</h1>
        <p>Capture Your Beautiful Moments</p>
      </div>
    </div>
  );
}

export default TopBanner;