import NavBar from "../Components/Navbar";
import "../App.css";
import ImageSlider from "../Components/Homepage/ImageSlider";
import HeroSection from "../Components/Homepage/Herosection";
import Footer from "../Components/Homepage/Footer";

function Homepage() {
  const slides = [
    {
      url: "./images/3.png",
      link: "/products?search=waterbottle",
    },
    {
      url: "./images/1.png",
      link: "/products?search=nike",
    },
    {
      url: "./images/4.png",
      link: "/products?search=adidas",
    },
    {
      url: "./images/2.png",
      link: "/products?search=nintendo",
    },
    {
      url: "./images/5.png",
      link: "/products?search=computers",
    },
  ];
  const containerStyles = {
    width: "100%",
    height: "500px",
    margin: "0 auto",
  };
  return (
    <div>
      <NavBar />
      <HeroSection />
      <div
        style={{
          textAlign: "center",
          fontSize: "40px",
          fontWeight: "bold",
          background: "#ffff",
        }}
        className="dm-serif-display-regular"
      >
        Check out the LATEST trends!
      </div>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
