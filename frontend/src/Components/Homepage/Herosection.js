import React from "react";
import "../../App.css";
import { Button } from "./Button";
import "./Homepage.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h1 className="dm-serif-display-regular">Shop Everywhere, Simply Anywhere</h1>
      <p>One Website, Endless Choices.</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
