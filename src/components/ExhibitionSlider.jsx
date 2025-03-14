import ChevronLeftIcon from '../assets/chevron_left.svg?react';
import ChevronRightIcon from '../assets/chevron_right.svg?react';
import './ExhibitionSlider.css';

function ExhibitionSlider({ children, handler, currentPos }) {
  return (
    <div className="slider-container">
      <button
        type="button"
        className="exhibition-slider-control left-slider-control"
        onClick={() => handler('left')}
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
        onClick={() => handler('right')}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}

export default ExhibitionSlider;
