import { useContext } from "react";
import "../../App.css";
import { Button } from "./Button";
import "./Homepage.css";
import { AuthContext } from "../../Contexts/AuthContext";

function HeroSection() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="hero-container">
      <h1 className="dm-serif-display-regular">Shop Everywhere, Simply Anywhere</h1>
      <h2 className="gabarito-hello">One Website, Endless Choices.</h2>
      {isLoggedIn ? (
        <p></p>
      ) : (
        <div className="hero-btns">
          <Button
            className="gabarito-hello"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            GET STARTED
          </Button>
        </div>
      )}
    </div>
  );
}

export default HeroSection;
