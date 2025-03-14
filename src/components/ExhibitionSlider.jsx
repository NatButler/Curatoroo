import ChevronLeftIcon from '../assets/chevron_left.svg?react';
import ChevronRightIcon from '../assets/chevron_right.svg?react';
import './ExhibitionSlider.css';

function ExhibitionSlider({
  children,
  currentPos,
  setCurrentPos,
  sliderObjectsCount,
}) {
  const handleSliderControls = (dir) => {
    if (dir === 'left' && currentPos > 0) {
      setCurrentPos(currentPos - 1);
    }
    if (dir === 'right' && currentPos < sliderObjectsCount - 1) {
      setCurrentPos(currentPos + 1);
    }
  };

  return (
    <div className="slider-container">
      <button
        type="button"
        className="exhibition-slider-control left-slider-control"
        onClick={() => handleSliderControls('left')}
      >
        <ChevronLeftIcon />
      </button>
      <ul
        className="slider-list"
        style={{ marginLeft: `-${currentPos * 786}px` }}
      >
        {children}
      </ul>
      <button
        type="button"
        className="exhibition-slider-control right-slider-control"
        onClick={() => handleSliderControls('right')}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

export default ExhibitionSlider;
