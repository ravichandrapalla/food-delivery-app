import React, { useRef } from "react";
import { Carousel } from "antd";
import AppLogo from "/AppLogo.png";

const CarouselCard = {
  height: "h-full",
  color: "#fff",
  //   lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Banner = ({ slides, carouselRef, handleIsFinalSlide }) => {
  // const handleCurrent =()=> {
  //   handleIsFinalSlide();
  // }
  return (
    <Carousel
      ref={carouselRef}
      beforeChange={(current) => {
        console.log("cur -> ", current, "final -> ", slides.length);
        handleIsFinalSlide(current);
      }}
    >
      {slides.map((_, i) => (
        <div key={i}>
          <div className="bg-fuchsia-500">
            {<img src={AppLogo} alt="image" />}
          </div>
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
            <h2 className="font-bold font-sans text-lg">All your favorites</h2>
            <p className="font-sans font-xs">
              Get all your loved foods in one place, you just place the order we
              do the rest
            </p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};
export default Banner;
