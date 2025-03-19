import { useRef, useState } from 'react';
import ChevronLeftIcon from '../assets/chevron_left.svg?react';
import ChevronRightIcon from '../assets/chevron_right.svg?react';
import './ResultsSlider.css';

function ResultsSlider({ resultsLength, children, itemWidth }) {
  const favouritesSlider = useRef(null);
  const [sliderPos, setSliderPos] = useState(0);

  const handleScrollLeft = () => {
    if (sliderPos < 0) {
      const shift = sliderPos + itemWidth;
      favouritesSlider.current.style.transform = `translateX(${shift}px)`;
      setSliderPos(shift);
    }
  };

  const handleScrollRight = () => {
    // if (sliderPos > -((resultsLength / 2) * itemWidth)) {
    if (
      sliderPos >
      -favouritesSlider.current.scrollWidth +
        favouritesSlider.current.offsetWidth
    ) {
      const shift = sliderPos - itemWidth;
      favouritesSlider.current.style.transform = `translateX(${shift}px)`;
      setSliderPos(shift);
    }
  };

  return (
    <div className="results-wrapper">
      <button
        type="button"
        className="results-slider-control left-control"
        onClick={handleScrollLeft}
      >
        <ChevronLeftIcon />
      </button>
      <div className="results-slider-container" ref={favouritesSlider}>
        {children}
      </div>
      <button
        type="button"
        className="results-slider-control right-control"
        onClick={handleScrollRight}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

export default ResultsSlider;
