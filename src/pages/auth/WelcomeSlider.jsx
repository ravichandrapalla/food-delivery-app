import { useRef, useState } from "react";
import Banner from "../../components/ui/Banner";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router";

export default function WelcomeSlider() {
  const [slides, setSlides] = useState([1, 2, 3, 4, 5]);
  const [finalSlide, setIsFinalSlide] = useState(false);
  const carouselRef = useRef();
  const navigate = useNavigate();

  const handleClick = (sign) => {
    if (sign === "next") {
      carouselRef.current?.next();
      return;
    }
    carouselRef.current?.prev();
  };
  const handleIsFinalSlide = (index) => {
    if (index === slides.length - 1) {
      setIsFinalSlide(true);
      return;
    }
    setIsFinalSlide(false);
    console.log("hii");
  };
  return (
    <div className="w-full h-full flex flex-col space-y-4  items-center">
      <div className="w-[100%] ">
        <Banner
          slides={slides}
          carouselRef={carouselRef}
          handleIsFinalSlide={handleIsFinalSlide}
        />
      </div>
      {finalSlide ? (
        <Button onClick={() => navigate("/sign-in")}>GET STARTED</Button>
      ) : (
        <>
          {" "}
          <Button
            variant="primary"
            className="text-lg font-medium"
            onClick={() => handleClick("next")}
          >
            Next
          </Button>
          <Button variant="secondary" onClick={() => handleClick("prev")}>
            Skip
          </Button>
        </>
      )}
    </div>
  );
}
