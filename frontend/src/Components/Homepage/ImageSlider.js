import React, { useState } from "react";

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Styles for the slider components
  const sliderStyles = {
    position: "relative",
    width: "100%",
    height: "500px", // Adjust height as needed
    overflow: "hidden",
    textAlign: "center",
    background: "#ffff",
  };

  const slideStyles = {
    width: "100%",
    height: "100%",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "opacity 0.5s ease",
  };

  const dotsContainerStyles = {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const dotStyle = {
    cursor: "pointer",
    margin: "0 5px",
    fontSize: "24px",
    color: "#bbb",
  };

  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    left: "20px",
    cursor: "pointer",
    fontSize: "70px",
    color: "#000000",
    transform: "translateY(-50%)",
  };

  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    right: "20px",
    cursor: "pointer",
    fontSize: "70px",
    color: "#000000",
    transform: "translateY(-50%)",
  };

  // Dynamically change the background image based on currentIndex
  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  return (
    <div style={sliderStyles}>
      {/* Left and right arrow buttons */}
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div>

      {/* Display current slide */}
      <a href={slides[currentIndex].link}>
        <div style={slideStylesWidthBackground}></div>
        <div style={{ fontSize: 500 }}>slides[currentIndex].title</div>
      </a>

      {/* Dots for slide navigation */}
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
