const RangeSlider = ({ rangeSlider, changeRangeSlider }) => {
  return (
    <div className="slider-container">
      <div>By Distance</div>
      <label htmlFor="range slider"></label>
      <input
        className="range-slider"
        name="range slider"
        type="range"
        min="1"
        max="500"
        value={rangeSlider}
        onInput={changeRangeSlider}
      />
      <div className="range-value">
        {rangeSlider}
        {rangeSlider === 500 ? "+" : null} miles from your location
      </div>
    </div>
  );
};

export default RangeSlider;
